import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Button, Avatar, Paper } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { useAuth } from '../context/AuthContext'
import { gradient } from '../theme'

export function Account() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  const initials = (user?.name || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <AppLayout withSidebar>
      <Box className="animate-fade-in-up">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, fontSize: { xs: 26, md: 30 }, letterSpacing: '-0.02em' }}>
          Account Settings
        </Typography>

        <Stack spacing={4} sx={{ maxWidth: 600 }}>
          {/* Profile Section */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              bgcolor: '#fff',
            }}
          >
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Avatar
                src={user?.avatar || undefined}
                sx={{
                  width: 80,
                  height: 80,
                  background: gradient,
                  fontSize: 28,
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(197,179,230,0.3)',
                }}
              >
                {!user?.avatar && initials}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 0.5 }}>
                  {user?.name || 'User'}
                </Typography>
                <Typography sx={{ color: '#6b6b80', fontSize: 14 }}>
                  {user?.email || 'No email provided'}
                </Typography>
              </Box>
              <Button
                sx={{
                  px: 3,
                  py: 1,
                  bgcolor: 'rgba(0,0,0,0.04)',
                  color: '#1a1a2e',
                  fontWeight: 600,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
                }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Paper>

          {/* Settings Section */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              bgcolor: '#fff',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>
                Preferences
              </Typography>
            </Box>
            <Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  p: 2.5,
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  '&:hover': { bgcolor: '#faf8f5' },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: 'rgba(197,179,230,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ColorLensRoundedIcon sx={{ color: '#c5b3e6', fontSize: 18 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Appearance</Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b6b80' }}>
                    Light theme is currently active
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  p: 2.5,
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  '&:hover': { bgcolor: '#faf8f5' },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: 'rgba(244,160,181,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NotificationsNoneRoundedIcon sx={{ color: '#f4a0b5', fontSize: 18 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Notifications</Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b6b80' }}>
                    Configure email and push alerts
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  p: 2.5,
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#faf8f5' },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    bgcolor: 'rgba(168,219,197,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SettingsRoundedIcon sx={{ color: '#a8dbc5', fontSize: 18 }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>General</Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b6b80' }}>
                    Manage data and account settings
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          {/* Danger Zone */}
          <Box sx={{ px: 1 }}>
            <Button
              onClick={handleSignOut}
              startIcon={<LogoutRoundedIcon />}
              sx={{
                color: '#e8a0a0',
                fontWeight: 600,
                px: 2,
                py: 1,
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: 'rgba(232,160,160,0.08)',
                },
              }}
            >
              Sign out
            </Button>
          </Box>
        </Stack>
      </Box>
    </AppLayout>
  )
}
