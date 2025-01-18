import { useState } from 'react'
import { VenueData } from '../utils/types';
import VenueOverview from '../components/venue/venue-overview'
import MenuDashboard from './menu-dashboard'

const VenueDashboard = () => {
    const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null);

    const handleVenueSelect = (venue: VenueData) => {
        setSelectedVenue(venue);
    };

    const handleBackToVenues = () => {
        setSelectedVenue(null);
    };

    if (selectedVenue) {
        return <MenuDashboard venueId={selectedVenue.id} venueName={selectedVenue.name} onBackToVenues={handleBackToVenues} />;
    }

    return <VenueOverview onVenueSelect={handleVenueSelect} />;
};

export default VenueDashboard;