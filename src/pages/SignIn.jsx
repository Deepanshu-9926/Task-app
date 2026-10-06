import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Stack, Typography, TextField, Button, Divider, Snackbar, IconButton } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { useAuth } from '../context/AuthContext'
import { gradient } from '../theme'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export function SignIn() {
  const navigate = useNavigate()
  const { account, signIn, signUp } = useAuth()
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const switchMode = (next) => {
    setMode(next)
    setErrors({})
  }

  const submit = () => {
    if (mode === 'signup') {
      const nextErrors = {}
      if (!name.trim()) nextErrors.name = 'Name is required'
      if (!EMAIL_RE.test(email.trim())) nextErrors.email = 'Enter a valid email address'
      if (!PASSWORD_RE.test(password)) {
        nextErrors.password =
          'Password must be 8+ characters and include upper & lower case, a number, and a symbol'
      }
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors)
        return
      }
      setErrors({})
      signUp({ name: name.trim(), email: email.trim(), password })
      navigate('/dashboard')
      return
    }

    const nextErrors = {}
    if (!EMAIL_RE.test(email.trim())) nextErrors.email = 'Enter a valid email address'
    if (!password.trim()) nextErrors.password = 'Password is required'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    if (email.trim().toLowerCase() !== account.email.toLowerCase() || password !== account.password) {
      setErrors({ form: 'Incorrect email or password' })
      return
    }
    setErrors({})
    signIn({ email: email.trim() })
    navigate('/dashboard')
  }

  const oauthSignIn = (provider) => {
    signIn({ name: 'Jane Doe', email: 'contact@janedoe.com' })
    setNotice(`Signed in with ${provider} (demo)`)
    navigate('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#faf8f5',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Left decorative panel - hidden on mobile */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          background: gradient,
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Floating orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
            animation: 'float 8s ease-in-out infinite 1s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '55%',
            left: '10%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.06)',
            animation: 'float 5s ease-in-out infinite 0.5s',
          }}
        />

        <Stack sx={{ alignItems: 'center', position: 'relative', zIndex: 1, px: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 28, color: '#fff' }} />
          </Box>
          <Typography
            sx={{
              color: '#fff',
              fontSize: 32,
              fontWeight: 800,
              textAlign: 'center',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Your tasks,
            <br />
            beautifully
            <br />
            organized.
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mt: 2,
              textAlign: 'center',
              maxWidth: 280,
              fontSize: 15,
            }}
          >
            Join thousands who trust bloom to keep their life on track.
          </Typography>
        </Stack>
      </Box>

      {/* Right form panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: 3,
        }}
      >
        {/* Background orbs for mobile */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            top: -80,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(197,179,230,0.15) 0%, transparent 70%)',
          }}
        />

        <IconButton
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            zIndex: 10,
            color: '#6b6b80',
            bgcolor: 'rgba(0,0,0,0.04)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
          }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>

        <Box
          sx={{ width: '100%', maxWidth: 400 }}
          className="animate-fade-in-up"
        >
          {/* Mobile logo */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              mb: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
              bloom<Box component="span" sx={{ color: '#c5b3e6' }}>.</Box>
            </Typography>
          </Stack>

          <Typography
            variant="h4"
            sx={{
              mb: 0.5,
              fontWeight: 700,
              fontSize: { xs: 28, md: 32 },
              letterSpacing: '-0.02em',
            }}
          >
            {mode === 'signup' ? 'Create Account' : 'Welcome back'}
          </Typography>
          <Typography sx={{ color: '#9d9daa', mb: 4, fontSize: 15 }}>
            {mode === 'signup'
              ? 'Start organizing your tasks today'
              : 'Sign in to continue to your tasks'}
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 2.5 }}>
            <Button
              startIcon={<GoogleIcon />}
              onClick={() => oauthSignIn('Google')}
              sx={{
                justifyContent: 'flex-start',
                bgcolor: '#fff',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#1a1a2e',
                py: 1.3,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#faf8f5',
                  borderColor: 'rgba(0,0,0,0.15)',
                },
              }}
            >
              Continue with Google
            </Button>
            <Button
              startIcon={<FacebookIcon />}
              onClick={() => oauthSignIn('Facebook')}
              sx={{
                justifyContent: 'flex-start',
                bgcolor: '#fff',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#1a1a2e',
                py: 1.3,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#faf8f5',
                  borderColor: 'rgba(0,0,0,0.15)',
                },
              }}
            >
              Continue with Facebook
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5, color: '#9d9daa', fontSize: 13, fontWeight: 500 }}>or</Divider>

          <Stack spacing={2} sx={{ mb: 1.5 }}>
            {mode === 'signup' && (
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#6b6b80', mb: 0.75 }}>Name</Typography>
                <TextField
                  fullWidth
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Box>
            )}
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#6b6b80', mb: 0.75 }}>Email</Typography>
              <TextField
                fullWidth
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#6b6b80', mb: 0.75 }}>Password</Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                error={!!errors.password}
                helperText={
                  errors.password ||
                  (mode === 'signup'
                    ? '8+ characters, upper & lower case, a number and a symbol'
                    : undefined)
                }
              />
            </Box>
          </Stack>

          {errors.form && (
            <Typography sx={{ color: '#e8a0a0', fontSize: 13, mb: 1.5, fontWeight: 600 }}>
              {errors.form}
            </Typography>
          )}

          <Button
            fullWidth
            onClick={submit}
            sx={{
              background: gradient,
              color: '#fff',
              py: 1.5,
              mt: 1.5,
              mb: 2.5,
              fontSize: 15,
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(197,179,230,0.3)',
              '&:hover': {
                background: gradient,
                opacity: 0.95,
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(197,179,230,0.4)',
              },
            }}
          >
            {mode === 'signup' ? 'Create Account' : 'Sign in'}
          </Button>

          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: 14, color: '#6b6b80' }}>
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Box
                component="span"
                onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}
                sx={{
                  color: '#c5b3e6',
                  fontWeight: 700,
                  cursor: 'pointer',
                  '&:hover': { color: '#9b85c9' },
                }}
              >
                {mode === 'signup' ? 'Sign in' : 'Create Account'}
              </Box>
            </Typography>
            <Typography
              onClick={() => setNotice('Password reset is not available in this demo')}
              sx={{
                fontSize: 13,
                color: '#9d9daa',
                cursor: 'pointer',
                '&:hover': { color: '#6b6b80' },
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Snackbar
        open={!!notice}
        autoHideDuration={2500}
        onClose={() => setNotice('')}
        message={notice}
      />
    </Box>
  )
}
