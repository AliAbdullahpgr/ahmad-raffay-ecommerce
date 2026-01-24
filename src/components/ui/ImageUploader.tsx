"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { useUploadThing } from "~/lib/uploadthing-client";
import { Button } from "./Button";
import { Input } from "./Input";
import { cn } from "~/lib/utils";
import toast from "react-hot-toast";

interface UploadedImage {
  url: string;
  key?: string;
  alt?: string;
  order: number;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  endpoint?: "productImage" | "categoryImage";
  showUrlInput?: boolean;
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
  endpoint = "productImage",
  showUrlInput = true,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res) {
        const newImages = res.map((file, index) => ({
          url: file.ufsUrl,
          key: file.key,
          order: images.length + index,
        }));
        onImagesChange([...images, ...newImages]);
        toast.success(`${res.length} image(s) uploaded successfully`);
      }
    },
    onUploadError: (error) => {
      toast.error(error.message || "Upload failed");
    },
  });

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    await startUpload(filesToUpload);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addImageByUrl = () => {
    if (!imageUrl.trim()) return;

    try {
      new URL(imageUrl);
      onImagesChange([...images, { url: imageUrl, order: images.length }]);
      setImageUrl("");
      toast.success("Image added");
    } catch {
      toast.error("Please enter a valid URL");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    onImagesChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
                multiple={maxImages > 1}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>
      )}

      {/* URL Input */}
      {showUrlInput && canAddMore && (
        <div className="flex gap-2">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImageByUrl();
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
              addImageByUrl();
            }}
          >
            Add URL
          </Button>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.key || index}
              className="relative aspect-square rounded-lg overflow-hidden bg-cream-200 group"
            >
              <Image
                src={image.url}
                alt={image.alt ?? `Image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
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
        <div className="border-2 border-dashed border-cream-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-10 w-10 text-charcoal-300 mx-auto mb-2" />
          <p className="text-charcoal-500">No images added yet</p>
          <p className="text-sm text-charcoal-400">
            Upload or add images using URL
          </p>
        </div>
      )}

      {/* Image count */}
      <p className="text-sm text-charcoal-400 text-right">
        {images.length} / {maxImages} images
      </p>
    </div>
  );
}
