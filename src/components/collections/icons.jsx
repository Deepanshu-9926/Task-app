import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import FlagRoundedIcon from '@mui/icons-material/FlagRounded'

export const collectionIconMap = {
  book: MenuBookRoundedIcon,
  person: PersonRoundedIcon,
  pencil: EditRoundedIcon,
  cart: ShoppingCartRoundedIcon,
  star: StarRoundedIcon,
  flag: FlagRoundedIcon,
}

export const iconChoices = Object.keys(collectionIconMap)

export function CollectionIcon({ icon, ...props }) {
  const Icon = collectionIconMap[icon] || StarRoundedIcon
  return <Icon {...props} />
}
