import MenuOverview from '../components/menu/menu-overview'
import { MenuDashboardProps } from '../utils/types'

const MenuDashboard = ({ venueId, venueName, onBackToVenues }: MenuDashboardProps) => {
    return <MenuOverview venueId={venueId} venueName={venueName} onBackToVenues={onBackToVenues} />
}

export default MenuDashboard;