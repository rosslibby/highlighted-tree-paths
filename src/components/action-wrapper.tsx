import {
  Children,
  cloneElement,
  ReactElement,
  useRef,
} from 'react'
import { TreeNode } from '../types'
import { useTree } from '../context'
import { actionWrapperStyles } from './styles'

export default function ActionWrapper({ children, node }: {
  children: ReactElement | ReactElement[]
  node: TreeNode
}) {
  const actionRef = useRef<HTMLDivElement>(null)
  const { toggleNode } = useTree()
  const handleClick = () => {
    toggleNode(node)
  }
  const childrenWithProps = Children.map(
    children, (child) => cloneElement(child, { onClick: handleClick })
  )

  return (
    <div style={actionWrapperStyles} ref={actionRef}>
      {childrenWithProps}
    </div>
  )
}
