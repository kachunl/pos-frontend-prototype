import '../../styles/components/menu/menu-item.css'

import { MenuItemProps } from '../../utils/types'
import { Pencil, Trash2 } from 'lucide-react'

const MenuItem = ({ item, isEditing, onEdit, onRemove }: MenuItemProps)=> {
    return (
        <div className={`${"menu-item"} ${isEditing ? "menu-item-editing" : ""}`}>
            <div className="menu-item-image-container">
                <img 
                    src={item.image || "/placeholder"} 
                    alt={item.name} 
                    className="menu-item-image"
                />
            </div>
            
            <div className="menu-item-content">
                <div className="menu-item-header">
                    <h3 className="menu-item-title">{item.name}</h3>
                    <p className="menu-item-price">${item.price.toFixed(2)}</p>
                </div>

                <p className="menu-item-description">{item.description}</p>
            </div>

            {isEditing && (
                <div className="menu-item-overlay">
                    <button onClick={onEdit} className={`${"menu-item-button"} ${"menu-item-edit-button"}`}>
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button onClick={onRemove} className={`${"menu-item-button"} ${"menu-item-remove-button"}`}>
                        <Trash2 size={16} />
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
};

export default MenuItem;