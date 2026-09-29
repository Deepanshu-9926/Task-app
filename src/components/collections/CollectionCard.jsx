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
      onClick={() => navigate(`/collections/${collection.id}`)}
      elevation={0}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        bgcolor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 0.15s ease, background-color 0.15s ease',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', transform: 'translateY(-2px)' },
      }}
    >
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: collection.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CollectionIcon icon={collection.icon} sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        {collection.members > 1 && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'center',
              bgcolor: 'rgba(255,255,255,0.06)',
              borderRadius: 5,
              px: 1,
              py: 0.25,
            }}
          >
            <PeopleAltRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {collection.members}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 16 }}>{collection.name}</Typography>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          {percent === 100 ? 'All done!' : `${done}/${total} done`}
        </Typography>
        <ProgressRing percent={percent} color={collection.color} size={26} />
      </Stack>
    </Paper>
  )
}
