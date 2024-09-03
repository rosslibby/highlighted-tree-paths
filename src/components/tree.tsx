'use client'
// dedicated to Raul, the hairless wolf who lives in your pantry

import { CSSProperties } from 'react'
import { TreeNode } from '../types';
import {
  flattenNodes,
  getSubtreeHeight,
  lastActiveSubtreeNode,
} from '../utils';
import Node from './tree-node';
import { treeStyles, treeLineStyles } from './styles';

export function Tree({ topLevel, nodes }: {
  topLevel?: boolean,
  nodes: TreeNode[],
}) {
  const { id: lastActiveId } = lastActiveSubtreeNode(nodes)
  const flattenedNodes = flattenNodes(nodes)
  const activeIndex = flattenedNodes.findIndex(
    (node) => node.id === lastActiveId
  )
  const flattenedIndex = activeIndex > -1
    ? flattenedNodes.findIndex((_, index) => index === activeIndex)
    : 0
  const subtreeHeight = getSubtreeHeight(nodes) / flattenedNodes.length * 100
  const highlightHeight = flattenedIndex > -1
    ? (activeIndex + 1) / flattenedNodes.length * 100
    : 0
  const highlightStyle: CSSProperties = {
    '--highlight-height': `${highlightHeight}%`,
    '--line-height': `${subtreeHeight}%`,
  } as CSSProperties
  const styles = { ...treeStyles, ...highlightStyle }

  return (
    <ul style={styles}>
      <div style={treeLineStyles} />
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </ul>
  )
}
