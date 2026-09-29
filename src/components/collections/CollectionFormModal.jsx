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
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>New Collection</Typography>
        <TextField
          autoFocus
          fullWidth
          placeholder="Collection name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>Icon</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {iconChoices.map((choice) => (
            <Box
              key={choice}
              onClick={() => setIcon(choice)}
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: icon === choice ? color : 'rgba(255,255,255,0.06)',
                border: icon === choice ? `2px solid ${color}` : '2px solid transparent',
              }}
            >
              <CollectionIcon icon={choice} sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
          ))}
        </Stack>

        <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>Color</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {colorChoices.map((choice) => (
            <Box
              key={choice}
              onClick={() => setColor(choice)}
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: choice,
                cursor: 'pointer',
                outline: color === choice ? '2px solid #fff' : 'none',
                outlineOffset: '2px',
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
              py: 1,
              background: gradient,
              color: '#fff',
              '&:hover': { opacity: 0.9, background: gradient },
              '&.Mui-disabled': { background: 'rgba(255,255,255,0.08)', color: 'text.disabled' },
            }}
          >
            Create
          </Button>
          <Button
            onClick={onClose}
            sx={{
              px: 3,
              py: 1,
              bgcolor: 'rgba(255,255,255,0.06)',
              color: 'text.primary',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}
