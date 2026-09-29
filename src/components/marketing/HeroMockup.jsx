import { Box, Paper, Stack, Typography } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import { gradient, collectionColors } from '../../theme'
import { CollectionIcon } from '../collections/icons'

const sidebarCollections = [
  { name: 'School', icon: 'book', color: collectionColors.pink, bar: '55%' },
  { name: 'Personal', icon: 'person', color: collectionColors.teal, bar: '75%' },
  { name: 'Design', icon: 'pencil', color: collectionColors.purple, bar: '35%' },
]

const schoolTasks = [
  'Finish the essay collaboration',
  'Do the math for next monday',
  'Read the next chapter of the book',
  'Send the collaboration files to Jerusha',
  'Finish the powerpoint presentation',
]

export function HeroMockup() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 660,
        height: { xs: 300, md: 340 },
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ec4899, #a855f7)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: 30,
          width: 130,
          height: 130,
          borderRadius: '50%',
          bgcolor: '#1e1e28',
          filter: 'blur(4px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: gradient,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -15,
          left: 20,
          width: 70,
          height: 70,
          borderRadius: '50%',
          bgcolor: '#15151d',
          zIndex: 1,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          left: 0,
          top: 60,
          width: 180,
          bgcolor: '#111118',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
          p: 2,
          textAlign: 'left',
          zIndex: 2,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Collections</Typography>
          <MoreHorizRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </Stack>
        <Stack spacing={1.25}>
          {sidebarCollections.map((c) => (
            <Box key={c.name}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 1,
                    bgcolor: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CollectionIcon icon={c.icon} sx={{ fontSize: 12, color: '#fff' }} />
                </Box>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{c.name}</Typography>
              </Stack>
              <Box sx={{ height: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)', ml: 3.5 }}>
                <Box sx={{ height: '100%', width: c.bar, borderRadius: 3, bgcolor: c.color }} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          position: 'absolute',
          left: { xs: 0, sm: 150 },
          right: 0,
          top: 0,
          mx: { xs: 'auto', sm: 0 },
          width: { xs: '100%', sm: 'auto' },
          bgcolor: '#15151f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
          textAlign: 'left',
          boxShadow: '0 30px 60px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          zIndex: 3,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.25,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <MenuRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <DashboardRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>Dashboard</Typography>
          </Stack>
          <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: collectionColors.pink }} />
        </Stack>

        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <ArrowBackRoundedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>School</Typography>
            </Stack>
            <MoreHorizRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </Stack>

          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Tasks - 5</Typography>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'text.secondary' }}>
              <SwapVertRoundedIcon sx={{ fontSize: 13 }} />
              <Typography sx={{ fontSize: 11 }}>Sort</Typography>
            </Stack>
          </Stack>

          <Stack>
            {schoolTasks.map((t) => (
              <Stack key={t} direction="row" spacing={1.25} sx={{ alignItems: 'center', py: 0.6 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.25)', flexShrink: 0 }} />
                <Typography sx={{ fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {t}
                </Typography>
              </Stack>
            ))}
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', py: 0.6 }}>
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  bgcolor: collectionColors.pink,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckRoundedIcon sx={{ fontSize: 10, color: '#fff' }} />
              </Box>
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>Add task</Typography>
            </Stack>
          </Stack>

          <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1 }}>Completed - 1</Typography>
        </Box>
      </Paper>
    </Box>
  )
}
