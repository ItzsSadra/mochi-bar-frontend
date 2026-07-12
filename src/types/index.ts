export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category_id: number;
  category_name: string | null;
  category_slug: string | null;
  image_url: string | null;
  ingredients: string | null;
  preparation_time: number | null;
  is_featured: boolean;
  is_new: boolean;
  is_available: boolean;
  sort_order: number;
  gallery_images: MenuGalleryImage[];
  created_at: string;
  updated_at: string;
}

export interface MenuGalleryImage {
  id: number;
  menu_item_id: number;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: number;
  title: string | null;
  caption: string | null;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  display_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  folder: string;
  alt_text: string | null;
  created_at: string;
}

export interface DashboardStats {
  total_menu_items: number;
  total_categories: number;
  total_gallery: number;
  featured_items: number;
  available_items: number;
  new_items: number;
}

export interface Settings {
  [group: string]: {
    [key: string]: string;
  };
}
