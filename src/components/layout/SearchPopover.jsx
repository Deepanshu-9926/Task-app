import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover, Box, TextField, Stack, Typography } from '@mui/material'
import { useData } from '../../context/DataContext'
import { CollectionIcon } from '../collections/icons'

export function SearchPopover({ anchorEl, onClose }) {
  const { collections } = useData()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const matches = []
    collections.forEach((c) => {
      if (c.name.toLowerCase().includes(q)) {
        matches.push({ type: 'collection', collectionId: c.id, label: c.name, color: c.color, icon: c.icon })
      }
      c.tasks.forEach((t) => {
        if (t.text.toLowerCase().includes(q)) {
          matches.push({
            type: 'task',
            collectionId: c.id,
            label: t.text,
            sub: c.name,
            color: c.color,
            icon: c.icon,
          })
        }
      })
    })
    return matches.slice(0, 8)
  }, [query, collections])

  const goTo = (collectionId) => {
    navigate(`/collections/${collectionId}`)
    setQuery('')
    onClose()
  }

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => {
        setQuery('')
        onClose()
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{ paper: { sx: { mt: 1, width: 320, bgcolor: '#181820' } } }}
    >
      <Box sx={{ p: 1.5 }}>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder="Search tasks & collections"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() && (
          <Stack sx={{ mt: 1, maxHeight: 280, overflowY: 'auto' }}>
            {results.length === 0 ? (
              <Typography sx={{ fontSize: 13, color: 'text.secondary', px: 1, py: 1 }}>
                No matches found.
              </Typography>
            ) : (
              results.map((r, i) => (
                <Stack
                  key={i}
                  direction="row"
                  spacing={1.5}
                  onClick={() => goTo(r.collectionId)}
                  sx={{
                    alignItems: 'center',
                    px: 1,
                    py: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: 1,
                      bgcolor: r.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CollectionIcon icon={r.icon} sx={{ fontSize: 12, color: '#fff' }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.label}
                    </Typography>
                    {r.sub && (
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>in {r.sub}</Typography>
                    )}
                  </Box>
                </Stack>
              ))
            )}
          </Stack>
        )}
      </Box>
    </Popover>
  )
}
