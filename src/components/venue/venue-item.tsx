import '../../styles/components/venue/venue-item.css'

import { VenueItemProps } from '../../utils/types';

const VenueItem = ({ venue, isEditing, onEdit, onRemove, onClick }: VenueItemProps) => {
    return (
        <div 
            className={`${"venue-item"} ${isEditing ? "venue-item-editing" : ""}`}
            onClick={isEditing ? undefined : onClick}
        >
            <img src={venue.image || "/placeholder"} alt={venue.name} className="venue-item-image" />
            
            <div className="venue-item-content">
                <h3 className="venue-item-title">{venue.name}</h3>
                <p className="venue-item-address">{venue.address}</p>
            </div>

            {isEditing && (
                <div className="venue-item-overlay">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className={`${"venue-item-button"} ${"venue-item-edit-button"}`}>
                        Edit
                    </button>
                    
                    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className={`${"venue-item-button"} ${"venue-item-remove-button"}`}>
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
};

export default VenueItem;