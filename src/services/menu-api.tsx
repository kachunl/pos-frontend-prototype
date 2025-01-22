import { VenueData } from "../utils/types";
import { UnformattedVenueData } from "../utils/types";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/items`;

const MenuService = {
    getAllMenuItem: async (): Promise<VenueData[]> => {
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
                throw new Error(`Failed to fetch menu items: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },

    getMenuItem: async (id: number): Promise<VenueData> => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } 
        
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch menu item: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },

    updateMenuItem: async (id: number, data: Omit<VenueData, "id">): Promise<UnformattedVenueData> => {
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
                throw new Error(`Failed to update menu item: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },
    
    deleteMenuItem: async (id: number): Promise<boolean> => {
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
                throw new Error(`Failed to delete menu item: ${error.message}`);
            }

            throw new Error("An unknown error occurred");
        }
    },    
};

export default MenuService;