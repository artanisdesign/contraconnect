export interface BasicCardProps {
  title: string;
  description?: string;
  noOfDocuments: number;
  category: string;
  isBookmarked?: boolean;
  tagLine?: string;
  href?: string;
  active?: boolean;
}

export interface CategoryCardProps {
  title: string;
  href: string;
  count?: number;
  description?: string;
  popularItems?: PopularItem[];
}

export interface PopularItem {
  title: string;
  href: string;
  documentCount?: number;
  updatedAt?: string;
}
