import { type Product, type Category, type ProductImage } from "@prisma/client";

export type ProductWithRelations = Product & {
  category: Category;
  images: ProductImage[];
};

export type ProductWithThumbnail = Product & {
  category: Category;
  images: ProductImage[];
  _count?: {
    images: number;
  };
};

export type CategoryWithCount = Category & {
  _count: {
    products: number;
  };
};

export type CategoryWithProducts = Category & {
  products: (Product & {
    images: ProductImage[];
  })[];
};
