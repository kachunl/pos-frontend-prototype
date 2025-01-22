import '../../styles/components/menu/menu-item.css'

import { MenuItemProps } from '../../utils/types'
import { Pencil, Trash2 } from 'lucide-react'

const MenuItem = ({ item, isEditing, onEdit, onRemove, onClick }: MenuItemProps)=> {
    return (
        <div
            className={`${"menu-item"} ${isEditing ? "menu-item-editing" : ""}`}
            onClick={isEditing ? undefined : onClick}
        >
            <div className="menu-item-content">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-price">${(item.price / 100).toFixed(2)}</p>
            </div>

            {isEditing && (
                <div className="menu-item-overlay">
                    <button
                        onClick={(e) => {
                        e.stopPropagation()
                        onEdit()
                        }}
                        className={`${"menu-item-button"} ${"menu-item-edit-button"}`}
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        onClick={(e) => {
                        e.stopPropagation()
                        onRemove()
                        }}
                        className={`${"menu-item-button"} ${"menu-item-remove-button"}`}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
        </div>
    )
};

export default MenuItem;