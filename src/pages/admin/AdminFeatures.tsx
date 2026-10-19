import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { createEntity, deleteEntity, reorderEntities, updateEntity } from "@/lib/content/api";
import type { Feature } from "@/lib/content/types";
import { FEATURE_ICON_NAMES, FEATURE_ICONS, resolveFeatureIcon } from "@/lib/icons";
import { useFeatures, useInvalidateContent } from "@/hooks/useContent";

function emptyFeature(): Feature {
  return { id: "", order: 0, published: true, title: "", description: "", icon: "sparkles" };
}

export function AdminFeatures() {
  const { data: features } = useFeatures();
  const invalidate = useInvalidateContent();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Feature>(emptyFeature);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      if (form.id) {
        await updateEntity("features", form.id, form);
      } else {
        await createEntity("features", { ...form, order: features.length });
      }
      invalidate();
      toast.success("Feature saved");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Could not save feature");
    } finally {
      setSaving(false);
    }
  }

  async function remove(feature: Feature) {
    await deleteEntity("features", feature.id);
    invalidate();
    toast.success("Feature deleted");
  }

  async function togglePublished(feature: Feature) {
    await updateEntity("features", feature.id, { published: !feature.published });
    invalidate();
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= features.length) return;
    const ids = features.map((f) => f.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    await reorderEntities("features", ids);
    invalidate();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Features (Why Me)</h1>
          <p className="text-sm text-muted-foreground">
            The value cards shown in "Built to deliver value".
          </p>
        </div>
        <Button
          onClick={() => {
            setForm(emptyFeature());
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New feature
        </Button>
      </div>

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Order</TableHead>
              <TableHead className="w-16">Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-24">Published</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => {
              const Icon = resolveFeatureIcon(feature.icon);
              return (
                <TableRow key={feature.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label="Move up"
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === features.length - 1}
                        aria-label="Move down"
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Icon className="h-4 w-4 text-primary" />
                  </TableCell>
                  <TableCell className="font-medium">{feature.title}</TableCell>
                  <TableCell>
                    <Switch
                      checked={feature.published !== false}
                      onCheckedChange={() => togglePublished(feature)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => {
                          setForm({ ...feature });
                          setOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <ConfirmDeleteButton
                        onConfirm={() => remove(feature)}
                        title="Delete feature?"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {features.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No features yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit feature" : "New feature"}</DialogTitle>
            <DialogDescription>Shown as a card in the Why Work With Me section.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={form.icon} onValueChange={(icon) => setForm({ ...form, icon })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FEATURE_ICON_NAMES.map((name) => {
                    const Icon = FEATURE_ICONS[name];
                    return (
                      <SelectItem key={name} value={name}>
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {name}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-3 text-sm">
              <Switch
                checked={form.published !== false}
                onCheckedChange={(checked) => setForm({ ...form, published: checked })}
              />
              Published on the site
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save feature"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
