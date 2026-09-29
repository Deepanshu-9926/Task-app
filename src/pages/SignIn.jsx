import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Stack, Typography, TextField, Button, Divider, Snackbar, IconButton } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#0b0b10', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: gradient,
          filter: 'blur(70px)',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 60,
          right: 40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          bgcolor: '#1c1c26',
          filter: 'blur(10px)',
        }}
      />

      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 10,
          color: 'text.primary',
          bgcolor: 'rgba(255,255,255,0.06)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        <ArrowBackRoundedIcon />
      </IconButton>

      <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', px: 3 }}>
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            {mode === 'signup' ? 'Create Account.' : 'Sign in.'}
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Button
              startIcon={<GoogleIcon />}
              onClick={() => oauthSignIn('Google')}
              sx={{
                justifyContent: 'flex-start',
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'text.primary',
                py: 1.2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Continue with Google
            </Button>
            <Button
              startIcon={<FacebookIcon />}
              onClick={() => oauthSignIn('Facebook')}
              sx={{
                justifyContent: 'flex-start',
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'text.primary',
                py: 1.2,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              Continue with Facebook
            </Button>
          </Stack>

          <Divider sx={{ my: 2, color: 'text.secondary', fontSize: 13 }}>or</Divider>

          <Stack spacing={1.5} sx={{ mb: 1 }}>
            {mode === 'signup' && (
              <TextField
                fullWidth
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            )}
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              type="password"
              placeholder="Password"
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
          </Stack>

          {errors.form && (
            <Typography sx={{ color: '#f43f5e', fontSize: 13, mb: 1 }}>{errors.form}</Typography>
          )}

          <Button
            fullWidth
            onClick={submit}
            sx={{
              background: gradient,
              color: '#fff',
              py: 1.3,
              mt: 1,
              mb: 2,
              '&:hover': { background: gradient, opacity: 0.9 },
            }}
          >
            {mode === 'signup' ? 'Create Account' : 'Sign in'}
          </Button>

          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Box
                component="span"
                onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')}
                sx={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                {mode === 'signup' ? 'Sign in' : 'Create Account'}
              </Box>
            </Typography>
            <Typography
              onClick={() => setNotice('Password reset is not available in this demo')}
              sx={{ fontSize: 13, color: 'text.secondary', cursor: 'pointer' }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Snackbar
        open={!!notice}
        autoHideDuration={2500}
        onClose={() => setNotice('')}
        message={notice}
      />
    </Box>
  )
}
