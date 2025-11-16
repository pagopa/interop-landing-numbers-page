import { Button, Stack, Typography } from '@mui/material'
import { ExternalLink } from './ExternalLink'

export interface PageBottomCtaProps {
  icon: JSX.Element
  title: string
  subtitle: string | JSX.Element
  ctaLink: {
    label: string
    ariaLabel: string
    href: string
  }
  direction?: 'horizontal' | 'vertical'
}

const PageBottomCtaHorizontal = ({
  icon,
  title,
  subtitle,
  ctaLink,
}: Omit<PageBottomCtaProps, 'direction'>) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        color: 'common.white',
        bgcolor: 'primary.dark',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {icon}
      <Stack spacing={0.5} sx={{ maxWidth: 448 }}>
        <Typography variant="h6" component="p" color="inherit">
          {title}
        </Typography>
        <Typography variant="body1" component="div" color="inherit">
          {subtitle}
        </Typography>
        <Typography color="inherit" variant="body2" fontWeight={600} component="div">
          <ExternalLink href={ctaLink.href} label={ctaLink.label} sx={{ color: 'inherit' }} />
        </Typography>
      </Stack>
    </Stack>
  )
}

const PageBottomCtaVertical = ({
  icon,
  title,
  subtitle,
  ctaLink,
}: Omit<PageBottomCtaProps, 'direction'>) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ color: 'common.white', bgcolor: 'primary.dark', py: 8, px: 4 }}
    >
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', maxWidth: 420 }}>
        {icon}
        <Typography variant="h6" component="p" color="inherit">
          {title}
        </Typography>
        <Typography variant="body1" component="p" color="inherit">
          {subtitle}
        </Typography>
        <Button
          color="negative"
          variant="outlined"
          component="a"
          href={ctaLink.href}
          title={ctaLink.ariaLabel}
          target="_blank"
        >
          {ctaLink.label}
        </Button>
      </Stack>
    </Stack>
  )
}

export const PageBottomCta: React.FC<PageBottomCtaProps> = ({
  direction = 'vertical',
  ...props
}) => {
  return direction === 'vertical' ? (
    <PageBottomCtaVertical {...props} />
  ) : (
    <PageBottomCtaHorizontal {...props} />
  )
}
