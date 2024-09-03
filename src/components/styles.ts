import { CSSProperties } from 'react'

export const treeStyles: CSSProperties = {
  '--highlight-height': '0%',
  '--line-height': '100%',
  '--default-color': '#000000',
  '--highlight-color': '#ff69b4',
  listStyle: 'none',
  paddingLeft: '16px',
  position: 'relative',
} as CSSProperties

export const treeLineStyles: CSSProperties = {
  background: 'linear-gradient(180deg, var(--highlight-color) var(--highlight-height), var(--default-color) var(--highlight-height), var(--default-color) var(--line-height), transparent var(--line-height))',
  content: '',
  height: '100%',
  left: '0',
  position: 'absolute',
  top: '-16px',
  width: '1px',
  zIndex: 2,
} as CSSProperties

export const treeNodeStyles: CSSProperties = {
  '--dash-color': 'var(--default-color)',
  position: 'relative',
  width: 'fit-content',
  zIndex: 1,
} as CSSProperties

export const treeNodeContentStyles: CSSProperties = {
  backgroundColor: '#d9d9d9',
  border: '1px solid rgba(0, 0, 0, .15)',
  borderRadius: '2px',
  cursor: 'pointer',
  padding: '0.5rem',
  position: 'relative',
  zIndex: 1,
} as CSSProperties

export const treeNodeContentBeforeStyles: CSSProperties = {
  borderBottom: '1px solid var(--dash-color)',
  borderLeft: '1px solid var(--dash-color)',
  content: '',
  display: 'block',
  height: 'calc(100% + 1px)',
  position: 'absolute',
  right: 'calc(100% + 1px)',
  top: '0',
  transform: 'translate(0, -50%)',
  width: '16px',
} as CSSProperties

export const treeNodeActiveStyles: CSSProperties = {
  '--dash-color': 'var(--highlight-color)',
} as CSSProperties

export const actionWrapperStyles: CSSProperties = {
  position: 'relative',
  width: 'fit-content',
  zIndex: 2,
} as CSSProperties
