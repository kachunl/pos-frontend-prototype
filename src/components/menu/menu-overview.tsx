import '../../styles/components/menu/menu-overview.css'

import { useState } from 'react'
import { MenuItemData } from '../../utils/types'
import { MenuOverviewProps } from '../../utils/types'
import EditMenu from './edit-menu'
import MenuHeader from './menu-header'

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

const MenuOverview = ({ venueId, venueName, onBackToVenues }: MenuOverviewProps) => {
    const [menuItems, setMenuItems] = useState<MenuItemData[]>(sampleMenuItems);
      
    const handleRemoveItem = (id: string) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
    };
    
    const handleAddItem = (newItem: MenuItemData) => {
        setMenuItems([...menuItems, newItem]);
    };
    
    const handleEditItem = (editedItem: MenuItemData) => {
        setMenuItems(menuItems.map(item => item.id === editedItem.id ? editedItem : item));
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