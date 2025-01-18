import '../../styles/components/venue/add-venue.css'

import { useState, useEffect } from 'react'
import { VenueData } from '../../utils/types';
import { AddVenueItemProps } from '../../utils/types';

const AddVenueItem = ({ onSubmit, onCancel, initialVenue }: AddVenueItemProps) => {
    const [name, setName] = useState(initialVenue?.name || "");
    const [address, setAddress] = useState(initialVenue?.address || "");
    const [image, setImage] = useState(initialVenue?.image || "");

    useEffect(() => {
        if (initialVenue) {
            setName(initialVenue.name);
            setAddress(initialVenue.address);
            setImage(initialVenue.image);
        }
    }, [initialVenue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newVenue: VenueData = {
            id: initialVenue?.id || Date.now().toString(),
            name,
            address,
            image: image || "/placeholder",
        };
        onSubmit(newVenue);
    };

    return (
        <form onSubmit={handleSubmit} className="add-venue-item-form">
            <div className="add-venue-item-form-group">
                <label htmlFor="name" className="add-venue-item-label">Venue Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="add-venue-item-input"
                />
            </div>

            <div className="add-venue-item-form-group">
                <label htmlFor="address" className="add-venue-item-label">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="add-venue-item-input"
                />
            </div>

            <div className="add-venue-item-form-group">
                <label htmlFor="image" className="add-venue-item-label">Image URL</label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="add-venue-item-input"
                />
            </div>

            <div className="add-venue-item-button-group">
                <button type="submit" className={`${"add-venue-item-button"} ${"add-venue-item-submit-button"}`}>
                    {initialVenue ? "Update Venue" : "Add Venue"}
                </button>

                <button type="button" onClick={onCancel} className={`${"add-venue-item-button"} ${"add-venue-item-cancel-button"}`}>
                    Cancel
                </button>
            </div>
            
        </form>
    )
};

export default AddVenueItem;