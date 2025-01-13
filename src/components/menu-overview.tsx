import '../styles/components/menu-overview.css'

import { useState, useEffect } from 'react'
import { MenuItemData } from '../utils/types'
import MenuItem from './menu-item'


//========================================================================================================
const sampleMenuItems: MenuItemData[] = [
    {
        id: "1",
        name: "Classic Burger",
        price: 12.99,
        description: "Hand-pressed beef patty with lettuce, tomato, onion, and our special sauce",
        image: "/api/placeholder/" 
    },
    {
        id: "2",
        name: "Margherita Pizza",
        price: 15.99,
        description: "Fresh mozzarella, tomatoes, and basil on our house-made crust",
        image: "/api/placeholder/" 
    },
    {
        id: "3",
        name: "Caesar Salad",
        price: 9.99,
        description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
        image: "/api/placeholder/" 
    },
    {
        id: "4",
        name: "Grilled Salmon",
        price: 24.99,
        description: "Fresh Atlantic salmon with seasonal vegetables and lemon butter sauce",
        image: "/api/placeholder/" 
    },
    {
        id: "4",
        name: "Grilled Salmon",
        price: 24.99,
        description: "Fresh Atlantic salmon with seasonal vegetables and lemon butter sauce",
        image: "/api/placeholder/" 
    }
];
//========================================================================================================


const MenuOverview = () => {
    const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadMenuItems() {
            try {
                setIsLoading(true);

                // database fetch uncomment
                // const items = await fetchMenuItems();
                // setMenuItems(items);

                // hard coded examples
                setMenuItems(sampleMenuItems);

                setError(null);
            } 
            
            catch (err) {
                setError("Failed to load menu items. Please try again later.");
            } 
            
            finally {
                setIsLoading(false);
            }
        }

        loadMenuItems();
    }, []);

    return (
        <div className="menuOverview">

        <div className="menuHeader">
            <h2>Menu Overview</h2>
            <button className="editButton">Edit Menu</button>
        </div>

        {isLoading ? (
            <div className="loadingState">
                <p>Loading menu items...</p>
            </div>
        ) : error ? (
            <div className="errorState">
                <p>{error}</p>
            </div>
        ) : menuItems.length === 0 ? (
            <div className="emptyState">
                <p>Your menu is empty. Add your first item to get started.</p>
            </div>
        ) : (
            <div className="menuGrid">
            {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
            ))}
            </div>
        )}
        </div>
    )
};

export default MenuOverview;