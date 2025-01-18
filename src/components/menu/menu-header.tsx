import '../../styles/components/menu/menu-header.css'

import { MenuHeaderProps } from '../../utils/types';
import { ArrowLeft, QrCode, Eye } from 'lucide-react'
  
const MenuHeader = ({ onBackToVenues }: MenuHeaderProps) => {
    return (
        <header className="header">
            <h1 className="title">Menu Manager</h1>

            <div className="buttonGroup">
                <button className={`${"button"} ${"previewButton"}`}>
                    <Eye size={18} />
                    Preview Menu
                </button>

                <button className={`${"button"} ${"qrButton"}`}>
                    <QrCode size={18} />
                    QR Code
                </button>

                <button onClick={onBackToVenues} className={`${"button"} ${"backButton"}`}>
                    <ArrowLeft size={18} />
                    Venues
                </button>
            </div>

        </header>
    )
};
  
export default MenuHeader;