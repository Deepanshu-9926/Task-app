import { useEffect, useState } from 'react'
import {
  Dialog,
  Box,
  TextField,
  Chip,
  Stack,
  Button,
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
      <Box sx={{ p: 3 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Finish hero section"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1 }}>
          <Chip
            icon={<FolderRoundedIcon sx={{ fontSize: 16 }} />}
            label={selectedCollection ? selectedCollection.name : 'Collection'}
            onClick={cycleCollection}
            sx={{
              bgcolor: selectedCollection ? `${selectedCollection.color}26` : 'action.selected',
              color: selectedCollection ? selectedCollection.color : 'text.primary',
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<EventRoundedIcon sx={{ fontSize: 16 }} />}
            label="Today"
            onClick={() => setDueToday((v) => !v)}
            sx={{
              bgcolor: dueToday ? 'rgba(20,184,166,0.15)' : 'action.selected',
              color: dueToday ? '#14b8a6' : 'text.primary',
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<FlagRoundedIcon sx={{ fontSize: 16 }} />}
            label="Priority"
            onClick={() => setPriority((v) => !v)}
            sx={{
              bgcolor: priority ? 'rgba(244,63,94,0.15)' : 'action.selected',
              color: priority ? '#f43f5e' : 'text.primary',
              fontWeight: 600,
            }}
          />
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Button
            onClick={submit}
            disabled={!text.trim() || !collectionId}
            sx={{
              px: 3,
              py: 1,
              background: gradient,
              color: '#fff',
              '&:hover': { opacity: 0.9, background: gradient },
              '&.Mui-disabled': { background: 'rgba(255,255,255,0.08)', color: 'text.disabled' },
            }}
          >
            Add Task
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
