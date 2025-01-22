import '../../styles/components/menu/menu-overview.css'

import { useState } from 'react'
import { MenuItemData } from '../../utils/types'
import { MenuOverviewProps } from '../../utils/types'
import EditMenu from './edit-menu'
import MenuHeader from './menu-header'

//========================================================================================================
const sampleMenuItems: MenuItemData[] = [
    {
        name: "Pad Krapow (1kg)",
        description: "Thai classic",
        category: "rice",
        price: 1200,
        is_available: true,
        image_url: "/placeholder",
        position: 2,
        modifiers: [
            {
                name: "Spice Level",
                min_choices: 0,
                max_choices: 4,
                choices: [
                    { name: "Less spice", price: 0 },
                    { name: "Medium spice", price: 0 },
                    { name: "More spice", price: 0 },
                    { name: "Mega spice", price: 1 },
                ],
            },
        ],
    },
    {
        name: "Pink Milk",
        description: "Pink Sweet Milk",
        category: "drink",
        price: 999,
        is_available: true,
        image_url: "/placeholder",
        position: 1,
        modifiers: [],
    },
]
//========================================================================================================

const MenuOverview = ({ venueId, venueName, onBackToVenues }: MenuOverviewProps) => {
    const [menuItems, setMenuItems] = useState<MenuItemData[]>(sampleMenuItems);
      
    const handleRemoveItem = (name: string) => {
        setMenuItems(menuItems.filter(item => item.name !== name));
    };
    
    const handleAddItem = (newItem: MenuItemData) => {
        setMenuItems([...menuItems, newItem]);
    };
    
    const handleEditItem = (editedItem: MenuItemData) => {
        setMenuItems(menuItems.map(item => item.name === editedItem.name ? editedItem : item));
    };
    
    return (
        <div className="container">
            <MenuHeader onBackToVenues={onBackToVenues} />
            
            <EditMenu
                menuItems={menuItems}
                onRemoveItem={handleRemoveItem}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                venueName={venueName}
            />
        </div>
    )
};

export default MenuOverview;