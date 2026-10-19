import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
import { createEntity, deleteEntity, updateEntity } from "@/lib/content/api";
import type { Testimonial } from "@/lib/content/types";
import { useInvalidateContent, useTestimonials } from "@/hooks/useContent";

function emptyTestimonial(): Testimonial {
  return { id: "", order: 0, published: true, quote: "", author: "", role: "" };
}

export function AdminTestimonials() {
  const { data: testimonials } = useTestimonials();
  const invalidate = useInvalidateContent();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Testimonial>(emptyTestimonial);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.quote.trim() || !form.author.trim()) {
      toast.error("Quote and author are required");
      return;
    }
    setSaving(true);
    try {
      if (form.id) {
        await updateEntity("testimonials", form.id, form);
      } else {
        await createEntity("testimonials", { ...form, order: testimonials.length });
      }
      invalidate();
      toast.success("Testimonial saved");
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">Client quotes shown on the site.</p>
        </div>
        <Button
          onClick={() => {
            setForm(emptyTestimonial());
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New testimonial
        </Button>
      </div>

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quote</TableHead>
              <TableHead className="w-40">Author</TableHead>
              <TableHead className="w-24">Published</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="max-w-md truncate">{t.quote}</TableCell>
                <TableCell>{t.author}</TableCell>
                <TableCell>
                  <Switch
                    checked={t.published !== false}
                    onCheckedChange={async () => {
                      await updateEntity("testimonials", t.id, { published: !t.published });
                      invalidate();
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      onClick={() => {
                        setForm({ ...t });
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteButton
                      title="Delete testimonial?"
                      onConfirm={async () => {
                        await deleteEntity("testimonials", t.id);
                        invalidate();
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  No testimonials yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit testimonial" : "New testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Quote *</Label>
              <Textarea
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author *</Label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role / company</Label>
                <Input
                  value={form.role ?? ""}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
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
              {saving ? "Saving…" : "Save testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
