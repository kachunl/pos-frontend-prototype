import '../../styles/components/venue/venue-overview.css'

import { useEffect, useState } from 'react'
import { VenueData } from '../../utils/types'
import { VenueOverviewProps } from '../../utils/types'
import EditVenue from './edit-venue'
import VenueHeader from './venue-header'

import VenueService from '../../services/venue-api';

// const sampleVenues: VenueData[] = [
//     {
//         id: 1,
//         name: "Mc Donalds",
//         description: "Rod Laver Arena",
//         is_active: true,
//         banner_url: "/placeholder",
//     },
//     {
//         id: 2,
//         name: "KFC",
//         description: "456 USA",
//         is_active: false,
//         banner_url: "/placeholder",
//     },
//     {
//         id: 3,
//         name: "Mount Everest",
//         description: "999 Everest Lane",
//         is_active: true,
//         banner_url: "/placeholder",
//     },
// ];

const VenueOverview = ({ onVenueSelect }: VenueOverviewProps) => {
    const [venues, setVenues] = useState<VenueData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVenues = async () => {
            setLoading(true);
            try {
                const data = await VenueService.getAllVenues();

                const formattedVenues = data.map((venue: VenueData) => ({
                    id: venue.id,
                    name: venue.name,
                    description: venue.description,
                    is_active: venue.is_active,
                    banner_url: venue.banner_url || "/placeholder"
                }));
                setVenues(formattedVenues);
            } 

            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } 
                else {
                    setError("Failed to fetch venues");
                }
            } 
            
            finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    const handleRemoveVenue = async (id: number) => {
        try {
            await VenueService.deleteVenue(Number(id));
            setVenues(venues.filter(venue => venue.id !== id));
        } 
        
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleAddVenue = async (newVenue: Omit<VenueData, "id">) => {
        // try {
        //     const response = await VenueService.createVenue({
        //         id: newVenue.id,
        //         name: newVenue.name,
        //         description: newVenue.description,
        //         is_active: newVenue.is_active,
        //         banner_url: newVenue.banner_url || "/placeholder"
        //     });
            
        //     const formattedVenue: VenueData = {
        //         id: response.id,
        //         name: response.name,
        //         description: response.description,
        //         is_active: response.is_active,
        //         banner_url: response.banner_url || "/placeholder"
        //     };
            
        //     setVenues([...venues, formattedVenue]);
        // } 
        
        // catch (error) {
        //     if (error instanceof Error) {
        //         setError(error.message);
        //     }
        // }
    };

    const handleEditVenue = async (editedVenue: VenueData) => {
        try {

            console.log("Payload:", {
                id: editedVenue.id,
                name: editedVenue.name,
                description: editedVenue.description,
                is_active: editedVenue.is_active,
                banner_url: editedVenue.banner_url || "/placeholder",
            });

            const response = await VenueService.updateVenue(editedVenue.id, {
                name: editedVenue.name,
                description: editedVenue.description,
                is_active: editedVenue.is_active,
                banner_url: editedVenue.banner_url || "/placeholder"
            });

            setVenues(venues.map(venue => 
                venue.id === editedVenue.id 
                    ? {
                        ...editedVenue,
                        banner_url: response.banner_url || "/placeholder"
                      }
                    : venue
            ));
        } 
        
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const handleVenueClick = (id: number) => {
        const venue = venues.find((v) => v.id === id);
        if (venue) {
            onVenueSelect(venue);
        }
    };

    if (loading) return <div>Loading venues...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="venue-overview-container">
            <VenueHeader />
            {error && <div className="error-message">{error}</div>}
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