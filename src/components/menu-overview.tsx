import '../styles/components/menu-overview.css'

import { useState } from 'react'
import { MenuItemData } from '../utils/types'
import AddMenuItem from './add-menu-item'
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
    const [menuItems, setMenuItems] = useState<MenuItemData[]>(sampleMenuItems);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const handleRemoveItem = (id: string) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
    };

    const handleAddItem = (newItem: MenuItemData) => {
        setMenuItems([...menuItems, newItem]);
    };

    const handleEditItem = (editedItem: MenuItemData) => {
        setMenuItems(menuItems.map(item => item.id === editedItem.id ? editedItem : item));
        setEditingItemId(null);
    };

    return (
        <div className="menuOverview">
            <div className="menuHeader">
                <h2>Menu Overview</h2>
                <button className="editButton" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Done" : "Edit Menu"}
                </button>
            </div>

            <div className="menuGrid">
                {menuItems.map((item) => (
                    <MenuItem 
                        key={item.id} 
                        item={item} 
                        isEditing={isEditing}
                        onEdit={() => setEditingItemId(item.id)}
                        onRemove={() => handleRemoveItem(item.id)}
                    />
                ))}

                {isEditing && (
                    <div className="addMenuItem">
                        <button onClick={() => setEditingItemId("new")}>+</button>
                    </div>
                )}
            </div>

            {editingItemId && (
                <AddMenuItem 
                    onSubmit={(newItem) => {
                        if (editingItemId === "new") {
                            handleAddItem(newItem);
                        } 

                        else {
                            handleEditItem({ ...newItem, id: editingItemId });
                        }
                        setEditingItemId(null);
                    }}
                    onCancel={() => setEditingItemId(null)}
                    initialItem={editingItemId !== "new" ? menuItems.find(item => item.id === editingItemId) : undefined}
                />
            )}
        </div>
    )
};

export default MenuOverview;