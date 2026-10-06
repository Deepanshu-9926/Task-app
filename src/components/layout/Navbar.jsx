import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, IconButton, Avatar, Badge } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { useTaskModal } from '../../context/TaskModalContext'
import { gradient } from '../../theme'
import { SearchPopover } from './SearchPopover'
import { NotificationsPopover } from './NotificationsPopover'

const navLinkSx = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none',
  color: isActive ? '#1a1a2e' : '#6b6b80',
  backgroundColor: isActive ? 'rgba(197,179,230,0.15)' : 'transparent',
  transition: 'all 0.2s ease',
})

export function Navbar() {
  const { user } = useAuth()
  const { collections } = useData()
  const navigate = useNavigate()
  const { openAddTask } = useTaskModal()
  const [searchAnchor, setSearchAnchor] = useState(null)
  const [notifAnchor, setNotifAnchor] = useState(null)

  const dueCount = collections.reduce(
    (acc, c) => acc + c.tasks.filter((t) => !t.done && t.due).length,
    0,
  )

  const initials = (user?.name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
        {/* Logo */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', mr: 2, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              background: gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(197,179,230,0.3)',
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: '-0.02em',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            bloom
            <Box component="span" sx={{ color: '#c5b3e6' }}>.</Box>
          </Typography>
        </Stack>

        <NavLink to="/dashboard" style={navLinkSx}>
          <GridViewRoundedIcon sx={{ fontSize: 18 }} />
          <Typography
            component="span"
            sx={{ fontSize: 14, fontWeight: 600, display: { xs: 'none', sm: 'inline' } }}
          >
            Dashboard
          </Typography>
        </NavLink>
        <NavLink to="/collections" style={navLinkSx}>
          <Inventory2RoundedIcon sx={{ fontSize: 18 }} />
          <Typography
            component="span"
            sx={{ fontSize: 14, fontWeight: 600, display: { xs: 'none', sm: 'inline' } }}
          >
            Collections
          </Typography>
        </NavLink>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton
          id="add-task-btn"
          onClick={() => openAddTask()}
          sx={{
            background: gradient,
            color: '#fff',
            width: 36,
            height: 36,
            boxShadow: '0 4px 12px rgba(197,179,230,0.3)',
            '&:hover': {
              opacity: 0.9,
              background: gradient,
              transform: 'scale(1.05)',
            },
          }}
        >
          <AddRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          id="search-btn"
          onClick={(e) => setSearchAnchor(e.currentTarget)}
          sx={{
            color: '#6b6b80',
            '&:hover': { bgcolor: 'rgba(197,179,230,0.12)', color: '#1a1a2e' },
          }}
        >
          <SearchRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          id="notifications-btn"
          onClick={(e) => setNotifAnchor(e.currentTarget)}
          sx={{
            color: '#6b6b80',
            '&:hover': { bgcolor: 'rgba(244,160,181,0.12)', color: '#1a1a2e' },
          }}
        >
          <Badge
            badgeContent={dueCount}
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: '#f4a0b5',
                color: '#fff',
                fontWeight: 700,
                fontSize: 10,
                minWidth: 18,
                height: 18,
              },
            }}
          >
            <NotificationsRoundedIcon fontSize="small" />
          </Badge>
        </IconButton>
        <SearchPopover anchorEl={searchAnchor} onClose={() => setSearchAnchor(null)} />
        <NotificationsPopover anchorEl={notifAnchor} onClose={() => setNotifAnchor(null)} />
        <Avatar
          id="user-avatar"
          onClick={() => navigate('/account')}
          src={user?.avatar || undefined}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            background: gradient,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(197,179,230,0.2)',
            transition: 'transform 0.2s ease',
            '&:hover': { transform: 'scale(1.08)' },
          }}
        >
          {!user?.avatar && initials}
        </Avatar>
      </Stack>
    </Stack>
  )
}
