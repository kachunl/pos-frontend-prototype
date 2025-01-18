import '../../styles/components/menu/add-menu-item.css'

import { useState, useEffect } from 'react'
import { MenuItemData } from '../../utils/types'
import { AddMenuItemProps } from '../../utils/types'
import { X } from 'lucide-react'

const AddMenuItem = ({ onSubmit, onCancel, initialItem }: AddMenuItemProps) => {
    const [name, setName] = useState(initialItem?.name || "");
    const [price, setPrice] = useState(initialItem?.price.toString() || "");
    const [description, setDescription] = useState(initialItem?.description || "");
    const [image, setImage] = useState(initialItem?.image || "");

    useEffect(() => {
        if (initialItem) {
            setName(initialItem.name);
            setPrice(initialItem.price.toString());
            setDescription(initialItem.description);
            setImage(initialItem.image);
        }
    }, [initialItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem: MenuItemData = {
            id: initialItem?.id || Date.now().toString(),
            name,
            price: parseFloat(price),
            description,
            image: image || "/image",
        };
        onSubmit(newItem);
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
                    <label htmlFor="name" className="add-menu-item-label">Name</label>
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
                    <label htmlFor="price" className="add-menu-item-label">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                        className="add-menu-item-input"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="description" className="add-menu-item-label">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="add-menu-item-textarea"
                    />
                </div>

                <div className="add-menu-item-form-group">
                    <label htmlFor="image" className="add-menu-item-label">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="add-menu-item-input"
                    />
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