import { MenuItemData } from '../utils/types'

const MenuItem = ({ item }: { item: MenuItemData }) => {
    return (
        <div className="menuItem">
            <img src={item.image} alt={item.name} className="menuItemImage" />
            <div className="menuItemDetails">
                <h3>{item.name}</h3>

                <p className="menuItemDescription">{item.description}</p>
                <p className="menuItemPrice">${item.price.toFixed(2)}</p>
            </div>
        </div>
    )
};

export default MenuItem;