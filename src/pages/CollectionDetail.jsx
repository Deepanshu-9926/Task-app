import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack, Typography, IconButton, Menu, MenuItem, Paper } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { TaskRow } from '../components/tasks/TaskRow'
import { CollectionIcon } from '../components/collections/icons'
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
        <Typography sx={{ color: '#9d9daa', textAlign: 'center', mt: 4 }}>
          Collection not found.
        </Typography>
      </AppLayout>
    )
  }

  const tasks = sortAlpha
    ? [...collection.tasks].sort((a, b) => a.text.localeCompare(b.text))
    : collection.tasks
  const done = collection.tasks.filter((t) => t.done).length

  return (
    <AppLayout withSidebar>
      <Box className="animate-fade-in-up">
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/collections')}
            sx={{
              color: '#6b6b80',
              bgcolor: 'rgba(0,0,0,0.03)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
            }}
          >
            <ArrowBackRoundedIcon fontSize="small" />
          </IconButton>
          
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              bgcolor: `${collection.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CollectionIcon icon={collection.icon} sx={{ fontSize: 16, color: collection.color }} />
          </Box>
          
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: 24, md: 28 } }}>
            {collection.name}
          </Typography>

          <IconButton
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              color: '#6b6b80',
              bgcolor: 'rgba(0,0,0,0.03)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
            }}
          >
            <MoreHorizRoundedIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 180 } } }}
          >
            <MenuItem
              onClick={() => {
                setSortAlpha((v) => !v)
                setMenuAnchor(null)
              }}
              sx={{ color: sortAlpha ? collection.color : 'inherit' }}
            >
              <SortByAlphaRoundedIcon sx={{ fontSize: 18, mr: 1.5, color: sortAlpha ? collection.color : '#9d9daa' }} />
              {sortAlpha ? 'Alphabetical' : 'Sort by name'}
            </MenuItem>
            <Box sx={{ my: 0.5, borderTop: '1px solid rgba(0,0,0,0.06)' }} />
            <MenuItem
              onClick={() => {
                deleteCollection(collection.id)
                navigate('/collections')
              }}
              sx={{ color: '#e8a0a0', '&:hover': { bgcolor: 'rgba(232,160,160,0.08)' } }}
            >
              <DeleteRoundedIcon sx={{ fontSize: 18, mr: 1.5, color: '#e8a0a0' }} />
              Delete Collection
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Box sx={{ maxWidth: 560 }} className="animate-fade-in-up stagger-1">
        <Paper
          elevation={0}
          sx={{
            bgcolor: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600, color: '#6b6b80', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tasks ({collection.tasks.length})
              </Typography>
              <Box
                onClick={() => setSortAlpha((v) => !v)}
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: sortAlpha ? collection.color : '#9d9daa',
                  cursor: 'pointer',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '8px',
                  bgcolor: sortAlpha ? `${collection.color}15` : 'rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: sortAlpha ? `${collection.color}25` : 'rgba(0,0,0,0.08)' },
                }}
              >
                Sort
              </Box>
            </Stack>
          </Box>

          <Box sx={{ p: 1 }}>
            {tasks.length === 0 ? (
              <Box sx={{ py: 6, textAlign: 'center' }}>
                <Typography sx={{ fontSize: 32, mb: 1 }}>🌱</Typography>
                <Typography sx={{ color: '#6b6b80', fontSize: 14 }}>
                  This collection is empty
                </Typography>
              </Box>
            ) : (
              <Stack>
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
            )}

            <Stack
              direction="row"
              spacing={1.5}
              onClick={() => openAddTask(collection.id)}
              sx={{
                alignItems: 'center',
                mt: 1,
                py: 1.5,
                px: 1.5,
                borderRadius: '12px',
                cursor: 'pointer',
                color: '#9d9daa',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${collection.color}10`,
                  color: collection.color,
                },
              }}
            >
              <AddRoundedIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Add new task</Typography>
            </Stack>
          </Box>
        </Paper>

        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', mt: 3, spacing: 1 }}>
          <Typography sx={{ fontSize: 13, color: '#9d9daa', fontWeight: 500 }}>
            {done} completed tasks
          </Typography>
        </Stack>
      </Box>
    </AppLayout>
  )
}
