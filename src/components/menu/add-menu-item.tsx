import '../../styles/components/menu/add-menu-item.css'

import { useState, useEffect } from 'react'
import { MenuItemData } from '../../utils/types'
import { Modifier } from '../../utils/types'
import { AddMenuItemProps } from '../../utils/types'
import { X } from 'lucide-react'

const AddMenuItem = ({ onSubmit, onCancel, initialItem }: AddMenuItemProps) => {
    const [id, setId] = useState(initialItem?.id || 0)
    const [name, setName] = useState(initialItem?.name || "")
    const [description, setDescription] = useState(initialItem?.description || "")
    const [category, setCategory] = useState(initialItem?.category || "")
    const [price, setPrice] = useState(initialItem?.price.toString() || "")
    const [isAvailable, setIsAvailable] = useState(initialItem?.is_available ?? true)
    const [imageUrl, setImageUrl] = useState(initialItem?.image_url || "")
    const [position, setPosition] = useState(initialItem?.position.toString() || "")
    const [modifiers, setModifiers] = useState<Modifier[]>(initialItem?.modifiers || [])

    useEffect(() => {
        if (initialItem) {
            setId(initialItem.id),
            setName(initialItem.name)
            setDescription(initialItem.description)
            setCategory(initialItem.category)
            setPrice(initialItem.price.toString())
            setIsAvailable(initialItem.is_available)
            setImageUrl(initialItem.image_url)
            setPosition(initialItem.position.toString())
            setModifiers(initialItem.modifiers)
        }
    }, [initialItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newItem: MenuItemData = {
            id,
            name,
            description,
            category,
            price: Number.parseInt(price),
            is_available: isAvailable,
            image_url: imageUrl,
            position: Number.parseInt(position),
            modifiers,
        }

        onSubmit(newItem)
    };

    const addModifier = () => {
        setModifiers([...modifiers, { name: "", min_choices: 0, max_choices: 1, choices: [] }])
    };
    
    const updateModifier = (index: number, updatedModifier: Modifier) => {
        const newModifiers = [...modifiers]
        newModifiers[index] = updatedModifier
        setModifiers(newModifiers)
    };
    
    const removeModifier = (index: number) => {
        setModifiers(modifiers.filter((_, i) => i !== index))
    };

    return (
        <div>
            <div className="add-menu-item-header">
                <h3 className="add-menu-item-title">{initialItem ? "Edit Menu Item" : "Add Menu Item"}</h3>
                <button onClick={onCancel} className="add-menu-item-close-button">
                <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="add-menu-item-form">
                <div className="add-menu-item-form-group">
                    <label htmlFor="name" className="add-menu-item-label">
                        Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="description" className="add-menu-item-label">
                        Description
                    </label>

                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="add-menu-item-textarea"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="category" className="add-menu-item-label">
                        Category
                    </label>

                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="price" className="add-menu-item-label">
                        Price (in cents)
                    </label>

                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="isAvailable" className="add-menu-item-label">
                        <input
                            type="checkbox"
                            id="isAvailable"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                            className="add-menu-item-checkbox"
                        />
                        Available
                    </label>
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="imageUrl" className="add-menu-item-label">
                        Image URL
                    </label>

                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="position" className="add-menu-item-label">
                        Position
                    </label>

                    <input
                        type="number"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label className="add-menu-item-label">Modifiers</label>

                    {modifiers.map((modifier, index) => (
                        <div key={index} className="add-menu-item-modifier">
                            <input
                                type="text"
                                value={modifier.name}
                                onChange={(e) => updateModifier(index, { ...modifier, name: e.target.value })}
                                placeholder="Modifier name"
                                className="add-menu-item-input"
                            />
                            <input
                                type="number"
                                value={modifier.min_choices}
                                onChange={(e) => updateModifier(index, { ...modifier, min_choices: Number.parseInt(e.target.value) })}
                                placeholder="Min choices"
                                className="add-menu-item-input"
                            />
                            <input
                                type="number"
                                value={modifier.max_choices}
                                onChange={(e) => updateModifier(index, { ...modifier, max_choices: Number.parseInt(e.target.value) })}
                                placeholder="Max choices"
                                className="add-menu-item-input"
                            />
                            <button type="button" onClick={() => removeModifier(index)} className="add-menu-item-remove-button">
                                Remove
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addModifier} className="add-menu-item-add-button">
                        Add Modifier
                    </button>
                </div>

                <div className="add-menu-item-button-group">
                    <button type="submit" className={`${"add-menu-item-button"} ${"add-menu-item-submit-button"}`}>
                        {initialItem ? "Save Changes" : "Add Item"}
                    </button>

                    <button type="button" onClick={onCancel} className={`${"add-menu-item-button"} ${"add-menu-item-cancel-button"}`}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
};

export default AddMenuItem;