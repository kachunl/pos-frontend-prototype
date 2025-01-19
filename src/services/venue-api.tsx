const BASE_URL = ""

const VenueService = {
    // change id type for both (check backend)
    getVenue: async (id: any) => {
        const response = await fetch(`${BASE_URL}/${id}`);

        if (!response.ok) throw new Error("Failed to fetch venue");
        return response.json();
    },

    deleteVenue: async (id: any) => {
        const response = await fetch(`${BASE_URL}/${id}`, 
        {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete venue");
        return response.json();
    }
};

export default VenueService;