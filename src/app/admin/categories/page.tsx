"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Modal } from "~/components/ui/Modal";
import { Skeleton } from "~/components/ui/Skeleton";
import { slugify } from "~/lib/utils";

export default function AdminCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const utils = api.useUtils();
  const { data: categories, isLoading } = api.category.getAll.useQuery();

  const createCategory = api.category.create.useMutation({
    onSuccess: () => {
      void utils.category.getAll.invalidate();
      resetForm();
      toast.success("Category created");
    },
    onError: (error) => toast.error(error.message || "Failed to create category"),
  });

  const updateCategory = api.category.update.useMutation({
    onSuccess: () => {
      void utils.category.getAll.invalidate();
      resetForm();
      toast.success("Category updated");
    },
    onError: (error) => toast.error(error.message || "Failed to update category"),
  });

  const deleteCategory = api.category.delete.useMutation({
    onSuccess: () => {
      void utils.category.getAll.invalidate();
      setDeleteId(null);
      toast.success("Category deleted");
    },
    onError: (error) => toast.error(error.message || "Cannot delete category with products"),
  });

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
  };

  const openEditModal = (category: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    image?: string | null;
  }) => {
    setEditingId(category.id ?? null);
    setName(category.name ?? "");
    setSlug(category.slug ?? "");
    setDescription(category.description ?? "");
    setImage(category.image ?? "");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const data = {
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
    };

    if (editingId) {
      updateCategory.mutate({ id: editingId, ...data });
    } else {
      createCategory.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
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
          <h1 className="text-2xl font-serif font-bold text-charcoal">
            Categories
          </h1>
          <p className="text-charcoal-500">Manage product categories</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-cream-300 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <FolderTree className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">
                      {category.name}
                    </h3>
                    <p className="text-sm text-charcoal-500">
                      {category._count.products} products
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 rounded-lg text-charcoal-500 hover:bg-cream-200 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(category.id)}
                    className="p-2 rounded-lg text-terracotta hover:bg-terracotta/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {category.description && (
                <p className="mt-3 text-sm text-charcoal-500 line-clamp-2">
                  {category.description}
                </p>
              )}
              <p className="mt-2 text-xs text-charcoal-400">/{category.slug}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-cream-300 p-12 text-center">
          <FolderTree className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-500 mb-4">No categories yet</p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-5 w-5" />
            Create First Category
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingId ? "Edit Category" : "Add Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!editingId) setSlug(slugify(e.target.value));
            }}
            placeholder="e.g., Shirts"
          />

          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated"
            helperText="URL-friendly version of the name"
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description..."
          />

          <Input
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            helperText="Category cover image"
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={resetForm}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              isLoading={createCategory.isPending || updateCategory.isPending}
            >
              {editingId ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Category"
        size="sm"
      >
        <p className="text-charcoal-600 mb-6">
          Are you sure you want to delete this category? You can only delete
          categories that have no products.
        </p>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setDeleteId(null)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteId && deleteCategory.mutate({ id: deleteId })}
            isLoading={deleteCategory.isPending}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
