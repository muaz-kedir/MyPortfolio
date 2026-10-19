import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ListField } from "@/components/admin/ListField";
import { createEntity, deleteEntity, reorderEntities, updateEntity } from "@/lib/content/api";
import type { Project } from "@/lib/content/types";
import { useInvalidateContent, useProjects } from "@/hooks/useContent";

function emptyProject(): Project {
  return {
    id: "",
    order: 0,
    published: true,
    name: "",
    description: "",
    features: [],
    tech: [],
    accentFrom: "#fdd506",
    accentTo: "#e07a1f",
    imageUrl: "",
    imagePublicId: "",
    liveUrl: "",
    repoUrl: "",
  };
}

export function AdminProjects() {
  const { data: projects } = useProjects();
  const invalidate = useInvalidateContent();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Project>(emptyProject);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setForm(emptyProject());
    setOpen(true);
  }

  function openEdit(project: Project) {
    setForm({ ...project });
    setOpen(true);
  }

  async function save() {
    if (!form.name.trim()) {
      toast.error("Project name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (form.id) {
        await updateEntity("projects", form.id, payload);
      } else {
        await createEntity("projects", { ...payload, order: projects.length });
      }
      invalidate();
      toast.success("Project saved");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Could not save project");
    } finally {
      setSaving(false);
    }
  }

  async function remove(project: Project) {
    try {
      await deleteEntity("projects", project.id);
      invalidate();
      toast.success("Project deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete project");
    }
  }

  async function togglePublished(project: Project) {
    try {
      await updateEntity("projects", project.id, { published: !project.published });
      invalidate();
    } catch (error) {
      console.error(error);
      toast.error("Could not update project");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const ids = projects.map((p) => p.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    try {
      await reorderEntities("projects", ids);
      invalidate();
    } catch (error) {
      console.error(error);
      toast.error("Could not reorder projects");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Add, edit, reorder and publish projects.</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Tech</TableHead>
              <TableHead className="w-24">Published</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === 0}
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === projects.length - 1}
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {project.tech.join(", ")}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={project.published !== false}
                    onCheckedChange={() => togglePublished(project)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      onClick={() => openEdit(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteButton
                      onConfirm={() => remove(project)}
                      title="Delete project?"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No projects yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit project" : "New project"}</DialogTitle>
            <DialogDescription>Fields marked with * are required.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <ListField
              label="Key features"
              values={form.features}
              placeholder="Add a feature"
              onChange={(features) => setForm({ ...form, features })}
            />
            <ListField
              label="Technologies"
              values={form.tech}
              placeholder="Add a technology"
              onChange={(tech) => setForm({ ...form, tech })}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Accent from</Label>
                <Input
                  type="color"
                  value={form.accentFrom || "#fdd506"}
                  onChange={(e) => setForm({ ...form, accentFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Accent to</Label>
                <Input
                  type="color"
                  value={form.accentTo || "#e07a1f"}
                  onChange={(e) => setForm({ ...form, accentTo: e.target.value })}
                />
              </div>
            </div>
            <ImageUploader
              url={form.imageUrl}
              folder="portfolio/projects"
              onChange={(image) =>
                setForm({
                  ...form,
                  imageUrl: image?.url ?? "",
                  imagePublicId: image?.publicId ?? "",
                })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  value={form.liveUrl ?? ""}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Repo URL</Label>
                <Input
                  value={form.repoUrl ?? ""}
                  onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                />
              </div>
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
              {saving ? "Saving…" : "Save project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
