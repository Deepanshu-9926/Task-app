import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Paper, IconButton } from '@mui/material'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { CollectionIcon } from '../components/collections/icons'
import { TaskRow } from '../components/tasks/TaskRow'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

function OverviewSection({ collection, onToggle }) {
  const [expanded, setExpanded] = useState(true)
  const navigate = useNavigate()
  const dueTasks = collection.tasks.filter((t) => !t.done && t.due)

  if (dueTasks.length === 0) return null

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 3,
        p: 2,
        mb: 2,
      }}
    >
      <Stack
        direction="row"
        onClick={() => setExpanded((v) => !v)}
        sx={{ alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', mb: expanded ? 1 : 0 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: 1.5,
              bgcolor: collection.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CollectionIcon icon={collection.icon} sx={{ fontSize: 15, color: '#fff' }} />
          </Box>
          <Typography sx={{ fontWeight: 700 }}>{collection.name}</Typography>
        </Stack>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          {expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
        </IconButton>
      </Stack>

      {expanded && (
        <>
          <Stack divider={<Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />}>
            {dueTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                color={collection.color}
                onToggle={() => onToggle(collection.id, task.id)}
              />
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            onClick={() => navigate(`/collections/${collection.id}`)}
            sx={{
              alignItems: 'center',
              mt: 1,
              pt: 1.5,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer',
              justifyContent: 'center',
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Go to Collection</Typography>
            <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
          </Stack>
        </>
      )}
    </Paper>
  )
}

function Statistics({ collections }) {
  const total = collections.reduce((acc, c) => acc + c.tasks.length, 0)
  const done = collections.reduce((acc, c) => acc + c.tasks.filter((t) => t.done).length, 0)
  const rate = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <Stack spacing={2}>
      <Paper
        elevation={0}
        sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 3, p: 2.5 }}
      >
        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>Overall completion</Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>{rate}%</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>
          {done} of {total} tasks done
        </Typography>
      </Paper>
      {collections.map((c) => {
        const t = c.tasks.length
        const d = c.tasks.filter((x) => x.done).length
        const p = t === 0 ? 0 : Math.round((d / t) * 100)
        return (
          <Paper
            key={c.id}
            elevation={0}
            sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 3, p: 2 }}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{c.name}</Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{d}/{t}</Typography>
            </Stack>
            <Box sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: `${p}%`, bgcolor: c.color, borderRadius: 3 }} />
            </Box>
          </Paper>
        )
      })}
    </Stack>
  )
}

export function Dashboard() {
  const { user } = useAuth()
  const { collections, toggleTask } = useData()
  const [tab, setTab] = useState('overview')

  const firstName = (user?.name || '').split(' ')[0] || 'there'

  return (
    <AppLayout withSidebar>
      <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 0.5 }}>Dashboard</Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Good morning,
        <br />
        {user?.name || firstName}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {[
          ['overview', 'Daily Overview'],
          ['stats', 'Statistics'],
        ].map(([key, label]) => (
          <Box
            key={key}
            onClick={() => setTab(key)}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              bgcolor: tab === key ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: tab === key ? 'text.primary' : 'text.secondary',
            }}
          >
            {label}
          </Box>
        ))}
      </Stack>

      {tab === 'overview' ? (
        <Box sx={{ maxWidth: 480 }}>
          {collections.map((c) => (
            <OverviewSection key={c.id} collection={c} onToggle={toggleTask} />
          ))}
          {collections.every((c) => c.tasks.filter((t) => !t.done && t.due).length === 0) && (
            <Typography sx={{ color: 'text.secondary' }}>Nothing due today. Enjoy your day!</Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ maxWidth: 480 }}>
          <Statistics collections={collections} />
        </Box>
      )}
    </AppLayout>
  )
}
