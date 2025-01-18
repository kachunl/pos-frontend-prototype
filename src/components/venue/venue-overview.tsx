import '../../styles/components/venue/venue-overview.css'

import { useState } from 'react'
import { VenueData } from '../../utils/types'
import { VenueOverviewProps } from '../../utils/types'
import EditVenue from './edit-venue'
import VenueHeader from './venue-header'

const sampleVenues: VenueData[] = [
    {
        id: "1",
        name: "Mc Donalds",
        address: "Rod Laver Arena",
        image: "/placeholder",
    },
    {
        id: "2",
        name: "KFC",
        address: "456 USA",
        image: "/placeholder",
    },
    {
        id: "3",
        name: "Mount Everest",
        address: "999 Everest Lane",
        image: "/placeholder",
    },
];

const VenueOverview = ({ onVenueSelect }: VenueOverviewProps) => {
    const [venues, setVenues] = useState<VenueData[]>(sampleVenues);

    const handleRemoveVenue = (id: string) => {
        setVenues(venues.filter(venue => venue.id !== id));
    };

    const handleAddVenue = (newVenue: VenueData) => {
        setVenues([...venues, newVenue]);
    };

    const handleEditVenue = (editedVenue: VenueData) => {
        setVenues(venues.map(venue => venue.id === editedVenue.id ? editedVenue : venue));
    };

    const handleVenueClick = (venue: VenueData) => {
        onVenueSelect(venue);
    };

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