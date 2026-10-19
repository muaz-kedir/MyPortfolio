import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/lib/cloudinary";

type Props = {
  url?: string;
  folder?: string;
  onChange: (image: { url: string; publicId: string } | null) => void;
};

export function ImageUploader({ url, folder = "portfolio", onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadImage(file, folder);
      onChange({ url: result.url, publicId: result.publicId });
      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-24 w-32 items-center justify-center overflow-hidden rounded-lg border border-border bg-background/50">
          {url ? (
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </Button>
            {url && (
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
                <Trash2 className="h-4 w-4 text-destructive" />
                Remove
              </Button>
            )}
          </div>
          <Input
            placeholder="…or paste an image URL"
            value={url ?? ""}
            onChange={(event) =>
              onChange(event.target.value ? { url: event.target.value, publicId: "" } : null)
            }
          />
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </div>
  );
}
