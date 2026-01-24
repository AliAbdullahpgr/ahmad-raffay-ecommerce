"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Package, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { Skeleton } from "~/components/ui/Skeleton";
import { formatPrice, cn } from "~/lib/utils";

export default function AdminProductsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const utils = api.useUtils();
  const { data: products, isLoading } = api.product.adminGetAll.useQuery();

  const toggleFeatured = api.product.toggleFeatured.useMutation({
    onSuccess: () => {
      void utils.product.adminGetAll.invalidate();
      toast.success("Product updated");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const toggleStock = api.product.toggleStock.useMutation({
    onSuccess: () => {
      void utils.product.adminGetAll.invalidate();
      toast.success("Product updated");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      void utils.product.adminGetAll.invalidate();
      setDeleteId(null);
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="bg-white rounded-xl border border-cream-300 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-cream-200">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Products</h1>
          <p className="text-charcoal-500">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus className="h-5 w-5" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-cream-300 overflow-hidden">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-100 border-b border-cream-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-charcoal">
                    Price
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-charcoal">
                    Featured
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-charcoal">
                    In Stock
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-charcoal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Package className="h-6 w-6 text-charcoal-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{product.name}</p>
                          <p className="text-xs text-charcoal-500">
                            {product._count.images} images
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald/10 text-emerald">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-charcoal">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured.mutate({ id: product.id })}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          product.featured
                            ? "bg-gold/20 text-gold-600"
                            : "bg-charcoal-100 text-charcoal-400 hover:bg-gold/10"
                        )}
                        disabled={toggleFeatured.isPending}
                      >
                        <Star
                          className="h-5 w-5"
                          fill={product.featured ? "currentColor" : "none"}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStock.mutate({ id: product.id })}
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          product.inStock
                            ? "bg-emerald/20 text-emerald"
                            : "bg-terracotta/20 text-terracotta"
                        )}
                        disabled={toggleStock.isPending}
                      >
                        {product.inStock ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <button className="p-2 rounded-lg text-charcoal-500 hover:bg-cream-200 transition-colors">
                            <Pencil className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="p-2 rounded-lg text-terracotta hover:bg-terracotta/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-500 mb-4">No products yet</p>
            <Link href="/admin/products/new">
              <Button variant="primary">
                <Plus className="h-5 w-5" />
                Add Your First Product
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Product"
        size="sm"
      >
        <p className="text-charcoal-600 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteId && deleteProduct.mutate({ id: deleteId })}
            isLoading={deleteProduct.isPending}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
