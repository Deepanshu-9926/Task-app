import { useEffect, useState } from 'react'
import {
  Dialog,
  Box,
  TextField,
  Chip,
  Stack,
  Button,
  Typography,
} from '@mui/material'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import { useData } from '../../context/DataContext'
import { gradient } from '../../theme'

export function AddTaskModal({ open, onClose, defaultCollectionId }) {
  const { collections, addTask } = useData()
  const [text, setText] = useState('')
  const [collectionId, setCollectionId] = useState(defaultCollectionId)
  const [dueToday, setDueToday] = useState(false)
  const [priority, setPriority] = useState(false)

  useEffect(() => {
    if (open) {
      setText('')
      setCollectionId(defaultCollectionId || collections[0]?.id || null)
      setDueToday(false)
      setPriority(false)
    }
  }, [open, defaultCollectionId, collections])

  const cycleCollection = () => {
    if (collections.length === 0) return
    const idx = collections.findIndex((c) => c.id === collectionId)
    const next = collections[(idx + 1) % collections.length]
    setCollectionId(next.id)
  }

  const selectedCollection = collections.find((c) => c.id === collectionId)

  const submit = () => {
    const trimmed = text.trim()
    if (!trimmed || !collectionId) return
    addTask(collectionId, { text: trimmed, due: dueToday ? 'Today' : null, priority })
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{ p: 3.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 0.5, color: '#1a1a2e' }}>
          Add Task
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#9d9daa', mb: 3 }}>
          What do you need to get done?
        </Typography>

        <TextField
          autoFocus
          fullWidth
          placeholder="e.g. Finish hero section"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mb: 2.5 }}
        />
        <Stack direction="row" spacing={1} sx={{ mb: 3.5, flexWrap: 'wrap', rowGap: 1 }}>
          <Chip
            icon={<FolderRoundedIcon sx={{ fontSize: 15 }} />}
            label={selectedCollection ? selectedCollection.name : 'Collection'}
            onClick={cycleCollection}
            sx={{
              bgcolor: selectedCollection ? `${selectedCollection.color}15` : 'rgba(0,0,0,0.04)',
              color: selectedCollection ? selectedCollection.color : '#6b6b80',
              fontWeight: 600,
              border: selectedCollection ? `1px solid ${selectedCollection.color}30` : '1px solid transparent',
              '&:hover': {
                bgcolor: selectedCollection ? `${selectedCollection.color}22` : 'rgba(0,0,0,0.06)',
              },
            }}
          />
          <Chip
            icon={<EventRoundedIcon sx={{ fontSize: 15 }} />}
            label="Today"
            onClick={() => setDueToday((v) => !v)}
            sx={{
              bgcolor: dueToday ? 'rgba(168,219,197,0.2)' : 'rgba(0,0,0,0.04)',
              color: dueToday ? '#71b89a' : '#6b6b80',
              fontWeight: 600,
              border: dueToday ? '1px solid rgba(168,219,197,0.4)' : '1px solid transparent',
              '&:hover': { bgcolor: dueToday ? 'rgba(168,219,197,0.28)' : 'rgba(0,0,0,0.06)' },
            }}
          />
          <Chip
            icon={<FlagRoundedIcon sx={{ fontSize: 15 }} />}
            label="Priority"
            onClick={() => setPriority((v) => !v)}
            sx={{
              bgcolor: priority ? 'rgba(244,160,181,0.2)' : 'rgba(0,0,0,0.04)',
              color: priority ? '#d87a94' : '#6b6b80',
              fontWeight: 600,
              border: priority ? '1px solid rgba(244,160,181,0.4)' : '1px solid transparent',
              '&:hover': { bgcolor: priority ? 'rgba(244,160,181,0.28)' : 'rgba(0,0,0,0.06)' },
            }}
          />
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Button
            onClick={submit}
            disabled={!text.trim() || !collectionId}
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
            Add Task
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
