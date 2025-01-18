import '../../styles/components/venue/edit-venue.css'

import { useState } from 'react'
import { EditVenueProps } from '../../utils/types'
import VenueItem from './venue-item'
import AddVenueItem from './add-venue'
import RemoveConfirmModal from '../modal/remove-confirm-modal'

const EditVenue = ({ venues, onRemoveVenue, onAddVenue, onEditVenue, onVenueClick }: EditVenueProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingVenueId, setEditingVenueId] = useState<string | null>(null);
    const [removingVenueId, setRemovingVenueId] = useState<string | null>(null);

    const handleRemove = (id: string) => {
        setRemovingVenueId(id);
    };

    const confirmRemove = () => {
        if (removingVenueId) {
            onRemoveVenue(removingVenueId);
            setRemovingVenueId(null);
        }
    };

    return (
        <div className="edit-venue-container">
            <div className="edit-venue-header">
                <h2 className="edit-venue-title">Venues</h2>
                
                <button className="edit-venue-button" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Done" : "Edit Venues"}
                </button>
            </div>

            <div className="edit-venue-grid">
                {venues.map((venue) => (
                    <VenueItem 
                        key={venue.id} 
                        venue={venue} 
                        isEditing={isEditing}
                        onEdit={() => setEditingVenueId(venue.id)}
                        onRemove={() => handleRemove(venue.id)}
                        onClick={() => onVenueClick(venue)}
                    />
                ))}

                {isEditing && (
                    <button className="edit-venue-add-button" onClick={() => setEditingVenueId("new")}>
                        +
                    </button>
                )}
            </div>
            
            {editingVenueId && (
                <div className="edit-venue-modal">
                    <div className="edit-venue-modal-content">
                        <AddVenueItem 
                            onSubmit={(newVenue) => {
                                if (editingVenueId === "new") {
                                onAddVenue(newVenue);
                                } else {
                                onEditVenue({ ...newVenue, id: editingVenueId });
                                }
                                setEditingVenueId(null);
                            }}
                            onCancel={() => setEditingVenueId(null)}
                            initialVenue={editingVenueId !== "new" ? venues.find(venue => venue.id === editingVenueId) : undefined}
                        />
                    </div>
                </div>
            )}

            <RemoveConfirmModal
                isOpen={removingVenueId !== null}
                onConfirm={confirmRemove}
                onCancel={() => setRemovingVenueId(null)}
                title="Remove Venue"
                message="Are you sure you want to remove this venue? This action cannot be undone."
            />

        </div>
    )
};

export default EditVenue;