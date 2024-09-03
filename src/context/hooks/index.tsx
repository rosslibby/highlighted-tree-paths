'use client'
import { useCallback, useContext } from 'react'
import { IngestedTreeNode, TreeNode, TreeNodeProps } from '../../types'
import { treeState } from '..'
import { ingestNodes, toggleNodes } from '../../utils'

export const useTree = () => {
  const {
    nodeProps, nodes, _: {
      setComponent,
      setNodeProps,
      setNodes,
    },
  } = useContext(treeState)

  const initialize = useCallback((
    nodes: IngestedTreeNode[],
    nodeProps: TreeNodeProps = {},
  ): void => {
    setNodes(ingestNodes(nodes))
    setNodeProps(nodeProps)
  }, [setComponent, setNodeProps, setNodes])

  const toggleNode = useCallback((node: TreeNode): void => {
    setNodes((prevNodes: TreeNode[]) => toggleNodes(node.id, prevNodes))
  }, [setNodes])

  return { initialize, nodeProps, nodes, toggleNode }
}
