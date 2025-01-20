import '../../styles/components/venue/edit-venue.css'

import { useState } from 'react'
import { EditVenueProps } from '../../utils/types'
import VenueItem from './venue-item'
import AddVenueItem from './add-venue'
import ConfirmModal from '../modal/remove-confirm-modal'

const EditVenue = ({ venues, onRemoveVenue, onAddVenue, onEditVenue, onVenueClick }: EditVenueProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editingVenueId, setEditingVenueId] = useState<number | null>(null)
    const [removingVenueId, setRemovingVenueId] = useState<number | null>(null)

    const handleRemove = (id: number) => {
        setRemovingVenueId(id)
    }

    const confirmRemove = () => {
        if (removingVenueId !== null) {
            onRemoveVenue(removingVenueId)
            setRemovingVenueId(null)
        }
    }

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
                        onClick={() => onVenueClick(venue.id)}
                    />
                ))}

                {isEditing && (
                    <button className="edit-venue-add-button" onClick={() => setEditingVenueId(-1)}>
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