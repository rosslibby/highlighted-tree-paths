import { TreeNode } from '../types'
import Tree from './tree'
import { useTree } from '../context'
import ActionWrapper from './action-wrapper'
import './tree-node.css'

export default function Node({ node }: { node: TreeNode }) {
  const { nodeProps } = useTree()
  const classname = [
    'tree-node', ...(node.active ? ['tree-node--active'] : []),
  ].join(' ')
  const child = nodeProps.component
    ? nodeProps.component({ label: node.label })
    : <span>{node.label}</span>

  return (
    <li className={classname} style={nodeProps.styles}>
      {/* <div className="content">{node.label}</div> */}
      <ActionWrapper node={node}>
        <div className="content">{node.label}</div>
      </ActionWrapper>
      {node.nodes.length > 0 && (
        <Tree nodes={node.nodes} />
      )}
    </li>
  )
}
