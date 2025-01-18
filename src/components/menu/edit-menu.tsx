import '../../styles/components/menu/edit-menu.css'

import { useState } from 'react'
import { EditMenuProps } from '../../utils/types'
import AddMenuItem from './add-menu-item'

const EditMenu = ({ menuItems, onRemoveItem, onAddItem }: EditMenuProps) => {
    const [isAddingItem, setIsAddingItem] = useState(false);

    return (
        <div className="editMenu">

            <div className="menuItemList">
                {menuItems.map((item) => (
                <div key={item.id} className="menuItemEdit">
                    <img src={item.image} alt={item.name} className="menuItemImage" />

                    <div className="menuItemDetails">
                        <h3>{item.name}</h3>
                        <p className="menuItemDescription">{item.description}</p>
                        <p className="menuItemPrice">${item.price.toFixed(2)}</p>
                    </div>

                    <button className="removeButton" onClick={() => onRemoveItem(item.id)}>
                        Remove
                    </button>
                </div>
                ))}

            </div>

            {isAddingItem ? (
                <AddMenuItem 
                    onSubmit={(newItem) => {
                        onAddItem(newItem);
                        setIsAddingItem(false);
                    }}
                    onCancel={() => setIsAddingItem(false)}
                />
            ) : (
                <button className="addButton" onClick={() => setIsAddingItem(true)}>
                    Add New Item
                </button>
            )}

        </div>
    )
};

export default EditMenu;