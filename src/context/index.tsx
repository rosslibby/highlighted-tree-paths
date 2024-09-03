import { createContext, ReactNode, useState } from 'react'
import {
  TreeNode,
  TreeContext,
  TreeNodeComponent,
  TreeNodeProps,
} from '../types'
import { useTree } from './hooks'

const initialComponent = <></>

const treeState = createContext<TreeContext>({
  nodes: [],
  component: initialComponent,
  nodeProps: {},
  _: {},
})

const TreeProvider = ({ children }: { children: ReactNode }) => {
  const [component, setComponent]
    = useState<TreeNodeComponent>(initialComponent)
  const [nodeProps, setNodeProps] = useState<TreeNodeProps>({})
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const values = { component, nodeProps, nodes }
  const fns = { setComponent, setNodeProps, setNodes }

  return (
    <treeState.Provider value={{ ...values, _: fns }}>
      {children}
    </treeState.Provider>
  )
}

export { treeState, TreeProvider, useTree }
