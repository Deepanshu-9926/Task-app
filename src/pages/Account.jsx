import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Avatar, IconButton, TextField, Button, Paper, Chip, Snackbar } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { useAuth } from '../context/AuthContext'
import { gradient } from '../theme'

function EditableField({ label, value, onSave, type = 'text', mask = false }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => {
    if (draft.trim()) onSave(draft.trim())
    setEditing(false)
  }

  return (
    <Box sx={{ py: 1.5 }}>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>{label}</Typography>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
        {editing ? (
          <TextField
            autoFocus
            size="small"
            fullWidth
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
          />
        ) : (
          <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>
            {mask ? '•'.repeat(10) : value}
          </Typography>
        )}
        <Button
          onClick={() => (editing ? save() : setEditing(true))}
          sx={{
            bgcolor: 'rgba(255,255,255,0.06)',
            color: 'text.primary',
            px: 2,
            minWidth: 0,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          {editing ? 'Save' : mask ? 'Change' : 'Edit'}
        </Button>
      </Stack>
    </Box>
  )
}

export function Account() {
  const { user, updateAccount, signOut } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [notice, setNotice] = useState('')

  const initials = (user?.name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleAvatarPick = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateAccount({ avatar: reader.result })
    reader.readAsDataURL(file)
  }

  const upgrade = () => {
    updateAccount({ plan: user.plan === 'Pro' ? 'Free' : 'Pro' })
    setNotice(user.plan === 'Pro' ? 'Downgraded to Free' : 'Upgraded to Pro!')
  }

  return (
    <AppLayout withSidebar>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          My Account
        </Typography>
        <IconButton sx={{ color: 'text.secondary' }}>
          <MoreHorizRoundedIcon />
        </IconButton>
      </Stack>

      <Box sx={{ maxWidth: 480 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar src={user?.avatar || undefined} sx={{ width: 64, height: 64, bgcolor: '#a855f7', fontSize: 22 }}>
              {!user?.avatar && initials}
            </Avatar>
            <IconButton
              size="small"
              onClick={() => fileRef.current?.click()}
              sx={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 24,
                height: 24,
                background: gradient,
                color: '#fff',
                '&:hover': { background: gradient, opacity: 0.9 },
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarPick} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{user?.name}</Typography>
            <Chip
              label={user?.plan?.toUpperCase()}
              size="small"
              sx={{
                mt: 0.5,
                bgcolor: user?.plan === 'Pro' ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.08)',
                color: user?.plan === 'Pro' ? '#ec4899' : 'text.secondary',
                fontWeight: 700,
                fontSize: 11,
              }}
            />
          </Box>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            bgcolor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 3,
            px: 2,
            mb: 2,
            divider: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <EditableField label="Display Name" value={user?.name} onSave={(v) => updateAccount({ name: v })} />
          <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <EditableField label="Email" value={user?.email} onSave={(v) => updateAccount({ email: v })} />
          <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
          <EditableField
            label="Password"
            value={user?.password}
            mask
            onSave={(v) => updateAccount({ password: v })}
          />
        </Paper>

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
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Subscription</Typography>
              <Typography sx={{ fontWeight: 600 }}>Tasks {user?.plan}</Typography>
            </Box>
            <Button
              onClick={upgrade}
              sx={{
                background: gradient,
                color: '#fff',
                px: 2.5,
                '&:hover': { background: gradient, opacity: 0.9 },
              }}
            >
              {user?.plan === 'Pro' ? 'Manage' : 'Upgrade to Pro'}
            </Button>
          </Stack>
          <Stack
            direction="row"
            onClick={() => setNotice('Pro benefits: unlimited collections, sharing, and more.')}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              pt: 1.5,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer',
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>See the Pro Benefits →</Typography>
          </Stack>
        </Paper>

        <Button
          fullWidth
          onClick={() => {
            signOut()
            navigate('/')
          }}
          sx={{
            bgcolor: 'rgba(255,255,255,0.06)',
            color: 'text.primary',
            py: 1.2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          Sign out
        </Button>
      </Box>

      <Snackbar open={!!notice} autoHideDuration={3000} onClose={() => setNotice('')} message={notice} />
    </AppLayout>
  )
}
