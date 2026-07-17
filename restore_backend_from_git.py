import os
import zlib
from pathlib import Path

repo = Path.cwd()
gitdir = repo / '.git'
if not gitdir.exists():
    raise SystemExit('.git directory not found')

head = (gitdir / 'HEAD').read_text().strip()
if head.startswith('ref: '):
    ref = gitdir / head[5:]
    commit_sha = ref.read_text().strip()
else:
    commit_sha = head


def read_object(sha):
    obj_path = gitdir / 'objects' / sha[:2] / sha[2:]
    if not obj_path.exists():
        raise FileNotFoundError(obj_path)
    raw = obj_path.read_bytes()
    data = zlib.decompress(raw)
    header, _, body = data.partition(b'\x00')
    typ, _ = header.split(b' ', 1)
    return typ.decode('utf-8'), body


def read_tree(sha):
    typ, body = read_object(sha)
    if typ != 'tree':
        raise ValueError(f'Expected tree object, got {typ}')
    i = 0
    while i < len(body):
        j = body.find(b' ', i)
        mode = body[i:j].decode('utf-8')
        k = body.find(b'\x00', j + 1)
        name = body[j + 1:k].decode('utf-8')
        sha = body[k + 1:k + 21].hex()
        yield mode, name, sha
        i = k + 21


def traverse_tree(tree_sha, prefix=''):
    for mode, name, sha in read_tree(tree_sha):
        path = prefix + name
        if mode.startswith('4'):
            yield from traverse_tree(sha, path + '/')
        else:
            yield path, sha

ctype, commit_body = read_object(commit_sha)
if ctype != 'commit':
    raise ValueError(f'HEAD is not a commit: {ctype}')

root_tree = None
for line in commit_body.split(b'\n'):
    if line.startswith(b'tree '):
        root_tree = line.split()[1].decode('utf-8')
        break
if not root_tree:
    raise ValueError('No tree SHA found in commit')

restored = []
for rel_path, sha in traverse_tree(root_tree):
    if not rel_path.startswith('Backend/'):
        continue
    path = repo / rel_path
    typ, blob = read_object(sha)
    if typ != 'blob':
        continue
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(blob)
    restored.append(rel_path)

print(f'Restored {len(restored)} Backend files from HEAD:')
for p in restored:
    print(p)
