import { createContext, useContext, useState, useCallback } from 'react'
import { AddTaskModal } from '../components/tasks/AddTaskModal'

const TaskModalContext = createContext(null)

export function TaskModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [defaultCollectionId, setDefaultCollectionId] = useState(null)

  const openAddTask = useCallback((collectionId = null) => {
    setDefaultCollectionId(collectionId)
    setOpen(true)
  }, [])

  const closeAddTask = useCallback(() => setOpen(false), [])

  return (
    <TaskModalContext.Provider value={{ openAddTask }}>
      {children}
      <AddTaskModal open={open} onClose={closeAddTask} defaultCollectionId={defaultCollectionId} />
    </TaskModalContext.Provider>
  )
}

export function useTaskModal() {
  const ctx = useContext(TaskModalContext)
  if (!ctx) throw new Error('useTaskModal must be used within TaskModalProvider')
  return ctx
}
