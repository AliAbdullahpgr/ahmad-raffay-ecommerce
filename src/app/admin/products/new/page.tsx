"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Select } from "~/components/ui/Select";
import { ImageUploader } from "~/components/ui/ImageUploader";
import { slugify } from "~/lib/utils";

interface ImageData {
  url: string;
  key?: string;
  alt?: string;
  order: number;
}

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featured, setFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [images, setImages] = useState<ImageData[]>([]);

  const { data: categories } = api.category.getAll.useQuery();

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      toast.success("Product created successfully");
      router.push("/admin/products");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
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

    createProduct.mutate({
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim() || undefined,
      price: Number(price),
      categoryId,
      featured,
      inStock,
      images: images.length > 0 ? images : undefined,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-cream-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">
            Add New Product
          </h1>
          <p className="text-charcoal-500">Create a new product listing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal">Basic Information</h2>

          <Input
            label="Product Name *"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
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
          <ImageUploader
            images={images}
            onImagesChange={setImages}
            maxImages={10}
            endpoint="productImage"
          />
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
            isLoading={createProduct.isPending}
          >
            Create Product
          </Button>
        </div>
      </form>
    </div>
  );
}
