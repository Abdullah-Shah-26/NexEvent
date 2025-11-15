import { Upload } from "lucide-react";

interface ImageUploadProps {
  preview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function ImageUpload({
  preview,
  onChange,
  required = false,
}: ImageUploadProps) {
  return (
    <div className="form-group">
      <label htmlFor="image">Event Image *</label>
      <div className="image-upload-area">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={onChange}
          required={required}
          className="hidden"
        />
        <label htmlFor="image" className="image-upload-label">
          {preview ? (
            <img src={preview} alt="Preview" className="image-preview" />
          ) : (
            <div className="upload-placeholder flex flex-col items-center justify-center text-center">
              <Upload size={48} />
              <p>Upload a venue image or photos from past editions</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
