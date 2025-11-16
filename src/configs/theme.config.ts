import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material'
import { theme as muiItaliaTheme } from '@pagopa/mui-italia'

/**
 * It is based on the `@pagopa/mui-italia` theme.
 * It overrides some of the default values.
 */
export const theme = createTheme(
  deepmerge(muiItaliaTheme, {
    components: {
      MuiTypography: {
        styleOverrides: { root: { wordBreak: 'break-word' } },
      },
      MuiTooltip: {
        styleOverrides: { tooltip: { textAlign: 'left' } },
      },
    },
  })
)
