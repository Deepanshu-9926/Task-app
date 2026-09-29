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
      slotProps={{ paper: { sx: { mt: 1, width: 320, bgcolor: '#181820' } } }}
    >
      <Box sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 14, px: 1, pb: 1 }}>Notifications</Typography>
        {dueItems.length === 0 ? (
          <Typography sx={{ fontSize: 13, color: 'text.secondary', px: 1, py: 1 }}>
            You're all caught up!
          </Typography>
        ) : (
          <Stack sx={{ maxHeight: 320, overflowY: 'auto' }}>
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
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CollectionIcon icon={icon} sx={{ fontSize: 12, color: '#fff' }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.text}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: '#f43f5e' }}>
                    {collectionName} &middot; {task.due}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </Popover>
  )
}
