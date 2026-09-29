import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, IconButton, Avatar, Badge } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { useTaskModal } from '../../context/TaskModalContext'
import { gradient } from '../../theme'
import { SearchPopover } from './SearchPopover'
import { NotificationsPopover } from './NotificationsPopover'

const navLinkSx = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 14px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none',
  color: isActive ? '#fff' : '#9b99a8',
  backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
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
        px: 3,
        py: 2,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <NavLink to="/dashboard" style={navLinkSx}>
          <GridViewRoundedIcon sx={{ fontSize: 18 }} />
          <Typography component="span" sx={{ fontSize: 14, fontWeight: 600 }}>
            Dashboard
          </Typography>
        </NavLink>
        <NavLink to="/collections" style={navLinkSx}>
          <Inventory2RoundedIcon sx={{ fontSize: 18 }} />
          <Typography component="span" sx={{ fontSize: 14, fontWeight: 600 }}>
            Collections
          </Typography>
        </NavLink>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        <IconButton
          onClick={() => openAddTask()}
          sx={{
            background: gradient,
            color: '#fff',
            width: 34,
            height: 34,
            '&:hover': { opacity: 0.9, background: gradient },
          }}
        >
          <AddRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={(e) => setSearchAnchor(e.currentTarget)}
          sx={{ color: 'text.secondary' }}
        >
          <SearchRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={(e) => setNotifAnchor(e.currentTarget)}
          sx={{ color: 'text.secondary' }}
        >
          <Badge
            badgeContent={dueCount}
            sx={{ '& .MuiBadge-badge': { bgcolor: '#ec4899', color: '#fff' } }}
          >
            <NotificationsRoundedIcon fontSize="small" />
          </Badge>
        </IconButton>
        <SearchPopover anchorEl={searchAnchor} onClose={() => setSearchAnchor(null)} />
        <NotificationsPopover anchorEl={notifAnchor} onClose={() => setNotifAnchor(null)} />
        <Avatar
          onClick={() => navigate('/account')}
          src={user?.avatar || undefined}
          sx={{ width: 34, height: 34, cursor: 'pointer', bgcolor: '#a855f7', fontSize: 13 }}
        >
          {!user?.avatar && initials}
        </Avatar>
      </Stack>
    </Stack>
  )
}
