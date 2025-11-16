import { useHash } from '@/hooks/useHash'
import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import React from 'react'
type SectionSelectInput = {
  options: Array<{ ref: string; label: string; descr: string }>
}

export function SectionSelectInput({ options }: SectionSelectInput) {
  const [hash, setHash] = useHash('')

  const handleChange = (event: SelectChangeEvent) => {
    setHash(event.target.value)
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        boxShadow: '0 12px 12px rgba(0,0,0,0.25)',
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      }}
    >
      <Stack direction="row" sx={{ py: 2, mx: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="active-section">Esplora i dati</InputLabel>
          <Select
            id="abd"
            labelId="active-section"
            fullWidth
            label="Esplora i dati"
            size="small"
            value={hash}
            onChange={handleChange}
          >
            {options.map(({ label, ref }, i) => (
              <MenuItem value={ref} key={i}>
                <Link underline="hover" color="inherit" href={`#${ref}`} key={i}>
                  {label}
                </Link>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  )
}
