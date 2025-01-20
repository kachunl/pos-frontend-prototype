import '../../styles/components/venue/venue-overview.css'

import { useState } from 'react'
import { VenueData } from '../../utils/types'
import { VenueOverviewProps } from '../../utils/types'
import EditVenue from './edit-venue'
import VenueHeader from './venue-header'

const sampleVenues: VenueData[] = [
    {
        id: 1,
        name: "Mc Donalds",
        description: "Rod Laver Arena",
        is_active: true,
        banner_url: "/placeholder",
    },
    {
        id: 2,
        name: "KFC",
        description: "456 USA",
        is_active: false,
        banner_url: "/placeholder",
    },
    {
        id: 3,
        name: "Mount Everest",
        description: "999 Everest Lane",
        is_active: true,
        banner_url: "/placeholder",
    },
];

const VenueOverview = ({ onVenueSelect }: VenueOverviewProps) => {
    const [venues, setVenues] = useState<VenueData[]>(sampleVenues)

    const handleRemoveVenue = (id: number) => {
        setVenues(venues.filter((venue) => venue.id !== id))
    }

    const handleAddVenue = (newVenue: Omit<VenueData, "id">) => {
        const newId = Math.max(...venues.map((v) => v.id)) + 1
        setVenues([...venues, { ...newVenue, id: newId }])
    }

    const handleEditVenue = (editedVenue: VenueData) => {
        setVenues(venues.map((venue) => (venue.id === editedVenue.id ? editedVenue : venue)))
    }

    const handleVenueClick = (id: number) => {
        const venue = venues.find((v) => v.id === id)
        if (venue) {
            onVenueSelect(venue)
        }
    }

    return (
        <div className="venue-overview-container">
            <VenueHeader />
            <EditVenue
                venues={venues}
                onRemoveVenue={handleRemoveVenue}
                onAddVenue={handleAddVenue}
                onEditVenue={handleEditVenue}
                onVenueClick={handleVenueClick}
            />
        </div>
    )
};

export default VenueOverview;