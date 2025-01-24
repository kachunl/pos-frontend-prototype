import '../../styles/components/menu/add-menu-item.css'

import { useState, useEffect } from 'react'
import { MenuItemData } from '../../utils/types'
import { Modifier } from '../../utils/types'
import { ModifierChoice } from '../../utils/types'
import { AddMenuItemProps } from '../../utils/types'
import { X, Plus, Minus } from 'lucide-react'

const AddMenuItem = ({ onSubmit, onCancel, initialItem }: AddMenuItemProps) => {
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

        const newItem: Omit<MenuItemData, "id">  = {
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

    const addChoice = (modifierIndex: number) => {
        const newModifiers = [...modifiers]
        const currentModifier = newModifiers[modifierIndex]
        
        if (currentModifier.choices.length < currentModifier.max_choices) {
            currentModifier.choices.push({ name: "", price: 0 })
            setModifiers(newModifiers)
        }
    };
    
    const updateChoice = (modifierIndex: number, choiceIndex: number, updatedChoice: ModifierChoice) => {
        const newModifiers = [...modifiers]
        newModifiers[modifierIndex].choices[choiceIndex] = updatedChoice
        setModifiers(newModifiers)
    };
    
    const removeChoice = (modifierIndex: number, choiceIndex: number) => {
        const newModifiers = [...modifiers]
        newModifiers[modifierIndex].choices.splice(choiceIndex, 1)
        setModifiers(newModifiers)
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
                    <label className="add-menu-item-section-title">Modifiers</label>
                    
                    {modifiers.map((modifier, modifierIndex) => (
                        <div key={modifierIndex} className="add-menu-item-modifier">
                            <div className="add-menu-item-modifier-header">
                                <input
                                    type="text"
                                    value={modifier.name}
                                    onChange={(e) => updateModifier(modifierIndex, { ...modifier, name: e.target.value })}
                                    placeholder="Modifier name"
                                    className="add-menu-item-input"
                                />
                                
                                <button
                                    type="button"
                                    onClick={() => removeModifier(modifierIndex)}
                                    className="add-menu-item-remove-button"
                                >
                                    <Minus size={16} />
                                    Remove Modifier
                                </button>
                            </div>

                            <div className="add-menu-item-modifier-limits">
                                <div className="add-menu-item-number-input">
                                    <label>Min choices</label>
                                    <input
                                        type="number"
                                        value={modifier.min_choices}
                                        onChange={(e) =>
                                        updateModifier(modifierIndex, { ...modifier, min_choices: Number(e.target.value) })}
                                        min="0"
                                        className="add-menu-item-input"
                                    />
                                </div>

                                <div className="add-menu-item-number-input">
                                    <label>Max choices</label>
                                    <input
                                        type="number"
                                        value={modifier.max_choices}
                                        onChange={(e) => {
                                            const newMaxChoices = Number(e.target.value)
                                            const updatedModifier = { ...modifier, max_choices: newMaxChoices }
                                            if (newMaxChoices < modifier.choices.length) {
                                                updatedModifier.choices = modifier.choices.slice(0, newMaxChoices)
                                            }
                                            updateModifier(modifierIndex, updatedModifier)
                                        }}
                                        min="0"
                                        className="add-menu-item-input"
                                    />
                                </div>
                        </div>

                        <div className="add-menu-item-choices">
                            <h4 className="add-menu-item-section-title">
                                Choices ({modifier.choices.length} / {modifier.max_choices})
                            </h4>

                            {modifier.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex} className="add-menu-item-choice">
                                    <input
                                        type="text"
                                        value={choice.name}
                                        onChange={(e) => updateChoice(modifierIndex, choiceIndex, { ...choice, name: e.target.value })}
                                        placeholder="Choice name"
                                        className="add-menu-item-input"
                                    />
                                    <div className="add-menu-item-number-input">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            value={choice.price}
                                            onChange={(e) =>
                                            updateChoice(modifierIndex, choiceIndex, { ...choice, price: Number(e.target.value) })
                                            }
                                            min="0"
                                            placeholder="0"
                                            className="add-menu-item-input"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeChoice(modifierIndex, choiceIndex)}
                                        className="add-menu-item-icon-button"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}

                                <button
                                    type="button"
                                    onClick={() => addChoice(modifierIndex)}
                                    className="add-menu-item-add-button"
                                    disabled={modifier.choices.length >= modifier.max_choices}
                                >
                                    <Plus size={16} />
                                    Add Choice
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={addModifier} className="add-menu-item-add-button">
                        <Plus size={16} />
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