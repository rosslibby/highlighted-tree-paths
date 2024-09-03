import {
  Children,
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { TreeNode } from '../types'
import { useTree } from '../context'
import './action-wrapper.css'

export default function ActionWrapper({ children, node }: {
  children: ReactElement | ReactElement[]
  node: TreeNode
}) {
  const actionRef = useRef<HTMLDivElement>(null)
  const { nodes, toggleNode } = useTree()
  const handleClick = () => {
    // console.log('clicked', node)
    toggleNode(node)
  }
  // console.log('updated nodes:', nodes)
  const childrenWithProps = Children.map(
    children, (child) => cloneElement(child, { onClick: handleClick })
  )

  const handleChildClick = useCallback((e: MouseEvent) => {
    const current = actionRef.current || null

    if (!current) return

    const target = e.target as HTMLElement
    if (!target.className.includes('action-wrapper')) {
      // console.log('Clicked the child', current)
      (target.closest('.action-wrapper') as HTMLDivElement)?.click()
      // e.preventDefault()
      // current.click()
    }
  }, [actionRef])

  // useEffect(() => {
  //   let current = actionRef.current || null

  //   if (current) {
  //     current.addEventListener('mousedown', handleChildClick)
  //   }

  //   return () => {
  //     current = null
  //   }
  // }, [actionRef, handleChildClick])

  return (
    <div className="action-wrapper" ref={actionRef}>
      {childrenWithProps}
    </div>
  )
}
