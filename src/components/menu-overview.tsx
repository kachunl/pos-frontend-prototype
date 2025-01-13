import '../styles/components/menu-overview.css'

import { useState, useEffect } from 'react'

interface MenuItem {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

const MenuOverview = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadMenuItems() {
            try {
                setIsLoading(true);
                const items = await fetchMenuItems();
                setMenuItems(items);
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

function MenuItem({ item }: { item: MenuItem }) {
    return (
        <div className="menuItem">
            <img src={item.image} alt={item.name} className="menuItemImage" />
            <div className="menuItemDetails">
                <h3>{item.name}</h3>

                <p className="menuItemDescription">{item.description}</p>
                <p className="menuItemPrice">${item.price.toFixed(2)}</p>
            </div>
        </div>
    )
}