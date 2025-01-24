export type MenuItemData = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    is_available: boolean;
    image_url: string;
    position: number;
    modifiers: Array<{
        name: string;
        min_choices: number;
        max_choices: number;
        choices: Array<{
            name: string;
            price: number;
        }>;
    }>;
}

export type Modifier = {
    name: string
    min_choices: number
    max_choices: number
    choices: ModifierChoice[]
};

export type ModifierChoice = {
    name: string
    price: number
};

export type EditMenuProps = {
    menuItems: MenuItemData[];
    onRemoveItem: (id: number) => void;
    onAddItem: (item: Omit<MenuItemData, "id">) => void;
    onEditItem: (item: MenuItemData) => void;
    venueName: string;
};

export type AddMenuItemProps = {
    onSubmit: (item: Omit<MenuItemData, "id">) => void
    onCancel: () => void;
    initialItem?: MenuItemData;
};

export type MenuItemProps = {
    item: MenuItemData;
    isEditing: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onClick: () => void
};

export type RemoveConfirmModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
};

export type MenuHeaderProps = {
    onBackToVenues: () => void;
};

export type MenuOverviewProps = {
    venueId: number;
    venueName: string;
    onBackToVenues: () => void;
};

export type MenuDashboardProps = {
    venueId: number;
    venueName: string;
    onBackToVenues: () => void;
};

export type UnformattedMenuData = {
    items: {
        id: number;
        name: string;
        description: string;
        category: string;
        price: number;
        is_available: boolean;
        image_url: string;
        position: number;
        modifiers: Array<{
            name: string;
            min_choices: number;
            max_choices: number;
            choices: Array<{
                name: string;
                price: number;
            }>;
        }>;
    };
};

export type UnformattedMenuDataForItem = {
    item: {
        id: number;
        name: string;
        description: string;
        category: string;
        price: number;
        is_available: boolean;
        image_url: string;
        position: number;
        modifiers: Array<{
            name: string;
            min_choices: number;
            max_choices: number;
            choices: Array<{
                name: string;
                price: number;
            }>;
        }>;
    };
};

// venue
export type VenueData = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    banner_url: string;
};
  
export type AddVenueItemProps = {
    onSubmit: (venue: Omit<VenueData, "id">) => void
    onCancel: () => void;
    initialVenue?: VenueData;
};

export type EditVenueProps = {
    venues: VenueData[];
    onRemoveVenue: (id: number) => void;
    onAddVenue: (venue: Omit<VenueData, "id">) => void;
    onEditVenue: (venue: VenueData) => void;
    onVenueClick: (id: number) => void;
};

export type VenueItemProps = {
    venue: VenueData;
    isEditing: boolean;
    onEdit: () => void;
    onRemove: () => void;
    onClick: () => void;
};

export type VenueOverviewProps = {
    onVenueSelect: (venue: VenueData) => void;
};

export type UnformattedVenueData = {
    venue: {
        id: number;
        name: string;
        description: string;
        is_active: boolean;
        banner_url?: string;
    };
};