import '../../styles/components/menu/menu-header.css'

import { MenuHeaderProps } from '../../utils/types';
import { ArrowLeft, QrCode, Eye } from 'lucide-react'
  
const MenuHeader = ({ onBackToVenues }: MenuHeaderProps) => {
    return (
        <header className="menu-header">
            <h1 className="menu-header-title">Menu Manager</h1>
            
            <div className="menu-header-buttons">
                <button className="menu-header-preview">
                    <Eye size={20} />
                    Preview Menu
                </button>

                <button className="menu-header-qr">
                    <QrCode size={20} />
                    QR Code
                </button>

                <button onClick={onBackToVenues} className="menu-header-back">
                    <ArrowLeft size={20} />
                    Venues
                </button>
            </div>

        </header>
    )
};
  
export default MenuHeader;