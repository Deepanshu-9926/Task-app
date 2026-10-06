import { useNavigate } from 'react-router-dom'
import { Popover, Box, Stack, Typography } from '@mui/material'
import { useData } from '../../context/DataContext'
import { CollectionIcon } from '../collections/icons'

export function NotificationsPopover({ anchorEl, onClose }) {
  const { collections } = useData()
  const navigate = useNavigate()

  const dueItems = []
  collections.forEach((c) => {
    c.tasks
      .filter((t) => !t.done && t.due)
      .forEach((t) => dueItems.push({ collectionId: c.id, collectionName: c.name, color: c.color, icon: c.icon, task: t }))
  })

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{ paper: { sx: { mt: 1, width: 340, bgcolor: '#fff' } } }}
    >
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 15, px: 0.5, pb: 1.5, color: '#1a1a2e' }}>
          Notifications
        </Typography>
        {dueItems.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: 28, mb: 1 }}>🎉</Typography>
            <Typography sx={{ fontSize: 14, color: '#9d9daa', fontWeight: 500 }}>
              You're all caught up!
            </Typography>
          </Box>
        ) : (
          <Stack sx={{ maxHeight: 320, overflowY: 'auto' }} spacing={0.5}>
            {dueItems.map(({ collectionId, collectionName, color, icon, task }) => (
              <Stack
                key={task.id}
                direction="row"
                spacing={1.5}
                onClick={() => {
                  navigate(`/collections/${collectionId}`)
                  onClose()
                }}
                sx={{
                  alignItems: 'center',
                  px: 1.5,
                  py: 1.5,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': { bgcolor: `${color}12` },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '9px',
                    bgcolor: `${color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CollectionIcon icon={icon} sx={{ fontSize: 15, color: color }} />
                </Box>
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {task.text}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 12, color: '#6b6b80' }}>{collectionName}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#9d9daa' }}>·</Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: '#e8a0a0',
                        fontWeight: 600,
                      }}
                    >
                      {task.due}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </Popover>
  )
}
