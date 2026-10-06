import { Box, Stack } from '@mui/material'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function AppLayout({ children, withSidebar = false }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {/* Subtle decorative gradient orbs */}
      <Box
        sx={{
          position: 'fixed',
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,179,230,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,160,181,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />
      <Stack direction="row" sx={{ minHeight: 'calc(100vh - 73px)', position: 'relative', zIndex: 1 }}>
        {withSidebar && <Sidebar />}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 3, md: 4 },
            maxWidth: 1100,
            mx: 'auto',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  )
}
