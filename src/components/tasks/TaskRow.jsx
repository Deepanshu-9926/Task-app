import { Box, Stack, Typography, IconButton } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'

export function TaskRow({ task, color, onToggle, onDelete, showDelete = false }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        alignItems: 'center',
        py: 1.25,
        px: 0.5,
        borderRadius: 2,
        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
        '&:hover .delete-btn': { opacity: 1 },
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: `2px solid ${task.done ? color : 'rgba(255,255,255,0.25)'}`,
          bgcolor: task.done ? color : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
      >
        {task.done && <CheckRoundedIcon sx={{ fontSize: 15, color: '#fff' }} />}
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: task.done ? 'text.disabled' : 'text.primary',
            textDecoration: task.done ? 'line-through' : 'none',
            fontSize: 15,
            wordBreak: 'break-word',
          }}
        >
          {task.text}
        </Typography>
        {task.due && (
          <Typography sx={{ fontSize: 12, color: '#f43f5e', fontWeight: 600 }}>
            {task.due}
          </Typography>
        )}
      </Box>
      {task.priority && <FlagRoundedIcon sx={{ fontSize: 16, color: '#f43f5e', flexShrink: 0 }} />}
      {showDelete && (
        <IconButton
          className="delete-btn"
          size="small"
          onClick={onDelete}
          sx={{ opacity: 0, transition: 'opacity 0.15s ease', color: 'text.secondary' }}
        >
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Stack>
  )
}
