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
            <div className="header">
                <h3 className="title">{initialItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                <button onClick={onCancel} className="closeButton">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <div className="formGroup">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="price" className="label">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                        className="input"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="textarea"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="image" className="label">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="input"
                    />
                </div>

                <div className="buttonGroup">
                    <button type="submit" className={`${"button"} ${"submitButton"}`}>
                        {initialItem ? 'Save Changes' : 'Add Item'}
                    </button>

                    <button type="button" onClick={onCancel} className={`${"button"} ${"cancelButton"}`}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
};

export default AddMenuItem;