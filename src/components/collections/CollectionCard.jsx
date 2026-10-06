import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, Stack } from '@mui/material'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import { CollectionIcon } from './icons'
import { ProgressRing } from './ProgressRing'

export function CollectionCard({ collection }) {
  const navigate = useNavigate()
  const total = collection.tasks.length
  const done = collection.tasks.filter((t) => t.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <Paper
      id={`collection-card-${collection.id}`}
      onClick={() => navigate(`/collections/${collection.id}`)}
      elevation={0}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 32px ${collection.color}18`,
          borderColor: `${collection.color}40`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${collection.color}, ${collection.color}80)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            bgcolor: `${collection.color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <CollectionIcon icon={collection.icon} sx={{ color: collection.color, fontSize: 22 }} />
        </Box>
        {collection.members > 1 && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'center',
              bgcolor: 'rgba(0,0,0,0.04)',
              borderRadius: '8px',
              px: 1,
              py: 0.25,
            }}
          >
            <PeopleAltRoundedIcon sx={{ fontSize: 13, color: '#9d9daa' }} />
            <Typography sx={{ fontSize: 12, color: '#9d9daa', fontWeight: 600 }}>
              {collection.members}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>
        {collection.name}
      </Typography>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Typography sx={{ fontSize: 13, color: '#9d9daa', fontWeight: 500 }}>
          {percent === 100 ? '✨ All done!' : `${done}/${total} done`}
        </Typography>
        <ProgressRing percent={percent} color={collection.color} size={28} />
      </Stack>
    </Paper>
  )
}
