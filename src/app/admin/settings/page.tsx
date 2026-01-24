"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { SettingsSkeleton } from "~/components/ui/Skeleton";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const utils = api.useUtils();
  const { data: settings, isLoading } = api.settings.get.useQuery();

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName ?? "");
      setTagline(settings.tagline ?? "");
      setWhatsapp(settings.whatsapp ?? "");
      setInstagram(settings.instagram ?? "");
      setFacebook(settings.facebook ?? "");
      setAboutText(settings.aboutText ?? "");
      setHeroTitle(settings.heroTitle ?? "");
      setHeroSubtitle(settings.heroSubtitle ?? "");
    }
  }, [settings]);

  const updateSettings = api.settings.update.useMutation({
    onSuccess: () => {
      void utils.settings.get.invalidate();
      toast.success("Settings saved successfully");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings.mutate({
      siteName: siteName.trim() || undefined,
      tagline: tagline.trim() || undefined,
      whatsapp: whatsapp.trim() || undefined,
      instagram: instagram.trim() || undefined,
      facebook: facebook.trim() || undefined,
      aboutText: aboutText.trim() || undefined,
      heroTitle: heroTitle.trim() || undefined,
      heroSubtitle: heroSubtitle.trim() || undefined,
    });
  };

  const handleReset = () => {
    if (settings) {
      setSiteName(settings.siteName ?? "");
      setTagline(settings.tagline ?? "");
      setWhatsapp(settings.whatsapp ?? "");
      setInstagram(settings.instagram ?? "");
      setFacebook(settings.facebook ?? "");
      setAboutText(settings.aboutText ?? "");
      setHeroTitle(settings.heroTitle ?? "");
      setHeroSubtitle(settings.heroSubtitle ?? "");
      toast.success("Changes reverted");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">
            Site Settings
          </h1>
          <p className="text-charcoal-500">Configure your website settings</p>
        </div>
        <div className="bg-white rounded-xl border border-cream-300 p-6">
          <SettingsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal">
          Site Settings
        </h1>
        <p className="text-charcoal-500">Configure your website settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Settings */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal border-b border-cream-200 pb-2">
            Brand Settings
          </h2>

          <Input
            label="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Ahmad Rafay Handwork"
          />

          <Input
            label="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Beautiful Embroidery, Honest Prices"
          />
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal border-b border-cream-200 pb-2">
            Hero Section
          </h2>

          <Input
            label="Hero Title"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="Ahmad Rafay Handwork"
          />

          <Input
            label="Hero Subtitle"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="Traditional hand-embroidered shirts & trousers..."
          />
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal border-b border-cream-200 pb-2">
            Contact Information
          </h2>

          <Input
            label="WhatsApp Number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="03199119572"
            helperText="Pakistani format without country code"
          />

          <Input
            label="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@ahmadrafayhandwork"
          />

          <Input
            label="Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Ahmad Rafay Handwork"
          />
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl border border-cream-300 p-6 space-y-4">
          <h2 className="font-semibold text-charcoal border-b border-cream-200 pb-2">
            About Section
          </h2>

          <Textarea
            label="About Text"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Tell your story..."
            rows={6}
            helperText="This text appears in the About section on the homepage"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Changes
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            isLoading={updateSettings.isPending}
          >
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
