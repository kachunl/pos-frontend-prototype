import "../../styles/components/menu/menu-overview.css";

import { useState, useEffect } from "react";
import { MenuItemData } from "../../utils/types";
import { MenuOverviewProps } from "../../utils/types";

import EditMenu from "./edit-menu";
import MenuHeader from "./menu-header";
import MenuService from "../../services/menu-api";

const MenuOverview = ({
  venueId,
  venueName,
  onBackToVenues,
}: MenuOverviewProps) => {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MenuService.getAllMenuItems(venueId);

      const formattedMenuItems = data.map((item: MenuItemData) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        is_available: item.is_available,
        image_url: item.image_url || "",
        position: item.position,
        modifiers: item.modifiers || [],
      }));

      setMenuItems(formattedMenuItems);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch venues");
      }
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchMenuItems();
  }, [venueId]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await MenuService.deleteMenuItem(itemId);

      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId),
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch venues");
      }
    }
  };

  const handleAddItem = async (newItem: Omit<MenuItemData, "id">) => {
    try {
      const response = await MenuService.createMenuItem(venueId, {
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        price: newItem.price,
        is_available: newItem.is_available,
        image_url: newItem.image_url || "",
        position: newItem.position,
        modifiers: newItem.modifiers || [],
      });

      const formattedMenuItem: MenuItemData = {
        id: response.item.id,
        name: response.item.name,
        description: response.item.description,
        category: response.item.category,
        price: response.item.price,
        is_available: response.item.is_available,
        image_url: response.item.image_url || "",
        position: response.item.position,
        modifiers: response.item.modifiers || [],
      };

      setMenuItems([...menuItems, formattedMenuItem]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleEditItem = async (editedItem: MenuItemData) => {
    try {
      const response = await MenuService.updateMenuItem(editedItem.id, {
        name: editedItem.name,
        description: editedItem.description,
        category: editedItem.category,
        price: editedItem.price,
        is_available: editedItem.is_available,
        image_url: editedItem.image_url || "",
        position: editedItem.position,
        modifiers: editedItem.modifiers,
      });

      const formattedMenuItem: MenuItemData = {
        id: response.item.id,
        name: response.item.name,
        description: response.item.description,
        category: response.item.category,
        price: response.item.price,
        is_available: response.item.is_available,
        image_url: response.item.image_url || "",
        position: response.item.position,
        modifiers: response.item.modifiers,
      };

      setMenuItems(
        menuItems.map((item) =>
          item.id === formattedMenuItem.id ? formattedMenuItem : item,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Loading menu items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <MenuHeader onBackToVenues={onBackToVenues} />
      {error && <div className="error-message">{error}</div>}
      <EditMenu
        menuItems={menuItems}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        venueName={venueName}
      />
    </div>
  );
};

export default MenuOverview;

