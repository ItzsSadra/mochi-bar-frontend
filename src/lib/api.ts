import { Category, MenuItem, MenuGalleryImage, GalleryImage, Media, DashboardStats, Settings, User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path}`;
}

function safeJsonParse(text: string): Record<string, any> {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("پاسخ نامعتبر از سرور");
  }
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const existingHeaders = options.headers;
    const mergedHeaders: Record<string, string> = {};

    if (options.body) {
      mergedHeaders["Content-Type"] = "application/json";
    }

    if (existingHeaders && !(existingHeaders instanceof Headers)) {
      Object.assign(mergedHeaders, existingHeaders);
    }

    if (token) {
      mergedHeaders["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: mergedHeaders,
    });

    const text = await res.text();
    const data = safeJsonParse(text);

    if (!res.ok) {
      throw new Error((data.error as string) || "خطای سرور");
    }

    return data as T;
  }

  async login(username: string, password: string) {
    return this.request<{ token: string; user: User }>("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async getMe() {
    return this.request<{ user: User }>("/me");
  }

  async getMenu(params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    new?: boolean;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.featured) searchParams.set("featured", "true");
    if (params?.new) searchParams.set("new", "true");

    const query = searchParams.toString();
    return this.request<{ items: MenuItem[] }>(`/menu${query ? `?${query}` : ""}`);
  }

  async getMenuItem(id: number) {
    return this.request<{ item: MenuItem }>(`/menu/${id}`);
  }

  async createMenuItem(data: Partial<MenuItem>) {
    return this.request<{ item: MenuItem }>("/menu", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateMenuItem(id: number, data: Partial<MenuItem>) {
    return this.request<{ item: MenuItem }>(`/menu/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMenuItem(id: number) {
    return this.request<{ message: string }>(`/menu/${id}`, {
      method: "DELETE",
    });
  }

  async addMenuGalleryImage(itemId: number, data: { image_url: string; sort_order?: number }) {
    return this.request<{ image: MenuGalleryImage }>(`/menu/${itemId}/gallery`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteMenuGalleryImage(itemId: number, imageId: number) {
    return this.request<{ message: string }>(`/menu/${itemId}/gallery/${imageId}`, {
      method: "DELETE",
    });
  }

  async getCategories() {
    return this.request<{ categories: Category[] }>("/categories");
  }

  async getCategory(id: number) {
    return this.request<{ category: Category }>(`/categories/${id}`);
  }

  async createCategory(data: Partial<Category>) {
    return this.request<{ category: Category }>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: number, data: Partial<Category>) {
    return this.request<{ category: Category }>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number) {
    return this.request<{ message: string }>(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  async getGallery() {
    return this.request<{ images: GalleryImage[] }>("/gallery");
  }

  async getGalleryImage(id: number) {
    return this.request<{ image: GalleryImage }>(`/gallery/${id}`);
  }

  async createGalleryImage(data: Partial<GalleryImage>) {
    return this.request<{ image: GalleryImage }>("/gallery", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateGalleryImage(id: number, data: Partial<GalleryImage>) {
    return this.request<{ image: GalleryImage }>(`/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryImage(id: number) {
    return this.request<{ message: string }>(`/gallery/${id}`, {
      method: "DELETE",
    });
  }

  async getSettings() {
    return this.request<{ settings: Settings }>("/settings");
  }

  async updateSettings(data: Record<string, string>) {
    return this.request<{ message: string }>("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getDashboard() {
    return this.request<{
      stats: DashboardStats;
      recent_menu_items: MenuItem[];
      recent_gallery: GalleryImage[];
    }>("/dashboard");
  }

  async uploadFile(file: File, folder?: string, altText?: string) {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);
    if (altText) formData.append("alt_text", altText);

    const token = this.getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    const text = await res.text();
    const data = safeJsonParse(text);
    if (!res.ok) throw new Error((data.error as string) || "خطای آپلود");
    return data;
  }

  uploadFileWithProgress(
    file: File,
    folder: string | undefined,
    onProgress: (percent: number) => void
  ): Promise<{ media: Media; url: string }> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${this.baseUrl}/upload`);

      const token = this.getToken();
      if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        const data = safeJsonParse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data as { media: Media; url: string });
        } else {
          reject(new Error((data.error as string) || "خطای آپلود"));
        }
      };

      xhr.onerror = () => reject(new Error("خطای شبکه"));
      xhr.send(formData);
    });
  }

  async uploadMultipleFiles(files: File[], folder?: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (folder) formData.append("folder", folder);

    const token = this.getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${this.baseUrl}/upload/multiple`, {
      method: "POST",
      headers,
      body: formData,
    });

    const text = await res.text();
    const data = safeJsonParse(text);
    if (!res.ok) throw new Error((data.error as string) || "خطای آپلود");
    return data;
  }

  async uploadMultipleFilesWithProgress(
    files: File[],
    folder: string | undefined,
    onProgress: (current: number, total: number, filePercent: number) => void
  ) {
    const results: { media: Media; url: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const result = await this.uploadFileWithProgress(files[i], folder, (p) =>
        onProgress(i + 1, files.length, p)
      );
      results.push(result);
    }
    return { files: results.map((r) => r.media), count: results.length };
  }

  async getMedia(params?: { folder?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.folder) searchParams.set("folder", params.folder);
    if (params?.search) searchParams.set("search", params.search);

    const query = searchParams.toString();
    return this.request<{ media: Media[] }>(`/media${query ? `?${query}` : ""}`);
  }

  async updateMedia(id: number, data: Partial<Media>) {
    return this.request<{ media: Media }>(`/media/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteMedia(id: number) {
    return this.request<{ message: string }>(`/media/${id}`, {
      method: "DELETE",
    });
  }

  async getMediaFolders() {
    return this.request<{ folders: string[] }>("/media/folders");
  }
}

export const api = new ApiClient();
