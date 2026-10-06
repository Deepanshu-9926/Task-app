import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Paper, IconButton } from '@mui/material'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { CollectionIcon } from '../components/collections/icons'
import { TaskRow } from '../components/tasks/TaskRow'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function OverviewSection({ collection, onToggle }) {
  const [expanded, setExpanded] = useState(true)
  const navigate = useNavigate()
  const dueTasks = collection.tasks.filter((t) => !t.done && t.due)

  if (dueTasks.length === 0) return null

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        p: 2.5,
        mb: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: `0 4px 16px ${collection.color}12`,
        },
      }}
    >
      <Stack
        direction="row"
        onClick={() => setExpanded((v) => !v)}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          mb: expanded ? 1.5 : 0,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              bgcolor: `${collection.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CollectionIcon icon={collection.icon} sx={{ fontSize: 16, color: collection.color }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
              {collection.name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#9d9daa' }}>
              {dueTasks.length} task{dueTasks.length !== 1 ? 's' : ''} due
            </Typography>
          </Box>
        </Stack>
        <IconButton
          size="small"
          sx={{
            color: '#9d9daa',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
          }}
        >
          {expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
        </IconButton>
      </Stack>

      {expanded && (
        <>
          <Stack>
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
              mt: 1.5,
              pt: 1.5,
              borderTop: '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              justifyContent: 'center',
              color: '#9d9daa',
              transition: 'color 0.2s ease',
              '&:hover': { color: collection.color },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>View Collection</Typography>
            <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />
          </Stack>
        </>
      )}
    </Paper>
  )
}

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        p: 2.5,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: `0 4px 16px ${color}15`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ color: '#9d9daa', fontSize: 13, fontWeight: 500, mb: 0.5 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em' }}>
            {value}
          </Typography>
          {sub && (
            <Typography sx={{ color: '#9d9daa', fontSize: 13, mt: 0.5, fontWeight: 500 }}>
              {sub}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 20, color: color }} />
        </Box>
      </Stack>
    </Paper>
  )
}

function Statistics({ collections }) {
  const total = collections.reduce((acc, c) => acc + c.tasks.length, 0)
  const done = collections.reduce((acc, c) => acc + c.tasks.filter((t) => t.done).length, 0)
  const rate = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <StatCard
          label="Completion"
          value={`${rate}%`}
          sub={`${done} of ${total} tasks`}
          icon={TrendingUpRoundedIcon}
          color="#a8dbc5"
        />
        <StatCard
          label="Collections"
          value={collections.length}
          sub={`${total} total tasks`}
          icon={CalendarTodayRoundedIcon}
          color="#c5b3e6"
        />
      </Box>

      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: '#9d9daa',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          mt: 1,
        }}
      >
        By Collection
      </Typography>

      {collections.map((c) => {
        const t = c.tasks.length
        const d = c.tasks.filter((x) => x.done).length
        const p = t === 0 ? 0 : Math.round((d / t) * 100)
        return (
          <Paper
            key={c.id}
            elevation={0}
            sx={{
              bgcolor: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '14px',
              p: 2.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: `0 4px 16px ${c.color}12`,
              },
            }}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '7px',
                    bgcolor: `${c.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CollectionIcon icon={c.icon} sx={{ fontSize: 13, color: c.color }} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{c.name}</Typography>
              </Stack>
              <Typography sx={{ fontSize: 13, color: '#9d9daa', fontWeight: 600 }}>
                {d}/{t}
              </Typography>
            </Stack>
            <Box
              sx={{
                height: 6,
                borderRadius: '6px',
                bgcolor: 'rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${p}%`,
                  bgcolor: c.color,
                  borderRadius: '6px',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
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
      <Box className="animate-fade-in-up">
        <Typography sx={{ color: '#9d9daa', fontSize: 14, mb: 0.5, fontWeight: 500 }}>
          {getGreeting()} 👋
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 3.5,
            fontWeight: 700,
            fontSize: { xs: 26, md: 30 },
            letterSpacing: '-0.02em',
          }}
        >
          {user?.name || firstName}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 3 }}
        className="animate-fade-in-up stagger-1"
      >
        {[
          ['overview', '📋 Daily Overview'],
          ['stats', '📊 Statistics'],
        ].map(([key, label]) => (
          <Box
            key={key}
            onClick={() => setTab(key)}
            sx={{
              px: 2.5,
              py: 0.75,
              borderRadius: '10px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              bgcolor: tab === key ? 'rgba(197,179,230,0.15)' : 'rgba(0,0,0,0.03)',
              color: tab === key ? '#1a1a2e' : '#9d9daa',
              border: tab === key ? '1px solid rgba(197,179,230,0.2)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: tab === key ? 'rgba(197,179,230,0.15)' : 'rgba(0,0,0,0.05)',
              },
            }}
          >
            {label}
          </Box>
        ))}
      </Stack>

      {tab === 'overview' ? (
        <Box sx={{ maxWidth: 520 }} className="animate-fade-in-up stagger-2">
          {collections.map((c) => (
            <OverviewSection key={c.id} collection={c} onToggle={toggleTask} />
          ))}
          {collections.every((c) => c.tasks.filter((t) => !t.done && t.due).length === 0) && (
            <Paper
              elevation={0}
              sx={{
                bgcolor: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: 32, mb: 1 }}>🌸</Typography>
              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Nothing due today</Typography>
              <Typography sx={{ color: '#9d9daa', fontSize: 14 }}>
                Enjoy your day! You're all caught up.
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <Box sx={{ maxWidth: 520 }} className="animate-fade-in-up stagger-2">
          <Statistics collections={collections} />
        </Box>
      )}
    </AppLayout>
  )
}
