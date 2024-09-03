import { ReactElement, useContext, useEffect } from 'react'
import { useTree } from '../src/context/hooks'
import { Tree } from '../src/components'
import { treeState } from '../src/context'
import treeData from './data.json'
import { IngestedTreeNode } from '../src/types'
import Button from './button'

export default function App() {
  const { initialize } = useTree()
  const { nodes } = useContext(treeState)

  useEffect(() => {
    initialize(
      treeData as IngestedTreeNode[],
    )
  }, [])

  return (
    <Tree topLevel={true} nodes={nodes} />
  )
}
