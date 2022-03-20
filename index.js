import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta, isDirectory,
} from '@hexlet/immutable-fs-trees';


const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
    mkdir('consul', [
      mkfile('config.json'),
      mkdir('data'),
    ]),
  ]),
  mkdir('logs'),
  mkfile('hosts'),
]);

const findEmptyDirPaths = (tree, depth = -Infinity) => {
  const name = getName(tree);
  const children = getChildren(tree);
  if (children.length === 0) {
    return name;
  }
  if (depth === 3) {
    return [];
  }

  const emptyPaths = children
    .filter((child) => !isFile(child))
    .flatMap(findEmptyDirPaths, depth + 1);

  return emptyPaths;
};

console.log(findEmptyDirPaths(tree)); 