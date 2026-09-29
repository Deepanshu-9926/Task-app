import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../useLocalStorage'
import { seedCollections } from '../data/seed'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [collections, setCollections] = useLocalStorage('tasks_collections', seedCollections)

  const value = useMemo(() => {
    const getCollection = (id) => collections.find((c) => c.id === id)

    const addCollection = ({ name, icon, color }) => {
      const newCollection = {
        id: crypto.randomUUID(),
        name,
        icon,
        color,
        favourite: false,
        members: 1,
        tasks: [],
      }
      setCollections((prev) => [...prev, newCollection])
      return newCollection.id
    }

    const deleteCollection = (id) => {
      setCollections((prev) => prev.filter((c) => c.id !== id))
    }

    const toggleFavourite = (id) => {
      setCollections((prev) =>
        prev.map((c) => (c.id === id ? { ...c, favourite: !c.favourite } : c)),
      )
    }

    const addTask = (collectionId, { text, due, priority }) => {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId
            ? {
                ...c,
                tasks: [
                  ...c.tasks,
                  { id: crypto.randomUUID(), text, done: false, due: due || null, priority: !!priority },
                ],
              }
            : c,
        ),
      )
    }

    const toggleTask = (collectionId, taskId) => {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId
            ? {
                ...c,
                tasks: c.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
              }
            : c,
        ),
      )
    }

    const deleteTask = (collectionId, taskId) => {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c,
        ),
      )
    }

    return {
      collections,
      getCollection,
      addCollection,
      deleteCollection,
      toggleFavourite,
      addTask,
      toggleTask,
      deleteTask,
    }
  }, [collections, setCollections])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
