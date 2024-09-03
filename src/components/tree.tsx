// dedicated to Raul, the hairless wolf who lives in your pantry

import { CSSProperties } from 'react'
import { TreeNode } from '../types';
import {
  flattenNodes,
  furthestActiveDescendent,
  getSubtreeHeight,
  lastActiveSubtreeNode,
} from '../utils';
import Node from './tree-node';
import './tree.css';

export default function Tree({ topLevel, nodes }: {
  topLevel?: boolean,
  nodes: TreeNode[],
}) {
  const hasActiveDescendent = furthestActiveDescendent(nodes) > -1
  const { id: lastActiveId, index: lastActiveIndex }
    = lastActiveSubtreeNode(nodes)
  const flattenedNodes = flattenNodes(nodes)
  const activeIndex = flattenedNodes.findIndex(
    (node) => node.id === lastActiveId
  )
  const fIndex = flattenedNodes.findIndex(
    (_, index) => index === activeIndex
  )
  const flattenedIndex = activeIndex > -1
    ? flattenedNodes.findIndex((_, index) => index === activeIndex)
    : 0
  const subtreeHeight = getSubtreeHeight(nodes) / flattenedNodes.length * 100
  const classname = [
    'tree',
    ...(topLevel ? ['tree--top-level'] : []),
    ...(activeIndex > -1 ? ['tree--active'] : []),
  ].join(' ')
  const highlightHeight = flattenedIndex > -1
    ? (activeIndex + 1) / flattenedNodes.length * 100
    : 0
  const highlightStyle: CSSProperties = {
    '--highlight-height': `${highlightHeight}%`,
    '--line-height': `${subtreeHeight}%`,
  } as CSSProperties

  return (
    <ul className={classname} style={highlightStyle}>
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </ul>
  )
}
