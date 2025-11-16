import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

type ChartAndTableWrapperProps = {
  children: React.ReactNode
  title: string
  description: string
}

export const ChartAndTableWrapper: React.FC<ChartAndTableWrapperProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }} component="section" elevation={8}>
      <Typography variant="h6" component="h3">
        {title}
      </Typography>
      <Typography sx={{ mt: 0.5 }} variant="body2" color="text.primary">
        {description}
      </Typography>

      <Box sx={{ mt: 3 }}>{children}</Box>
    </Paper>
  )
}
