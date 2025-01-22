// menu
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
    venueName: string;
};

export type AddMenuItemProps = {
    onSubmit: (item: MenuItemData) => void;
    onCancel: () => void;
    initialItem?: MenuItemData;
};

export type MenuItemProps = {
    item: MenuItemData;
    isEditing: boolean;
    onEdit: () => void;
    onRemove: () => void;
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
    venueId: string;
    venueName: string;
    onBackToVenues: () => void;
};

export type MenuDashboardProps = {
    venueId: string;
    venueName: string;
    onBackToVenues: () => void;
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