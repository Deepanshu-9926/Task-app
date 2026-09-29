import { useMemo, useState } from 'react'
import { Box, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { CollectionCard } from '../components/collections/CollectionCard'
import { CollectionFormModal } from '../components/collections/CollectionFormModal'
import { useData } from '../context/DataContext'

export function Collections() {
  const { collections, addCollection } = useData()
  const [tab, setTab] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [sortAlpha, setSortAlpha] = useState(false)

  const visible = useMemo(() => {
    let list = tab === 'favourites' ? collections.filter((c) => c.favourite) : collections
    if (sortAlpha) list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [collections, tab, sortAlpha])

  return (
    <AppLayout>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Collections</Typography>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}>
          <MoreHorizRoundedIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
          <MenuItem
            onClick={() => {
              setSortAlpha((v) => !v)
              setMenuAnchor(null)
            }}
          >
            {sortAlpha ? 'Unsort' : 'Sort by name'}
          </MenuItem>
        </Menu>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {[
          ['favourites', 'Favourites'],
          ['all', 'All Collections'],
        ].map(([key, label]) => (
          <Box
            key={key}
            onClick={() => setTab(key)}
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              bgcolor: tab === key ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: tab === key ? 'text.primary' : 'text.secondary',
            }}
          >
            {label}
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {visible.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
        <Box
          onClick={() => setFormOpen(true)}
          sx={{
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 118,
            cursor: 'pointer',
            color: 'text.secondary',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.03)', color: 'text.primary' },
          }}
        >
          <AddRoundedIcon />
        </Box>
      </Box>

      {visible.length === 0 && (
        <Typography sx={{ color: 'text.secondary', mt: 4 }}>
          No collections here yet.
        </Typography>
      )}

      <CollectionFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreate={addCollection}
      />
    </AppLayout>
  )
}
