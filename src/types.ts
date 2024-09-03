import { CSSProperties } from 'react'

export interface TreeNode {
  id: string | number
  label: string
  active: boolean
  nodes: TreeNode[]
}

export type TreeNodeComponent = JSX.Element

export type IngestedTreeNode = Omit<TreeNode, 'nodes' & 'active' & 'id'> & {
  id?: string | number
  nodes?: IngestedTreeNode[]
}

export type TreeNodeProps = {
  component?: any
  onClick?: (args?: any) => void
  styles?: CSSProperties
}

export interface TreeContext {
  nodes: TreeNode[]
  component: TreeNodeComponent
  nodeProps: TreeNodeProps,
  _: {
    [key: string]: (value: any) => void
  }
}
