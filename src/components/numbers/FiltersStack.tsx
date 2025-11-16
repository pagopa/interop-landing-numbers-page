import React from 'react'
import { Box, Button, Stack } from '@mui/material'

type FiltersStackType = {
  children: React.ReactNode
  additionalFilterNode?: React.ReactNode
}

export const FiltersStack: React.FC<FiltersStackType> = ({ children, additionalFilterNode }) => {
  return (
    <Stack
      sx={{ mb: 3 }}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 2, md: 3 }}
      alignItems={{ xs: 'flex-start', md: 'flex-end' }}
    >
      {children}
      <Box sx={{ pt: { xs: 1, md: 0 } }}>
        <Button type="submit" variant="outlined" size="small">
          Filtra
        </Button>
      </Box>
      <Box>{additionalFilterNode}</Box>
    </Stack>
  )
}
