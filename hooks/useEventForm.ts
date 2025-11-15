import { useState } from "react";
import { toast } from "sonner";
import {
  tagSchema,
  agendaItemSchema,
} from "@/lib/validations/event.validation";

interface UseEventFormProps {
  initialData?: {
    title?: string;
    description?: string;
    overview?: string;
    venue?: string;
    location?: string;
    mode?: string;
    audience?: string;
    organizer?: string;
    image?: string;
    tags?: string[];
    agenda?: string[];
    eventDateTime?: Date;
  };
}

export const useEventForm = ({ initialData }: UseEventFormProps = {}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [agenda, setAgenda] = useState<string[]>(initialData?.agenda || []);
  const [agendaInput, setAgendaInput] = useState("");
  const [eventDateTime, setEventDateTime] = useState<Date | undefined>(
    initialData?.eventDateTime
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    overview: initialData?.overview || "",
    venue: initialData?.venue || "",
    mode: initialData?.mode || "",
    audience: initialData?.audience || "",
    organizer: initialData?.organizer || "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) {
      toast.error("Empty Tag", { description: "Tag cannot be empty" });
      return;
    }

    const validation = tagSchema.safeParse(trimmedTag);
    if (!validation.success) {
      toast.error("Invalid Tag", {
        description: validation.error.issues[0].message,
      });
      return;
    }

    if (tags.includes(trimmedTag)) {
      toast.error("Duplicate Tag", {
        description: "This tag has already been added",
      });
      return;
    }

    if (tags.length >= 10) {
      toast.error("Too Many Tags", {
        description: "You can add a maximum of 10 tags",
      });
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addAgendaItem = () => {
    const trimmedItem = agendaInput.trim();

    if (!trimmedItem) {
      toast.error("Empty Agenda Item", {
        description: "Agenda item cannot be empty",
      });
      return;
    }

    const validation = agendaItemSchema.safeParse(trimmedItem);
    if (!validation.success) {
      toast.error("Invalid Agenda Item", {
        description: validation.error.issues[0].message,
      });
      return;
    }

    if (agenda.length >= 20) {
      toast.error("Too Many Agenda Items", {
        description: "You can add a maximum of 20 agenda items",
      });
      return;
    }

    setAgenda([...agenda, trimmedItem]);
    setAgendaInput("");
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  return {
    imagePreview,
    tags,
    tagInput,
    setTagInput,
    agenda,
    agendaInput,
    setAgendaInput,
    eventDateTime,
    setEventDateTime,
    location,
    setLocation,
    formData,
    setFormData,
    handleImageChange,
    addTag,
    removeTag,
    addAgendaItem,
    removeAgendaItem,
  };
};
