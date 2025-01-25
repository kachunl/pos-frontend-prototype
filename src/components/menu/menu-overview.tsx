import "../../styles/components/menu/menu-overview.css";

import { useState, useEffect } from "react";
import { MenuItemData } from "../../utils/types";
import { MenuOverviewProps } from "../../utils/types";
import { UnformattedMenuData } from "../../utils/types";

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

  // const handleRemoveItem = (name: string) => {
  //     setMenuItems(menuItems.filter(item => item.name !== name));
  // };

  // const handleAddItem = (newItem: MenuItemData) => {
  //     setMenuItems([...menuItems, newItem]);
  // };

  // const handleEditItem = (editedItem: MenuItemData) => {
  //     setMenuItems(menuItems.map(item => item.name === editedItem.name ? editedItem : item));
  // };

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await MenuService.getAllMenuItems(venueId);
      console.log("Raw API Response:", data);

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

      console.log("LOOK HERE", formattedMenuItems);

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
    console.log(newItem);
    console.log("Payload being sent:", JSON.stringify(newItem, null, 2));

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

      console.log(response);
      console.log(response.item);

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

