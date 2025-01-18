import '../../styles/components/venue/venue-header.css'

const VenueHeader = () => {
    return (
        <header className="venue-header-container">
            <h1 className="venue-header-title">Venue Manager</h1>
            
            {/* <div className="venue-header-button-group">
                <button className={`${"venue-header-button"} ${"venue-header-preview-button"}`}>
                    Preview Venues
                </button>
          
                <button className={`${"venue-header-button"} ${"venue-header-qr-button"}`}>
                    QR Code
                </button>
            </div> */}
        </header>
    )
};

export default VenueHeader;