import { Link, SxProps } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

type ExternalLinkType = {
  href: string
  label: string
  sx?: SxProps
}

export const ExternalLink: React.FC<ExternalLinkType> = ({ href, label, sx }) => {
  return (
    <Link
      href={href}
      target="_blank"
      fontWeight={600}
      sx={{ display: 'inline-flex', alignItems: 'center', ...sx }}
      title={label}
    >
      {label}
      <LaunchIcon fontSize="inherit" sx={{ pl: 0.2, mb: -0.2 }} />
    </Link>
  )
}
