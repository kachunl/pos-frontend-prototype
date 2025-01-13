import '../styles/components/menu-header.css'

const MenuHeader = () => {
    return (
        <header className="header">
            <h1>Menu Dashboard</h1>
            <div className="headerButtons">
                <button className="previewButton">Preview Menu</button>
                <button className="qrButton">QR Code</button>
            </div>
        </header>
    )
};

export default MenuHeader;