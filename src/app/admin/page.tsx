"use client";

import { Package, Shirt, PanelBottom, Star, PackageX } from "lucide-react";
import { api } from "~/trpc/react";
import { StatsCard } from "~/components/admin/StatsCard";
import { Skeleton } from "~/components/ui/Skeleton";

export default function AdminDashboard() {
  const { data: stats, isLoading } = api.product.getStats.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Dashboard</h1>
          <p className="text-charcoal-500">Welcome back to your admin panel</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal">Dashboard</h1>
        <p className="text-charcoal-500">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Products"
          value={stats?.total ?? 0}
          icon={<Package className="h-6 w-6" />}
        />
        <StatsCard
          title="Shirts"
          value={stats?.shirts ?? 0}
          icon={<Shirt className="h-6 w-6" />}
        />
        <StatsCard
          title="Trousers"
          value={stats?.trousers ?? 0}
          icon={<PanelBottom className="h-6 w-6" />}
        />
        <StatsCard
          title="Featured"
          value={stats?.featured ?? 0}
          icon={<Star className="h-6 w-6" />}
        />
        <StatsCard
          title="Out of Stock"
          value={stats?.outOfStock ?? 0}
          icon={<PackageX className="h-6 w-6" />}
          className={stats?.outOfStock && stats.outOfStock > 0 ? "border-terracotta" : ""}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-cream-300 p-6">
        <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/products/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-300 hover:bg-cream-100 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-charcoal">Add Product</p>
              <p className="text-sm text-charcoal-500">Create new product</p>
            </div>
          </a>
          <a
            href="/admin/products"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-300 hover:bg-cream-100 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-charcoal">Manage Products</p>
              <p className="text-sm text-charcoal-500">Edit or delete products</p>
            </div>
          </a>
          <a
            href="/admin/categories"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-300 hover:bg-cream-100 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-charcoal">Categories</p>
              <p className="text-sm text-charcoal-500">Manage categories</p>
            </div>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 p-4 rounded-lg border border-cream-300 hover:bg-cream-100 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal/10 text-charcoal">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-charcoal">Site Settings</p>
              <p className="text-sm text-charcoal-500">Update contact info</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
