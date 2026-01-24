"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Select } from "~/components/ui/Select";
import { Modal } from "~/components/ui/Modal";
import { Skeleton } from "~/components/ui/Skeleton";
import { slugify, cn } from "~/lib/utils";
import { useUploadThing } from "~/lib/uploadthing-client";
import { X } from "lucide-react";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const utils = api.useUtils();
  const { data: product, isLoading } = api.product.getById.useQuery({ id });
  const { data: categories } = api.category.getAll.useQuery();

  const { startUpload, isUploading } = useUploadThing("productImage", {
    onClientUploadComplete: (res) => {
      if (res) {
        res.forEach((file, index) => {
          addImage.mutate({
            productId: id,
            url: file.ufsUrl,
            key: file.key,
            order: (product?.images.length ?? 0) + index,
          });
        });
      }
    },
    onUploadError: (error) => {
      toast.error(error.message || "Upload failed");
    },
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSlug(product.slug);
      setDescription(product.description ?? "");
      setPrice(product.price.toString());
      setCategoryId(product.categoryId);
      setFeatured(product.featured);
      setInStock(product.inStock);
    }
  }, [product]);

  const updateProduct = api.product.update.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully");
      void utils.product.getById.invalidate({ id });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const addImage = api.product.addImage.useMutation({
    onSuccess: () => {
      setImageUrl("");
      void utils.product.getById.invalidate({ id });
      toast.success("Image added");
    },
    onError: () => toast.error("Failed to add image"),
  });

  const deleteImage = api.product.deleteImage.useMutation({
    onSuccess: () => {
      void utils.product.getById.invalidate({ id });
      toast.success("Image removed");
    },
    onError: () => toast.error("Failed to remove image"),
  });

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted");
      router.push("/admin/products");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    await startUpload(Array.from(files));
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    try {
      new URL(imageUrl);
      addImage.mutate({
        productId: id,
        url: imageUrl,
        order: product?.images.length ?? 0,
      });
    } catch {
      toast.error("Please enter a valid URL");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    updateProduct.mutate({
      id,
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim() || undefined,
      price: Number(price),
      categoryId,
      featured,
      inStock,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-500">Product not found</p>
        <Link href="/admin/products">
          <Button variant="outline" className="mt-4">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg hover:bg-cream-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-charcoal">
              Edit Product
            </h1>
            <p className="text-charcoal-500">{product.name}</p>
          </div>
        </div>
        <Button
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal">Basic Information</h2>

          <Input
            label="Product Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Floral Embroidered Shirt"
          />

          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated-from-name"
            helperText="URL-friendly version of the name"
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the product..."
            rows={4}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price (PKR) *"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2500"
              min={0}
            />

            <Select
              label="Category *"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Select category"
              options={
                categories?.map((c) => ({ value: c.id, label: c.name })) ?? []
              }
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded border-charcoal-300 text-emerald focus:ring-emerald"
              />
              <span className="text-charcoal">Featured Product</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-5 h-5 rounded border-charcoal-300 text-emerald focus:ring-emerald"
              />
              <span className="text-charcoal">In Stock</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal">Product Images</h2>

          {/* Upload Area */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              "relative border-2 border-dashed rounded-lg p-6 transition-colors text-center",
              isDragging
                ? "border-emerald bg-emerald/5"
                : "border-cream-300 hover:border-emerald/50",
              isUploading && "pointer-events-none opacity-50"
            )}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-emerald animate-spin mb-2" />
                <p className="text-charcoal-500">Uploading...</p>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-charcoal-300 mx-auto mb-2" />
                <p className="text-charcoal-600 font-medium">
                  Drag & drop images here
                </p>
                <p className="text-sm text-charcoal-400 mt-1">
                  or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          {/* Add Image by URL */}
          <div className="flex gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
              placeholder="Or enter image URL..."
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                handleAddImage();
              }}
              isLoading={addImage.isPending}
            >
              Add URL
            </Button>
          </div>

          {/* Image Preview */}
          {product.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden bg-cream-200 group"
                >
                  <Image
                    src={image.url}
                    alt={image.alt ?? `Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => deleteImage.mutate({ id: image.id })}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    disabled={deleteImage.isPending}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs bg-emerald text-white">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-charcoal-400 text-center">
              No images yet. Upload or add using URL above.
            </p>
          )}

          {/* Image count */}
          <p className="text-sm text-charcoal-400 text-right">
            {product.images.length} / 10 images
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/admin/products" className="flex-1">
            <Button type="button" variant="ghost" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            isLoading={updateProduct.isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
        size="sm"
      >
        <p className="text-charcoal-600 mb-6">
          Are you sure you want to delete "{product.name}"? This action cannot
          be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setShowDeleteModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteProduct.mutate({ id })}
            isLoading={deleteProduct.isPending}
            className="flex-1"
          >
            Delete Product
          </Button>
        </div>
      </Modal>
    </div>
  );
}
