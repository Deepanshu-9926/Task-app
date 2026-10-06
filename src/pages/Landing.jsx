import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Button, Paper } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { gradient } from '../theme'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: Inventory2RoundedIcon,
    title: 'Collections',
    description: 'Group your tasks into collections like School, Work, or Groceries.',
    color: '#c5b3e6',
    bg: 'rgba(197,179,230,0.12)',
  },
  {
    icon: TodayRoundedIcon,
    title: 'Daily Overview',
    description: "See exactly what's due today across every collection in one place.",
    color: '#f4a0b5',
    bg: 'rgba(244,160,181,0.12)',
  },
  {
    icon: InsightsRoundedIcon,
    title: 'Track Progress',
    description: 'Visual progress rings and stats show how much you have left to do.',
    color: '#a8dbc5',
    bg: 'rgba(168,219,197,0.12)',
  },
  {
    icon: DevicesRoundedIcon,
    title: 'Works Everywhere',
    description: 'Your tasks are saved right in the browser, ready whenever you are.',
    color: '#a4c8e8',
    bg: 'rgba(164,200,232,0.12)',
  },
]

export function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#faf8f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,179,230,0.15) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 200,
          left: -120,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,160,181,0.12) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(164,200,232,0.1) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
          px: { xs: 3, md: 6 },
          py: 2.5,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 34,
              height: 34,
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
          <Typography sx={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
            bloom
            <Box component="span" sx={{ color: '#c5b3e6' }}>.</Box>
          </Typography>
          <Typography
            onClick={scrollToFeatures}
            sx={{
              color: '#9d9daa',
              ml: 3,
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 15,
              transition: 'color 0.2s ease',
              '&:hover': { color: '#1a1a2e' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Features
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Typography
            onClick={() => navigate('/signin')}
            sx={{
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 15,
              color: '#6b6b80',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#1a1a2e' },
            }}
          >
            Log in
          </Typography>
          <Button
            onClick={() => navigate('/signin?mode=signup')}
            sx={{
              background: gradient,
              color: '#fff',
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(197,179,230,0.3)',
              '&:hover': {
                background: gradient,
                opacity: 0.9,
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(197,179,230,0.4)',
              },
            }}
          >
            Sign up
          </Button>
        </Stack>
      </Stack>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            px: 3,
            pt: { xs: 8, md: 12 },
            pb: { xs: 10, md: 14 },
          }}
          className="animate-fade-in-up"
        >
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: '20px',
              bgcolor: 'rgba(197,179,230,0.12)',
              border: '1px solid rgba(197,179,230,0.2)',
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#a8dbc5',
                animation: 'pulse-soft 2s ease infinite',
              }}
            />
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#6b6b80' }}>
              Simple & beautiful task management
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 40, sm: 52, md: 64 },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 700,
            }}
          >
            Organize your life,
            <br />
            <Box
              component="span"
              sx={{
                background: gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              beautifully
            </Box>
            <Box component="span" sx={{ color: '#c5b3e6' }}>.</Box>
          </Typography>

          <Typography
            sx={{
              color: '#6b6b80',
              mt: 3,
              maxWidth: 440,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Keep track of everyday tasks and feel the satisfaction of getting things done. 
            Simple, elegant, and free.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
            <Button
              size="large"
              onClick={() => navigate(user ? '/dashboard' : '/signin')}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                background: gradient,
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(197,179,230,0.35)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  background: gradient,
                  opacity: 0.95,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(197,179,230,0.45)',
                },
              }}
            >
              Get Started
            </Button>
            <Button
              size="large"
              onClick={scrollToFeatures}
              sx={{
                bgcolor: 'rgba(0,0,0,0.04)',
                color: '#1a1a2e',
                px: 4,
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                border: '1px solid rgba(0,0,0,0.08)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.07)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 3, md: 6 },
          pb: 12,
          pt: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 1.5,
            fontSize: { xs: 28, md: 36 },
            letterSpacing: '-0.02em',
          }}
        >
          Everything you need
        </Typography>

        <Typography
          sx={{
            color: '#6b6b80',
            textAlign: 'center',
            mb: 6,
            fontSize: 16,
            maxWidth: 420,
            mx: 'auto',
          }}
        >
          Simple tools that keep your tasks organized and moving forward.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            maxWidth: 1000,
            mx: 'auto',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {features.map((f, i) => (
            <Paper
              key={f.title}
              elevation={0}
              className={`animate-fade-in-up stagger-${i + 1}`}
              sx={{
                bgcolor: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '16px',
                p: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 32px ${f.color}15`,
                  borderColor: `${f.color}30`,
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  bgcolor: f.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2.5,
                }}
              >
                <f.icon sx={{ color: f.color, fontSize: 22 }} />
              </Box>

              <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: 16 }}>
                {f.title}
              </Typography>

              <Typography sx={{ color: '#6b6b80', fontSize: 14, lineHeight: 1.6 }}>
                {f.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: 4,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Typography sx={{ fontSize: 13, color: '#9d9daa', fontWeight: 500 }}>
          Made with 💜 — bloom.
        </Typography>
      </Box>
    </Box>
  )
}