export type MenuItemData = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
};

export type EditMenuProps = {
    menuItems: MenuItemData[];
    onRemoveItem: (id: string) => void;
    onAddItem: (item: MenuItemData) => void;
};


export type AddMenuItemProps = {
    onSubmit: (item: MenuItemData) => void;
    onCancel: () => void;
    initialItem?: MenuItemData;
};