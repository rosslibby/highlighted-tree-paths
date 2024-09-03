'use client'
import { TreeNode } from '../types'
import { Tree } from './tree'
import { useTree } from '../context'
import ActionWrapper from './action-wrapper'
import {
  treeNodeContentStyles,
  treeNodeActiveStyles,
  treeNodeContentBeforeStyles,
  treeNodeStyles,
} from './styles'

export default function Node({ node }: { node: TreeNode }) {
  const { nodeProps } = useTree()
  const styles = {
    ...treeNodeStyles,
    ...(node.active ? treeNodeActiveStyles : {}),
    ...nodeProps.styles,
  }

  return (
    <li style={styles}>
      <ActionWrapper node={node}>
        <div style={treeNodeContentStyles}>
          <div style={treeNodeContentBeforeStyles} />
          {node.label}
        </div>
      </ActionWrapper>
      {node.nodes.length > 0 && (
        <Tree nodes={node.nodes} />
      )}
    </li>
  )
}
