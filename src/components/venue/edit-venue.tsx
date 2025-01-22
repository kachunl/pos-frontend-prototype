import '../../styles/components/venue/edit-venue.css'

import { useState, useEffect } from 'react'
import { EditVenueProps } from '../../utils/types'
import VenueItem from './venue-item'
import AddVenueItem from './add-venue'
import ConfirmModal from '../modal/remove-confirm-modal'

const EditVenue = ({ venues, onRemoveVenue, onAddVenue, onEditVenue, onVenueClick }: EditVenueProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editingVenueId, setEditingVenueId] = useState<number | null>(null)
    const [removingVenueId, setRemovingVenueId] = useState<number | null>(null)

    console.log('Rendering EditVenue with venues:', venues);
    console.log('Venue IDs:', venues.map(venue => venue.id));
    console.log('Venue data:', venues);

    const handleRemove = (id: number) => {
        setRemovingVenueId(id)
    }

    const confirmRemove = () => {
        if (removingVenueId !== null) {
            onRemoveVenue(removingVenueId)
            setRemovingVenueId(null)
        }
    }

    useEffect(() => {
        console.log('Venue IDs:', venues.map(venue => venue.id));
    }, [venues]);

    return (
        <div className="edit-venue-container">

            <div className="edit-venue-header">
                <h2 className="edit-venue-title">Venues</h2>
                <button className="edit-venue-button" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Done" : "Edit Venues"}
                </button>
            </div>

            <div className="edit-venue-grid">
                {venues.map((venue, index) => (
                /* {venues.map(venue => ( */
                    <VenueItem
                        // key={venue.id}
                        key={`venue-${venue.id}-${index}`}
                        venue={venue}
                        isEditing={isEditing}
                        onEdit={() => setEditingVenueId(venue.id)}
                        onRemove={() => handleRemove(venue.id)}
                        onClick={() => onVenueClick(venue.id)}
                    />
                ))}

                {isEditing && (
                    <button         key="add-venue-button"  // Add this
                    className="edit-venue-add-button" onClick={() => setEditingVenueId(-1)}>
                        +
                    </button>
                )}
            </div>

            {editingVenueId !== null && (
                <div className="edit-venue-modal">
                    <div className="edit-venue-modal-content">
                        <AddVenueItem
                        onSubmit={(newVenue) => {
                            if (editingVenueId === -1) {
                                onAddVenue(newVenue)
                            } 
                            else {
                                onEditVenue({ ...newVenue, id: editingVenueId })
                            }
                            setEditingVenueId(null)
                        }}
                        onCancel={() => setEditingVenueId(null)}
                        initialVenue={editingVenueId !== -1 ? venues.find((venue) => venue.id === editingVenueId) : undefined}
                        />
                    </div>
                </div>
            )}

            <ConfirmModal
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