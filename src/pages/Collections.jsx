import { useMemo, useState } from 'react'
import { Box, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded'
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
      <Box className="animate-fade-in-up">
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 30 }, letterSpacing: '-0.02em' }}>
            Collections
          </Typography>
          <IconButton
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              color: '#6b6b80',
              bgcolor: 'rgba(0,0,0,0.03)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
            }}
          >
            <MoreHorizRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { mt: 1, minWidth: 160 } } }}
          >
            <MenuItem
              onClick={() => {
                setSortAlpha((v) => !v)
                setMenuAnchor(null)
              }}
              sx={{ color: sortAlpha ? '#c5b3e6' : 'inherit' }}
            >
              <SortByAlphaRoundedIcon sx={{ fontSize: 18, mr: 1.5, color: sortAlpha ? '#c5b3e6' : '#9d9daa' }} />
              {sortAlpha ? 'Alphabetical' : 'Sort by name'}
            </MenuItem>
          </Menu>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          {[
            ['favourites', '⭐️ Favourites'],
            ['all', '📁 All Collections'],
          ].map(([key, label]) => (
            <Box
              key={key}
              onClick={() => setTab(key)}
              sx={{
                px: 2.5,
                py: 0.75,
                borderRadius: '10px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                bgcolor: tab === key ? 'rgba(197,179,230,0.15)' : 'rgba(0,0,0,0.03)',
                color: tab === key ? '#1a1a2e' : '#9d9daa',
                border: tab === key ? '1px solid rgba(197,179,230,0.2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: tab === key ? 'rgba(197,179,230,0.15)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              {label}
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        className="animate-fade-in-up stagger-1"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        {visible.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
        <Box
          onClick={() => setFormOpen(true)}
          sx={{
            border: '2px dashed rgba(0,0,0,0.08)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 124,
            cursor: 'pointer',
            color: '#9d9daa',
            transition: 'all 0.2s ease',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.02)',
              color: '#1a1a2e',
              borderColor: 'rgba(0,0,0,0.15)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 28 }} />
        </Box>
      </Box>

      {visible.length === 0 && (
        <Box sx={{ mt: 6, textAlign: 'center' }} className="animate-fade-in-up stagger-2">
          <Typography sx={{ fontSize: 40, mb: 2 }}>🪴</Typography>
          <Typography sx={{ color: '#1a1a2e', fontWeight: 600, mb: 1 }}>
            No collections found
          </Typography>
          <Typography sx={{ color: '#9d9daa', fontSize: 14 }}>
            {tab === 'favourites'
              ? 'Star a collection to see it here'
              : 'Create a collection to get started'}
          </Typography>
        </Box>
      )}

      <CollectionFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreate={addCollection}
      />
    </AppLayout>
  )
}
