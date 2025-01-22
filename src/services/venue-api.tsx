import { VenueData } from "../utils/types";
import { UnformattedVenueData } from "../utils/types";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/venues`;

const VenueService = {
    getAllVenues: async (): Promise<VenueData[]> => {
        try {
            const response = await fetch(`${BASE_URL}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            return json.venues; 
        } 
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch venues: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },

    getVenue: async (id: number): Promise<VenueData> => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } 
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch venue: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },

    updateVenue: async (id: number, data: Omit<VenueData, "id">): Promise<UnformattedVenueData> => {
    // updateVenue: async (id: number, data: Partial<VenueData>): Promise<VenueData> => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } 
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update venue: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },
    
    deleteVenue: async (id: number): Promise<boolean> => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, 
            {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        }
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete venue: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },

    createVenue: async (data: Omit<VenueData, "id">): Promise<UnformattedVenueData> => {
        try {
            const response = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            return await response.json();
        } 
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create venue: ${error.message}`);
            }
    
            throw new Error("An unknown error occurred");
        }
    }
    
};

export default VenueService;