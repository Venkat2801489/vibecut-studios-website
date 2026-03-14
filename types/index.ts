export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  drive_link: string;
  display_order: number;
  created_at: string;
}

export interface Video {
  id: string;
  category_id: string;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  position: number;
  is_featured: boolean;
  created_at: string;
  category?: Category;
}

export interface AdminSession {
  isLoggedIn: boolean;
}
