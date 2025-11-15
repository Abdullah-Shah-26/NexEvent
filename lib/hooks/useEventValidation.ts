import { toast } from "sonner";
import {
  eventSchema,
  tagSchema,
  agendaItemSchema,
} from "../validations/event.validation";

export const useEventValidation = () => {
  const validateTag = (tag: string): boolean => {
    const result = tagSchema.safeParse(tag);
    if (!result.success) {
      toast.error("Invalid Tag", {
        description: result.error.issues[0].message,
      });
      return false;
    }
    return true;
  };

  const validateAgendaItem = (item: string): boolean => {
    const result = agendaItemSchema.safeParse(item);
    if (!result.success) {
      toast.error("Invalid Agenda Item", {
        description: result.error.issues[0].message,
      });
      return false;
    }
    return true;
  };

  const validateEventData = (data: any): boolean => {
    const result = eventSchema.safeParse(data);
    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error("Validation Error", {
        description: firstError.message,
      });
      return false;
    }
    return true;
  };

  return {
    validateTag,
    validateAgendaItem,
    validateEventData,
  };
};
