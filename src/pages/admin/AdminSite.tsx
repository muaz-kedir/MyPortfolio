import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListField } from "@/components/admin/ListField";
import { saveSiteContent } from "@/lib/content/api";
import type { ContactLink, SiteContent, Stat } from "@/lib/content/types";
import { useInvalidateContent, useSiteContent } from "@/hooks/useContent";

function StatsEditor({ stats, onChange }: { stats: Stat[]; onChange: (stats: Stat[]) => void }) {
  return (
    <div className="space-y-2">
      <Label>Stats</Label>
      {stats.map((stat, index) => (
        <div key={index} className="flex gap-2">
          <Input
            className="w-28"
            value={stat.value}
            placeholder="20+"
            onChange={(e) =>
              onChange(stats.map((s, i) => (i === index ? { ...s, value: e.target.value } : s)))
            }
          />
          <Input
            value={stat.label}
            placeholder="Projects Built"
            onChange={(e) =>
              onChange(stats.map((s, i) => (i === index ? { ...s, label: e.target.value } : s)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove stat"
            onClick={() => onChange(stats.filter((_, i) => i !== index))}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...stats, { value: "", label: "" }])}
      >
        <Plus className="h-4 w-4" />
        Add stat
      </Button>
    </div>
  );
}

function LinksEditor({
  links,
  onChange,
}: {
  links: ContactLink[];
  onChange: (links: ContactLink[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>Contact links</Label>
      {links.map((link, index) => (
        <div key={index} className="flex flex-col gap-2 sm:flex-row">
          <Input
            className="sm:w-32"
            value={link.label}
            placeholder="GitHub"
            onChange={(e) =>
              onChange(links.map((l, i) => (i === index ? { ...l, label: e.target.value } : l)))
            }
          />
          <Input
            value={link.value}
            placeholder="github.com/you"
            onChange={(e) =>
              onChange(links.map((l, i) => (i === index ? { ...l, value: e.target.value } : l)))
            }
          />
          <Input
            value={link.href}
            placeholder="https://github.com/you"
            onChange={(e) =>
              onChange(links.map((l, i) => (i === index ? { ...l, href: e.target.value } : l)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove link"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...links, { label: "", value: "", href: "" }])}
      >
        <Plus className="h-4 w-4" />
        Add link
      </Button>
    </div>
  );
}

export function AdminSite() {
  const { data } = useSiteContent();
  const invalidate = useInvalidateContent();
  const [form, setForm] = useState<SiteContent>(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  async function save() {
    setSaving(true);
    try {
      await saveSiteContent(form);
      invalidate();
      toast.success("Site content saved");
    } catch (error) {
      console.error(error);
      toast.error("Could not save site content");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Site Content</h1>
          <p className="text-sm text-muted-foreground">Hero, about, experience and contact copy.</p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Badge</Label>
            <Input
              value={form.hero.badge}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, badge: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.hero.name}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, name: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label>Roles / tagline</Label>
            <Input
              value={form.hero.roles}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, roles: e.target.value } })}
            />
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              rows={3}
              value={form.hero.bio}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, bio: e.target.value } })}
            />
          </div>
          <StatsEditor
            stats={form.hero.stats}
            onChange={(stats) => setForm({ ...form, hero: { ...form.hero, stats } })}
          />
        </TabsContent>

        <TabsContent value="about" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Approach</Label>
            <Textarea
              rows={4}
              value={form.about.approach}
              onChange={(e) =>
                setForm({ ...form, about: { ...form.about, approach: e.target.value } })
              }
            />
          </div>
          <ListField
            label="What I build"
            values={form.about.whatIBuild}
            placeholder="Add an item"
            onChange={(whatIBuild) => setForm({ ...form, about: { ...form.about, whatIBuild } })}
          />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Role</Label>
            <Input
              value={form.experience.role}
              onChange={(e) =>
                setForm({ ...form, experience: { ...form.experience, role: e.target.value } })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.experience.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: { ...form.experience, description: e.target.value },
                })
              }
            />
          </div>
          <ListField
            label="Responsibilities"
            values={form.experience.responsibilities}
            placeholder="Add a responsibility"
            onChange={(responsibilities) =>
              setForm({ ...form, experience: { ...form.experience, responsibilities } })
            }
          />
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={form.contact.email}
              onChange={(e) =>
                setForm({ ...form, contact: { ...form.contact, email: e.target.value } })
              }
            />
          </div>
          <LinksEditor
            links={form.contact.links}
            onChange={(links) => setForm({ ...form, contact: { ...form.contact, links } })}
          />
          <div className="space-y-2">
            <Label>Footer note</Label>
            <Input
              value={form.contact.footerNote}
              onChange={(e) =>
                setForm({ ...form, contact: { ...form.contact, footerNote: e.target.value } })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
