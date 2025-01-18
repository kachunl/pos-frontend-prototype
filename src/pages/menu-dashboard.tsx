import '../styles/pages/menu-dashboard.css'

import MenuHeader from '../components/menu/menu-header'
import MenuOverview from '../components/menu/menu-overview'

const MenuDashboard = () => {
    return (
        <div className="container">
            <MenuHeader />

            <main className="main">
                <MenuOverview />
            </main>
        
        </div>
    )
};

export default MenuDashboard;