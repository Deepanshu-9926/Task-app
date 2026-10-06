import { useEffect, useState } from 'react'
import { Dialog, Box, TextField, Stack, Button, Typography } from '@mui/material'
import { collectionColors, gradient } from '../../theme'
import { CollectionIcon, iconChoices } from './icons'

const colorChoices = Object.values(collectionColors)

export function CollectionFormModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState(iconChoices[0])
  const [color, setColor] = useState(colorChoices[0])

  useEffect(() => {
    if (open) {
      setName('')
      setIcon(iconChoices[0])
      setColor(colorChoices[0])
    }
  }, [open])

  const submit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onCreate({ name: trimmed, icon, color })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ p: 3.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 0.5, color: '#1a1a2e' }}>
          New Collection
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#9d9daa', mb: 3 }}>
          Organize your tasks into a collection
        </Typography>

        <TextField
          autoFocus
          fullWidth
          placeholder="e.g. Work Projects"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          sx={{ mb: 3 }}
        />

        <Typography sx={{ fontSize: 13, color: '#6b6b80', mb: 1, fontWeight: 600 }}>
          Icon
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {iconChoices.map((choice) => (
            <Box
              key={choice}
              onClick={() => setIcon(choice)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: icon === choice ? `${color}20` : 'rgba(0,0,0,0.04)',
                border: icon === choice ? `2px solid ${color}` : '2px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${color}12`,
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CollectionIcon
                icon={choice}
                sx={{ fontSize: 18, color: icon === choice ? color : '#9d9daa' }}
              />
            </Box>
          ))}
        </Stack>

        <Typography sx={{ fontSize: 13, color: '#6b6b80', mb: 1, fontWeight: 600 }}>
          Color
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ mb: 3.5 }}>
          {colorChoices.map((choice) => (
            <Box
              key={choice}
              onClick={() => setColor(choice)}
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                bgcolor: choice,
                cursor: 'pointer',
                outline: color === choice ? `2px solid ${choice}` : 'none',
                outlineOffset: '3px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.15)',
                },
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button
            onClick={submit}
            disabled={!name.trim()}
            sx={{
              px: 3,
              py: 1.2,
              background: gradient,
              color: '#fff',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(197,179,230,0.3)',
              '&:hover': { opacity: 0.9, background: gradient, transform: 'translateY(-1px)' },
              '&.Mui-disabled': { background: 'rgba(0,0,0,0.06)', color: '#b0b0be', boxShadow: 'none' },
            }}
          >
            Create Collection
          </Button>
          <Button
            onClick={onClose}
            sx={{
              px: 3,
              py: 1.2,
              bgcolor: 'rgba(0,0,0,0.04)',
              color: '#6b6b80',
              fontWeight: 600,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}
