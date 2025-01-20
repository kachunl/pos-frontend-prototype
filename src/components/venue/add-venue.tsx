import '../../styles/components/venue/add-venue.css'

import { useState, useEffect } from 'react'
import { VenueData } from '../../utils/types'
import { AddVenueItemProps } from '../../utils/types'

const AddVenueItem = ({ onSubmit, onCancel, initialVenue }: AddVenueItemProps) => {
    const [name, setName] = useState(initialVenue?.name || "")
    const [description, setDescription] = useState(initialVenue?.description || "")
    const [isActive, setIsActive] = useState(initialVenue?.is_active ?? true)
    const [bannerUrl, setBannerUrl] = useState(initialVenue?.banner_url || "")

    useEffect(() => {
        if (initialVenue) {
            setName(initialVenue.name)
            setDescription(initialVenue.description)
            setIsActive(initialVenue.is_active)
            setBannerUrl(initialVenue.banner_url)
        }
    }, [initialVenue])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
            const newVenue: Omit<VenueData, "id"> = {
            name,
            description,
            is_active: isActive,
            banner_url: bannerUrl || "/placeholder",
        }

        onSubmit(newVenue)
    }

  return (
        <form onSubmit={handleSubmit} className="add-venue-item-form">
            <div className="add-venue-item-form-group">
                <label htmlFor="name" className="add-venue-item-label">
                    Venue Name
                </label>
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
                <label htmlFor="description" className="add-venue-item-label">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="add-venue-item-textarea"
                />
            </div>

            <div className="add-venue-item-form-group">
                <label htmlFor="isActive" className="add-venue-item-label">
                <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="add-venue-item-checkbox"
                />
                    Active
                </label>
            </div>

            <div className="add-venue-item-form-group">
                <label htmlFor="bannerUrl" className="add-venue-item-label">
                    Banner URL
                </label>
                <input
                    type="text"
                    id="bannerUrl"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
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