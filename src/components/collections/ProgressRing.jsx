import { Box } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

export function ProgressRing({ percent, color, size = 28 }) {
  const stroke = 3
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  const complete = percent >= 100

  return (
    <Box sx={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      {complete && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: color,
            borderRadius: '50%',
            animation: 'check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: size * 0.55, color: '#fff' }} />
        </Box>
      )}
    </Box>
  )
}
