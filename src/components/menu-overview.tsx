import '../styles/components/menu-overview.css'

import { useState, useEffect } from 'react'
import { MenuItemData } from '../utils/types'
import MenuItem from './menu-item'


//========================================================================================================
const sampleMenuItems: MenuItemData[] = [
    {
        id: "1",
        name: "Pad Thai",
        price: 17.99,
        description: "Pad Thai is a stir-fried rice noodle dish commonly served as a street food in Thailand.",
        image: "/api/placeholder/" 
    },
    {
        id: "2",
        name: "Pad Kra Pao",
        price: 14.99,
        description: "A real Thai classic Pad Krapao ( which means basil stir-fry) topped with, or served over, a crispy fried egg with a slightly runny yolk.",
        image: "/api/placeholder/" 
    },
    {
        id: "3",
        name: "Tom Yum Kung",
        price: 19.99,
        description: "om yum is known for its distinctive hot and sour flavours, with fragrant spices and herbs used abundantly in the broth.",
        image: "/api/placeholder/" 
    },
    {
        id: "4",
        name: "Pad See Ew",
        price: 17.99,
        description: "Pad See Ew is salty, balanced with a touch of sour and a wonderful chargrilled flavour.",
        image: "/api/placeholder/" 
    },
    {
        id: "5",
        name: "Som Tam",
        price: 19.99,
        description: "Spicy salad made from shredded unripe papaya.",
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