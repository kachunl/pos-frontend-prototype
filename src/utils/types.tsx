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
    onEditItem: (item: MenuItemData) => void;
};

export type AddMenuItemProps = {
    onSubmit: (item: MenuItemData) => void;
    onCancel: () => void;
    initialItem?: MenuItemData;
};

export type RemoveConfirmModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
};