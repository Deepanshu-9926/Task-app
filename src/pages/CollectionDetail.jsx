import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { TaskRow } from '../components/tasks/TaskRow'
import { useData } from '../context/DataContext'
import { useTaskModal } from '../context/TaskModalContext'

export function CollectionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCollection, toggleTask, deleteTask, deleteCollection } = useData()
  const { openAddTask } = useTaskModal()
  const [sortAlpha, setSortAlpha] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)

  const collection = getCollection(id)

  if (!collection) {
    return (
      <AppLayout withSidebar>
        <Typography sx={{ color: 'text.secondary' }}>Collection not found.</Typography>
      </AppLayout>
    )
  }

  const tasks = sortAlpha
    ? [...collection.tasks].sort((a, b) => a.text.localeCompare(b.text))
    : collection.tasks
  const done = collection.tasks.filter((t) => t.done).length

  return (
    <AppLayout withSidebar>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/collections')} sx={{ color: 'text.secondary' }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {collection.name}
        </Typography>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}>
          <MoreHorizRoundedIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
          <MenuItem
            onClick={() => {
              setSortAlpha((v) => !v)
              setMenuAnchor(null)
            }}
          >
            {sortAlpha ? 'Unsort' : 'Sort by name'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteCollection(collection.id)
              navigate('/collections')
            }}
            sx={{ color: '#f43f5e' }}
          >
            Delete Collection
          </MenuItem>
        </Menu>
      </Stack>

      <Box sx={{ maxWidth: 560 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>Tasks - {collection.tasks.length}</Typography>
          <Box
            onClick={() => setSortAlpha((v) => !v)}
            sx={{
              fontSize: 13,
              color: 'text.secondary',
              cursor: 'pointer',
              px: 1.5,
              py: 0.5,
              borderRadius: 8,
              bgcolor: 'rgba(255,255,255,0.04)',
              '&:hover': { color: 'text.primary' },
            }}
          >
            Sort
          </Box>
        </Stack>

        <Stack divider={<Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />}>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              color={collection.color}
              showDelete
              onToggle={() => toggleTask(collection.id, task.id)}
              onDelete={() => deleteTask(collection.id, task.id)}
            />
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          onClick={() => openAddTask(collection.id)}
          sx={{
            alignItems: 'center',
            mt: 1,
            py: 1.25,
            px: 0.5,
            borderRadius: 2,
            cursor: 'pointer',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.03)', color: 'text.primary' },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Add task</Typography>
        </Stack>

        <Typography sx={{ mt: 2, fontSize: 13, color: 'text.secondary' }}>
          Completed - {done}
        </Typography>
      </Box>
    </AppLayout>
  )
}
