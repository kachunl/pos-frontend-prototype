import '../../styles/components/menu/edit-menu.css'

import { useState, useMemo } from 'react'
import { Pencil, Plus, X } from 'lucide-react'
import { EditMenuProps } from '../../utils/types'
import { MenuItemData } from '../../utils/types'
import AddMenuItem from './add-menu-item'
import MenuItem from './menu-item'
import RemoveConfirmModal from '../modal/remove-confirm-modal'

const EditMenu = ({ menuItems, onRemoveItem, onAddItem, onEditItem, venueName }: EditMenuProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editingItemId, setEditingItemId] = useState<number | null>(null)
    const [removingItemId, setRemovingItemId] = useState<number | null>(null)
    const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null)

    const sortedAndGroupedItems = useMemo(() => {
        const sorted = [...menuItems].sort((a, b) => a.position - b.position)

        return sorted.reduce(
            (acc, item) => {
                if (!acc[item.category]) {
                    acc[item.category] = []
                }

                acc[item.category].push(item)
                return acc
            },
            {} as Record<string, MenuItemData[]>,
        )
    }, [menuItems]);

    const handleRemove = (id: number) => {
        setRemovingItemId(id)
    };
    
    const confirmRemove = () => {
        if (removingItemId) {
          onRemoveItem(removingItemId)
          setRemovingItemId(null)
        }
    };
    
    const handleItemClick = (item: MenuItemData) => {
        setSelectedItem(item)
    };

    return (
        <div className="edit-menu-container">
            <div className="edit-menu-header">
                <h2 className="edit-menu-title">Menu for {venueName}</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="edit-menu-edit-button">
                    <Pencil size={18} />
                    {isEditing ? "Done" : "Edit Menu"}
                </button>
            </div>

            <div className="edit-menu-categories">
                {Object.entries(sortedAndGroupedItems).map(([category, items]) => (
                    <div key={category} className="edit-menu-category">
                        <h3 className="edit-menu-category-title">{category}</h3>

                        <div className="edit-menu-grid">
                            {items.map((item) => (
                                <MenuItem
                                    key={item.name}
                                    item={item}
                                    isEditing={isEditing}
                                    onEdit={() => setEditingItemId(item.id)}
                                    onRemove={() => handleRemove(item.id)}
                                    onClick={() => handleItemClick(item)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <button onClick={() => setEditingItemId(-1)} className="edit-menu-add-button">
                    <Plus size={24} className="edit-menu-add-icon" />
                    <span className="edit-menu-add-text">Add Menu Item</span>
                </button>
            )}
            {editingItemId !== null && (
                <div className="edit-menu-modal">
                    <div className="edit-menu-modal-content">
                        <AddMenuItem
                            onSubmit={(newItem) => {
                                if (editingItemId === -1) {
                                    onAddItem(newItem)
                                }
                                else {
                                    onEditItem({ ...newItem, id: editingItemId })

                                }
                                setEditingItemId(null)
                            }}
                            onCancel={() => setEditingItemId(null)}
                            initialItem={
                                editingItemId !== -1 ? menuItems.find((item) => item.id === editingItemId) : undefined
                            }
                        />
                    </div>
                </div>
            )}

            {selectedItem && (
                <div className="edit-menu-modal">
                    <div className="edit-menu-modal-content">
                        <div className="edit-menu-item-details">
                            <button onClick={() => setSelectedItem(null)} className="edit-menu-close-button">
                                <X size={20} />
                            </button>

                            <div className="edit-menu-item-image-container">
                                <img
                                    src={selectedItem.image_url || "/placeholder"}
                                    alt={selectedItem.name}
                                    className="edit-menu-item-image"
                                />
                            </div>

                            <h3>{selectedItem.name}</h3>
                            <p>Description: {selectedItem.description}</p>
                            <p>Price: ${(selectedItem.price / 100).toFixed(2)}</p>
                            <p>Category: {selectedItem.category}</p>
                            <p>Available: {selectedItem.is_available ? "Yes" : "No"}</p>
                            <p>Position: {selectedItem.position}</p>

                            {selectedItem.modifiers.length > 0 && (
                                <div>
                                    <h4>Modifiers:</h4>

                                    {selectedItem.modifiers.map((modifier, index) => (
                                        <div key={index}>
                                            <h5>{modifier.name}</h5>
                                            <p>Min choices: {modifier.min_choices}</p>
                                            <p>Max choices: {modifier.max_choices}</p>

                                            <ul>
                                                {modifier.choices.map((choice, choiceIndex) => (
                                                <li key={choiceIndex}>
                                                    {choice.name} - ${(choice.price / 100).toFixed(2)}
                                                </li>
                                                ))}
                                            </ul>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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