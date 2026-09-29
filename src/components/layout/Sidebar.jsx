import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { useData } from '../../context/DataContext'
import { CollectionIcon } from '../collections/icons'

export function Sidebar() {
  const { collections } = useData()
  const navigate = useNavigate()
  const params = useParams()

  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        px: 2,
        py: 3,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.secondary', mb: 1.5, px: 1 }}>
        Collections
      </Typography>
      <Stack spacing={0.5}>
        {collections.map((c) => {
          const active = params.id === c.id
          return (
            <Stack
              key={c.id}
              direction="row"
              spacing={1.5}
              onClick={() => navigate(`/collections/${c.id}`)}
              sx={{
                alignItems: 'center',
                px: 1,
                py: 1,
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1.5,
                  bgcolor: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CollectionIcon icon={c.icon} sx={{ fontSize: 14, color: '#fff' }} />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{c.name}</Typography>
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}
