/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'

type DataSectionWrapperProps = {
  title: string
  description: string | React.ReactNode
  background?: 'white' | 'grey'
  anchor: string
  children: React.ReactNode
}

export const DataSectionWrapper: React.FC<DataSectionWrapperProps> = ({
  title,
  description,
  background = 'white',
  anchor,
  children,
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      debounce(([entry]) => {
        const distanceFromRoot = window.scrollY
        if (entry.isIntersecting && distanceFromRoot > 50) {
          const hash = `#${entry?.target.id}`
          // Ensure compatibilty with old browser's version
          if (history.replaceState) {
            history.replaceState(null, '', hash)
          } else {
            window.location.hash = hash
          }
        }
      }, 400)
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [])

  return (
    <Box
      component="section"
      sx={{ backgroundColor: background === 'grey' ? 'background.default' : 'background.paper' }}
    >
      <Container sx={{ py: 6, maxWidth: 1340 }} maxWidth={false}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            ref={containerRef}
            id={anchor}
            sx={{ scrollMarginTop: '148px' }}
          >
            {title}
          </Typography>
          <Box>
            <Typography sx={{ mt: 1 }} variant="body1" color="text.primary">
              {description}
            </Typography>
          </Box>
        </Box>
        <Stack sx={{ mt: 3 }} spacing={3}>
          {children}
        </Stack>
      </Container>
    </Box>
  )
}
