"use client";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import { format } from "date-fns";
import { useEventForm } from "@/hooks/useEventForm";
import ImageUpload from "./form/ImageUpload";
import FormInput from "./form/FormInput";
import FormTextarea from "./form/FormTextarea";
import FormSelect from "./form/FormSelect";
import TagInput from "./form/TagInput";
import AgendaInput from "./form/AgendaInput";

interface EventFormProps {
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
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
}

const modeOptions = [
  { value: "offline", label: "Offline" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

export default function EventForm({
  initialData,
  onSubmit,
  submitLabel,
  isSubmitting,
}: EventFormProps) {
  const {
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
  } = useEventForm({ initialData });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData(e.currentTarget);
    formDataToSend.set("tags", JSON.stringify(tags));
    formDataToSend.set("agenda", JSON.stringify(agenda));

    if (eventDateTime) {
      formDataToSend.set("date", format(eventDateTime, "yyyy-MM-dd"));
      formDataToSend.set("time", format(eventDateTime, "HH:mm"));
    }

    formDataToSend.set("location", location);

    await onSubmit(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <ImageUpload
        preview={imagePreview}
        onChange={handleImageChange}
        required={!initialData}
      />

      <div className="form-row">
        <FormInput
          label="Event Title *"
          id="title"
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          minLength={3}
          maxLength={200}
        />
        <FormInput
          label="Organizer *"
          id="organizer"
          name="organizer"
          placeholder="Event organizer name"
          value={formData.organizer}
          onChange={(e) =>
            setFormData({ ...formData, organizer: e.target.value })
          }
          required
        />
      </div>

      <div className="form-row">
        <FormTextarea
          label="Description *"
          id="description"
          name="description"
          placeholder="Describe your event"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          minLength={10}
        />
        <FormTextarea
          label="Overview *"
          id="overview"
          name="overview"
          placeholder="Brief overview of the event"
          value={formData.overview}
          onChange={(e) =>
            setFormData({ ...formData, overview: e.target.value })
          }
          required
          minLength={10}
        />
      </div>

      <div className="form-row">
        <FormInput
          label="Venue *"
          id="venue"
          name="venue"
          placeholder="Ex: Tech Hub"
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          required
        />
        <FormInput
          label="Location *"
          id="location"
          name="location"
          placeholder="Ex: Hyderabad"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Date & Time *</label>
        <DateTimePicker date={eventDateTime} setDate={setEventDateTime} />
      </div>

      <div className="form-row">
        <FormSelect
          label="Mode *"
          id="mode"
          name="mode"
          value={formData.mode}
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          options={modeOptions}
          required
        />
        <FormInput
          label="Audience *"
          id="audience"
          name="audience"
          placeholder="Ex: Developers, Students"
          value={formData.audience}
          onChange={(e) =>
            setFormData({ ...formData, audience: e.target.value })
          }
          required
        />
      </div>

      <TagInput
        label="Tags *"
        tags={tags}
        tagInput={tagInput}
        onTagInputChange={setTagInput}
        onAddTag={addTag}
        onRemoveTag={removeTag}
        placeholder="Ex: AI | ML | Web3 | BlockChain"
      />

      <AgendaInput
        agenda={agenda}
        agendaInput={agendaInput}
        onAgendaInputChange={setAgendaInput}
        onAddAgenda={addAgendaItem}
        onRemoveAgenda={removeAgendaItem}
      />

      <button
        type="submit"
        disabled={
          isSubmitting ||
          tags.length === 0 ||
          agenda.length === 0 ||
          !eventDateTime ||
          !location
        }
        className="submit-btn"
      >
        {isSubmitting ? `${submitLabel}...` : submitLabel}
      </button>
    </form>
  );
}
