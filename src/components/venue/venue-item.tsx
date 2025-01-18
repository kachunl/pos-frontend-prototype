import '../../styles/components/venue/venue-item.css'

import { VenueItemProps } from '../../utils/types';

const VenueItem = ({ venue, isEditing, onEdit, onRemove, onClick }: VenueItemProps) => {
    return (
        <div className={`${"venue-item-container"}`} onClick={isEditing ? undefined : onClick}>
            <img src={venue.image || "/placeholder"} alt={venue.name} className="image" />

            <div className="content">
                <h3 className="title">{venue.name}</h3>
                <p className="address">{venue.address}</p>
            </div>

            {isEditing && (
                <div className="overlay">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="button">
                        Edit
                    </button>
                    
                    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className={`${"button"} ${"removeButton"}`}>
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
};

export default VenueItem;