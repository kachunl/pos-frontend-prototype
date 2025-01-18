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
        <div className="container">
            <div className="header">
                <h2 className="title">Venues</h2>
                <button className="editButton" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Done" : "Edit Venues"}
                </button>
            </div>

            <div className="venueGrid">
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
                    <button className="addVenueButton" onClick={() => setEditingVenueId("new")}>
                        +
                    </button>
                )}
            </div>

            {editingVenueId && (
                <div className="modal">
                    <div className="modalContent">
                        <AddVenueItem 
                            onSubmit={(newVenue) => {
                                if (editingVenueId === "new") {
                                    onAddVenue(newVenue);
                                } 
                                
                                else {
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