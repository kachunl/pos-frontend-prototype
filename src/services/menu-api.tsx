import { MenuItemData } from '../utils/types';
import { UnformattedMenuDataForUpdate } from '../utils/types';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/venues`;
const MENU_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/items`;

const MenuService = {
    getAllMenuItems: async (venueId: number) => {
        try {
            const response = await fetch(`${BASE_URL}/${venueId}/items`);
            console.log(response)

            if (!response.ok) {
                throw new Error("Failed to fetch menu items");
            }

            const json = await response.json();
            console.log("SERVICE", json)
            console.log("SERVICE 222", json.items)
            return json.items; 
        } 
        
        catch (error) {
            console.error("Error fetching menu items:", error);
            throw error;
        }
    },

    // use menu base url to get single item
    getMenuItem: async (venueId: number, menuItemId: number) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/${venueId}/items/${menuItemId}`);
            
        //     if (!response.ok) {
        //         throw new Error("Failed to fetch menu item");
        //     }

        //     return await response.json();
        // } 
        
        // catch (error) {
        //     console.error("Error fetching menu item:", error);
        //     throw error;
        // }
    },

    updateMenuItem: async (menuItemId: number, menuItem: Omit<MenuItemData, "id">): Promise<UnformattedMenuDataForUpdate> => {
        try {
            const response = await fetch(`${MENU_BASE_URL}/${menuItemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(menuItem),
            });

            if (!response.ok) {
                throw new Error("Failed to update menu item");
            }

            return await response.json();
        } 
        
        catch (error) {
            console.error("Error updating menu item:", error);
            throw error;
        }
    },

    deleteMenuItem: async (venueId: number, menuItemId: number) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/${venueId}/items/${menuItemId}`, {
        //         method: "DELETE",
        //     });

        //     if (!response.ok) {
        //         throw new Error("Failed to delete menu item");
        //     }

        //     return await response.json();
        // }
        
        // catch (error) {
        //     console.error("Error deleting menu item:", error);
        //     throw error;
        // }
    },

    createMenuItem: async (venueId: number, menuItem: Omit<MenuItemData, "id">) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/${venueId}/items`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(menuItem),
        //     });

        //     if (!response.ok) {
        //         throw new Error("Failed to create menu item");
        //     }

        //     return await response.json();
        // } 
        
        // catch (error) {
        //     console.error("Error creating menu item:", error);
        //     throw error;
        // }
    },

    getMenuItemsByCategory: async (venueId: number, category: string) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/${venueId}/items?category=${category}`);
            
        //     if (!response.ok) {
        //         throw new Error("Failed to fetch menu items by category");
        //     }

        //     return await response.json();
        // }
        
        // catch (error) {
        //     console.error("Error fetching menu items by category:", error);
        //     throw error;
        // }
    }

};

export default MenuService;