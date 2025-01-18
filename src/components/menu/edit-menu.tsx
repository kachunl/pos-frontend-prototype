import '../../styles/components/menu/edit-menu.css'

import { useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { EditMenuProps } from '../../utils/types'
import AddMenuItem from './add-menu-item'
import MenuItem from './menu-item'
import RemoveConfirmModal from '../modal/remove-confirm-modal'

const EditMenu = ({ menuItems, onRemoveItem, onAddItem, onEditItem, venueName }: EditMenuProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [removingItemId, setRemovingItemId] = useState<string | null>(null);

    const handleRemove = (id: string) => {
        setRemovingItemId(id);
    };

    const confirmRemove = () => {
        if (removingItemId) {
            onRemoveItem(removingItemId);
            setRemovingItemId(null);
        }
    };

    return (
        <div className="edit-menu">
            <div className="edit-menu-header">
                <h2 className="edit-menu-title">Menu for {venueName}</h2>

                <button onClick={() => setIsEditing(!isEditing)} className="edit-menu-edit-button">
                    {isEditing ? (
                        <>
                            <Pencil size={20} />
                            Done
                        </>
                    ) : (
                        <>
                            <Pencil size={20} />
                            Edit Menu
                        </>
                    )}
                </button>
            </div>

            <div className="edit-menu-grid">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isEditing={isEditing}
                        onEdit={() => setEditingItemId(item.id)}
                        onRemove={() => handleRemove(item.id)}
                    />
                ))}

                {isEditing && (
                    <button onClick={() => setEditingItemId("new")} className="edit-menu-add-button">
                        <Plus size={24} />
                        <span className="edit-menu-add-text">Add Menu Item</span>
                    </button>
                )}
            </div>

            {editingItemId && (
                <div className="edit-menu-modal">
                    <div className="edit-menu-modal-content">
                        <AddMenuItem
                            onSubmit={(newItem) => {
                                if (editingItemId === "new") {
                                    onAddItem(newItem);
                                } 
                                
                                else {
                                    onEditItem(newItem);
                                }
                                
                                setEditingItemId(null);
                            }}
                            onCancel={() => setEditingItemId(null)}
                            initialItem={editingItemId !== "new" ? menuItems.find(item => item.id === editingItemId) : undefined}
                        />
                    </div>
                </div>
            )}
            <RemoveConfirmModal
                isOpen={removingItemId !== null}
                onConfirm={confirmRemove}
                onCancel={() => setRemovingItemId(null)}
                title="Remove Menu Item"
                message="Are you sure you want to remove this menu item? This action cannot be undone."
            />
        </div>
    )
};

export default EditMenu;