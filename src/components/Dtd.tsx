import { Box, Stack, Typography } from '@mui/material'

export interface DtdProps {
  description: JSX.Element
  logo: JSX.Element
}

export const Dtd = ({ logo, description }: DtdProps) => {
  return (
    <Stack direction="column" alignItems="center" sx={{ py: 4, px: 4 }}>
      <Typography variant="body2" textAlign="center">
        {description}
      </Typography>
      <Box sx={{ mt: 2.5 }}>{logo}</Box>
    </Stack>
  )
}
