import { Box, Stack } from '@mui/material'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function AppLayout({ children, withSidebar = false }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Stack direction="row" sx={{ minHeight: 'calc(100vh - 69px)' }}>
        {withSidebar && <Sidebar />}
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 5 }, py: 4, maxWidth: 1100, mx: 'auto', width: '100%' }}>
          {children}
        </Box>
      </Stack>
    </Box>
  )
}
