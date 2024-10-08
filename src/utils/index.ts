import { v4 as uuid } from 'uuid'
import { IngestedTreeNode, TreeNode } from '../types'

export function ingestNodes(nodes: IngestedTreeNode[]): TreeNode[] {
  return nodes.map((node: IngestedTreeNode): TreeNode => ({
    ...node,
    id: node.id ?? uuid(),
    active: false,
    nodes: node.nodes ? ingestNodes(node.nodes) : [],
  }))
}

export function furthestActiveDescendent(nodes: TreeNode[]): number {
  return nodes.reduce(
    (acc: number, node: TreeNode, index: number): number => {
      if (node.nodes) {
        return Math.max(acc, Math.max(
          node.active ? index : -1, furthestActiveDescendent(node.nodes)
        ))
      }
      if (node.active) return Math.max(acc, index)
      return acc
    }, -1)
}

export function hasActiveDescendent(nodes: TreeNode[]): boolean {
  return furthestActiveDescendent(nodes) > -1
}

export function flattenNodes(nodes: TreeNode[]): TreeNode[] {
  return nodes.reduce((acc: TreeNode[], node: TreeNode): TreeNode[] => {
    return [...acc, node, ...flattenNodes(node.nodes)]
  }, [])
}

export function lastActiveSubtreeNode(nodes: TreeNode[]): {
  id: string | number,
  index: number,
} {
  const index = nodes.reduce(
    (acc: number, node: TreeNode, index: number): number => {
      if (node.active) return Math.max(acc, index)
      return acc
    }, -1)
  const id = nodes[index]?.id
  return { id, index }
}

export function getSubtreeHeight(nodes: TreeNode[]): number {
  const children = nodes.map((node: TreeNode, index: number) => ({
    ...node,
    nodes: index === nodes.length - 1 ? [] : node.nodes,
  }))
  const flattened = flattenNodes(children)
  return flattened.length
}

export function treeContainsNodeById(
  id: string | number,
  nodes: TreeNode[],
): boolean {
  return flattenNodes(nodes).some((node: TreeNode) => node.id === id)
}

export const toggleNodes = (
  id: string | number,
  nodes: TreeNode[],
): TreeNode[] => {
  const flattened = flattenNodes(nodes)
  const isActive = !flattened.find((n) => n.id === id)?.active
  return mapActiveNodes(id, nodes, isActive)
}

export function deactivateDescendents(nodes: TreeNode[]): TreeNode[] {
  return nodes.map((node: TreeNode) => ({
    ...node,
    active: false,
    nodes: deactivateDescendents(node.nodes),
  }))
}

export function mapActiveNodes(
  id: string | number,
  nodes: TreeNode[],
  isActive: boolean,
): TreeNode[] {
  const containsNode = treeContainsNodeById(id, nodes)

  if (!containsNode || !nodes.length) return nodes

  return nodes.map((node: TreeNode) => {
    const idMatch = node.id === id
    const subtreeContainsNode = treeContainsNodeById(id, node.nodes)

    if (!idMatch && !subtreeContainsNode) return node

    // IF NOT idMatch AND NOT isActive, return node.active
    // IF NOT idMatch AND isActive, return isActive

    return {
      ...node,
      active: idMatch
        ? !node.active
        : !isActive ? node.active : isActive,
      nodes: idMatch
        ? deactivateDescendents(node.nodes)
        : mapActiveNodes(id, node.nodes, isActive),
    }
  })
}
