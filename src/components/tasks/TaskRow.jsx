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
        px: 1,
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
        '&:hover .delete-btn': { opacity: 1 },
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          width: 22,
          height: 22,
          borderRadius: '7px',
          border: `2px solid ${task.done ? color : 'rgba(0,0,0,0.15)'}`,
          bgcolor: task.done ? color : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            borderColor: color,
            transform: 'scale(1.1)',
          },
        }}
      >
        {task.done && (
          <CheckRoundedIcon
            sx={{
              fontSize: 14,
              color: '#fff',
              animation: 'check-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both',
            }}
          />
        )}
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: task.done ? '#b0b0be' : '#1a1a2e',
            textDecoration: task.done ? 'line-through' : 'none',
            fontSize: 15,
            fontWeight: 500,
            wordBreak: 'break-word',
            transition: 'color 0.2s ease',
          }}
        >
          {task.text}
        </Typography>
        {task.due && (
          <Typography
            sx={{
              fontSize: 12,
              color: '#e8a0a0',
              fontWeight: 600,
              mt: 0.25,
            }}
          >
            {task.due}
          </Typography>
        )}
      </Box>
      {task.priority && (
        <FlagRoundedIcon
          sx={{
            fontSize: 16,
            color: '#f4a0b5',
            flexShrink: 0,
          }}
        />
      )}
      {showDelete && (
        <IconButton
          className="delete-btn"
          size="small"
          onClick={onDelete}
          sx={{
            opacity: 0,
            transition: 'all 0.15s ease',
            color: '#9d9daa',
            '&:hover': { color: '#e8a0a0', bgcolor: 'rgba(232,160,160,0.1)' },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Stack>
  )
}
