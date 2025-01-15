import { MenuItemData } from '../utils/types'

const MenuItem = ({ item, isEditing, onEdit, onRemove }: { 
        item: MenuItemData; 
        isEditing: boolean;
        onEdit: () => void;
        onRemove: () => void;
    }) => {

    return (
        <div className={`${"menuItem"} ${isEditing ? "editable" : ''}`}>
            <img src={item.image || "/image"} alt={item.name} className="menuItemImage" />

            <div className="menuItemDetails">
                <h3>{item.name}</h3>
                <p className="menuItemDescription">{item.description}</p>
                <p className="menuItemPrice">${item.price.toFixed(2)}</p>
            </div>

            {isEditing && (
                <div className="editOverlay">
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onRemove}>Remove</button>
                </div>
            )}

        </div>
        )
  };

  export default MenuItem;