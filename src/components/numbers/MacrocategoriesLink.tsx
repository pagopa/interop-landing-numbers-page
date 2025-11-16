import { MACROCATEGORIES_LINK_HREF } from '@/configs/constants.config'
import { Link } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

export const MacrocategoriesLink = () => {
  return (
    <Link underline="hover" href={MACROCATEGORIES_LINK_HREF} target="_blank">
      file <LaunchIcon fontSize="small" sx={{ position: 'relative', top: 6 }} />
    </Link>
  )
}
