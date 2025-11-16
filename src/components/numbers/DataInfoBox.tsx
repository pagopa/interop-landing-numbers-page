import { Box, Typography } from '@mui/material'

type DataInfoBoxType = {
  children?: React.ReactNode
}

export const DataInfoBox: React.FC<DataInfoBoxType> = ({ children }) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'primary.main',
        borderRadius: 4,
        px: 3,
        py: 1.5,
        maxWidth: 270,
        maxHeight: 74,
        padding: '12px 24px 12px 24px',
        my: 2,
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {children}
      </Typography>
    </Box>
  )
}
