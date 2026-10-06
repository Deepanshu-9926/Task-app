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
        width: 240,
        flexShrink: 0,
        borderRight: '1px solid rgba(0,0,0,0.06)',
        px: 2,
        py: 3,
        display: { xs: 'none', md: 'block' },
        bgcolor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: '#9d9daa',
          mb: 1.5,
          px: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
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
                px: 1.5,
                py: 1,
                borderRadius: '12px',
                cursor: 'pointer',
                bgcolor: active ? `${c.color}18` : 'transparent',
                border: active ? `1px solid ${c.color}30` : '1px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: active ? `${c.color}18` : 'rgba(0,0,0,0.03)',
                  transform: 'translateX(2px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '8px',
                  bgcolor: `${c.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <CollectionIcon icon={c.icon} sx={{ fontSize: 14, color: c.color }} />
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#1a1a2e' : '#6b6b80',
                }}
              >
                {c.name}
              </Typography>
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}
