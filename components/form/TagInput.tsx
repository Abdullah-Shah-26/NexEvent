"use client";

import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  placeholder,
}: TagInputProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="tag-input-wrapper">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddTag();
            }
          }}
          placeholder={placeholder}
        />
        <button type="button" onClick={onAddTag} className="add-btn">
          Add
        </button>
      </div>
      <div className="tags-list">
        {tags.map((tag) => (
          <span key={tag} className="tag-item">
            {tag}
            <X size={14} onClick={() => onRemoveTag(tag)} />
          </span>
        ))}
      </div>
    </div>
  );
}
