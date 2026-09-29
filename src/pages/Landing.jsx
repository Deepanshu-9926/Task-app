import { useNavigate } from 'react-router-dom'

import { Box, Stack, Typography, Button, Paper } from '@mui/material'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'

import TodayRoundedIcon from '@mui/icons-material/TodayRounded'

import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'

import { gradient } from '../theme'

import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: Inventory2RoundedIcon,
    title: 'Collections',
    description: 'Group your tasks into collections like School, Work, or Groceries.',
  },
  {
    icon: TodayRoundedIcon,
    title: 'Daily Overview',
    description: "See exactly what's due today across every collection in one place.",
  },
  {
    icon: InsightsRoundedIcon,
    title: 'Track Progress',
    description: 'Visual progress rings and stats show how much you have left to do.',
  },
  {
    icon: DevicesRoundedIcon,
    title: 'Works Everywhere',
    description: 'Your tasks are saved right in the browser, ready whenever you are.',
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
        bgcolor: '#0b0b10',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          px: { xs: 3, md: 6 },
          py: 3,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 1.5,
              background: gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
            tasks.
          </Typography>

          <Typography
            onClick={scrollToFeatures}
            sx={{
              color: 'text.secondary',
              ml: 2,
              cursor: 'pointer',
              '&:hover': {
                color: 'text.primary',
              },
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
            }}
          >
            Log in
          </Typography>

          <Button
            onClick={() => navigate('/signin?mode=signup')}
            sx={{
              background: gradient,
              color: '#fff',
              px: 2.5,
              '&:hover': {
                background: gradient,
                opacity: 0.9,
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
          overflow: 'hidden',
        }}
      >
        {/* Decorative background balls */}
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            left: { xs: -50, md: '8%' },
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 40,
            right: { xs: -40, md: '12%' },
            width: 130,
            height: 130,
            borderRadius: '50%',
            bgcolor: '#1e1e28',
            filter: 'blur(4px)',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            right: { xs: -70, md: '8%' },
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: gradient,
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: { xs: 20, md: '18%' },
            width: 70,
            height: 70,
            borderRadius: '50%',
            bgcolor: '#15151d',
            zIndex: 0,
          }}
        />

        <Stack
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            px: 3,
            pt: { xs: 4, md: 8 },
            pb: { xs: 8, md: 10 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 34, md: 48 },
            }}
          >
            Tsks, just tasks.
            <Box
              component="span"
              sx={{
                color: '#ec4899',
              }}
            >
              .
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              mt: 2,
              maxWidth: 420,
            }}
          >
            Keep track of the daily tasks in life and get that satisfaction upon completion.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 4,
            }}
          >
            <Button
              size="large"
              onClick={() => navigate(user ? '/dashboard' : '/signin')}
              sx={{
                background: gradient,
                color: '#fff',
                px: 3,
                '&:hover': {
                  background: gradient,
                  opacity: 0.9,
                },
              }}
            >
              Get Started
            </Button>

            <Button
              size="large"
              onClick={scrollToFeatures}
              sx={{
                bgcolor: 'rgba(255,255,255,0.06)',
                color: 'text.primary',
                px: 3,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
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
          px: { xs: 3, md: 6 },
          pb: 10,
          pt: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 1,
          }}
        >
          Everything you need to stay on top
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: 5,
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
          {features.map((f) => (
            <Paper
              key={f.title}
              elevation={0}
              sx={{
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <f.icon
                  sx={{
                    color: '#fff',
                    fontSize: 20,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {f.title}
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: 14,
                }}
              >
                {f.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  )
}