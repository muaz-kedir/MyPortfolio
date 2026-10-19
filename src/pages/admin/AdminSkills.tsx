import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ListField } from "@/components/admin/ListField";
import { createEntity, deleteEntity, updateEntity } from "@/lib/content/api";
import type { SkillBar, SkillGroup } from "@/lib/content/types";
import { useInvalidateContent, useSkillBars, useSkillGroups } from "@/hooks/useContent";

function emptyGroup(): SkillGroup {
  return { id: "", order: 0, title: "", items: [] };
}

function emptyBar(): SkillBar {
  return { id: "", order: 0, label: "", value: 80 };
}

export function AdminSkills() {
  const { data: groups } = useSkillGroups();
  const { data: bars } = useSkillBars();
  const invalidate = useInvalidateContent();

  const [groupOpen, setGroupOpen] = useState(false);
  const [groupForm, setGroupForm] = useState<SkillGroup>(emptyGroup);
  const [barOpen, setBarOpen] = useState(false);
  const [barForm, setBarForm] = useState<SkillBar>(emptyBar);
  const [saving, setSaving] = useState(false);

  async function saveGroup() {
    if (!groupForm.title.trim()) {
      toast.error("Group title is required");
      return;
    }
    setSaving(true);
    try {
      if (groupForm.id) {
        await updateEntity("skillGroups", groupForm.id, groupForm);
      } else {
        await createEntity("skillGroups", { ...groupForm, order: groups.length });
      }
      invalidate();
      toast.success("Skill group saved");
      setGroupOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function saveBar() {
    if (!barForm.label.trim()) {
      toast.error("Label is required");
      return;
    }
    setSaving(true);
    try {
      if (barForm.id) {
        await updateEntity("skillBars", barForm.id, barForm);
      } else {
        await createEntity("skillBars", { ...barForm, order: bars.length });
      }
      invalidate();
      toast.success("Skill saved");
      setBarOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Skills / Tech Stack</h1>
        <p className="text-sm text-muted-foreground">
          Manage skill groups and the proficiency bars.
        </p>
      </div>

      <Tabs defaultValue="groups">
        <TabsList>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="bars">Proficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setGroupForm(emptyGroup());
                setGroupOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              New group
            </Button>
          </div>
          <div className="rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {group.items.join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => {
                            setGroupForm({ ...group });
                            setGroupOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <ConfirmDeleteButton
                          title="Delete group?"
                          onConfirm={async () => {
                            await deleteEntity("skillGroups", group.id);
                            invalidate();
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="bars" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setBarForm(emptyBar());
                setBarOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              New skill
            </Button>
          </div>
          <div className="rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead className="w-24">Value</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bars.map((bar) => (
                  <TableRow key={bar.id}>
                    <TableCell className="font-medium">{bar.label}</TableCell>
                    <TableCell>{bar.value}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => {
                            setBarForm({ ...bar });
                            setBarOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <ConfirmDeleteButton
                          title="Delete skill?"
                          onConfirm={async () => {
                            await deleteEntity("skillBars", bar.id);
                            invalidate();
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={groupOpen} onOpenChange={setGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{groupForm.id ? "Edit group" : "New group"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={groupForm.title}
                onChange={(e) => setGroupForm({ ...groupForm, title: e.target.value })}
              />
            </div>
            <ListField
              label="Items"
              values={groupForm.items}
              placeholder="Add a technology"
              onChange={(items) => setGroupForm({ ...groupForm, items })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveGroup} disabled={saving}>
              {saving ? "Saving…" : "Save group"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={barOpen} onOpenChange={setBarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{barForm.id ? "Edit skill" : "New skill"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Input
                value={barForm.label}
                onChange={(e) => setBarForm({ ...barForm, label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Value (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={barForm.value}
                onChange={(e) =>
                  setBarForm({
                    ...barForm,
                    value: Math.min(100, Math.max(0, Number(e.target.value))),
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBarOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveBar} disabled={saving}>
              {saving ? "Saving…" : "Save skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
