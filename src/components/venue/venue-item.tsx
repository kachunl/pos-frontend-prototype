import '../../styles/components/venue/venue-item.css'

import { VenueItemProps } from '../../utils/types';
import { CheckCircle, XCircle } from 'lucide-react'

const VenueItem = ({ venue, isEditing, onEdit, onRemove, onClick }: VenueItemProps) => {
    return (
        <div
            className={`${"venue-item"} ${isEditing ? "venue-item-editing" : ""}`}
            onClick={isEditing ? undefined : onClick}
         >
            <img src={venue.banner_url || "/placeholder"} alt={venue.name} className="venue-item-image" />

            <div className="venue-item-content">
                <div className="venue-item-header">
                    <h3 className="venue-item-title">{venue.name}</h3>
                    {venue.is_active ? (
                        <CheckCircle className="venue-item-status-icon" size={20} />
                        ) : (
                        <XCircle className="venue-item-status-icon" size={20} />
                    )}
                </div>

                <p className="venue-item-description">{venue.description}</p>
                <span
                    className={`${"venue-item-status"} ${venue.is_active ? "venue-item-status-active" : "venue-item-status-inactive"}`}
                >
                    {venue.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            {isEditing && (
                <div className="venue-item-overlay">
                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                    }}
                    className={`${"venue-item-button"} ${"venue-item-edit-button"}`}
                    >
                        Edit
                    </button>

                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove()
                    }}
                    className={`${"venue-item-button"} ${"venue-item-remove-button"}`}
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
};

export default VenueItem;