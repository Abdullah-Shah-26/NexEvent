import { eventSchema } from "./event.validation";
import { NextResponse } from "next/server";

export const validateEventFormData = (formData: FormData) => {
  try {
    const data = {
      title: formData.get("title") as string,
      organizer: formData.get("organizer") as string,
      description: formData.get("description") as string,
      overview: formData.get("overview") as string,
      venue: formData.get("venue") as string,
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      mode: formData.get("mode") as string,
      audience: formData.get("audience") as string,
      tags: JSON.parse(formData.get("tags") as string),
      agenda: JSON.parse(formData.get("agenda") as string),
    };

    console.log("Validating data:", data);

    const result = eventSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0];
      console.error("Validation error:", firstError);
      return {
        success: false,
        error: NextResponse.json(
          {
            message: "Validation Error",
            error: firstError.message,
            field: firstError.path.join("."),
          },
          { status: 400 }
        ),
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Form data parsing error:", error);
    return {
      success: false,
      error: NextResponse.json(
        { message: "Invalid form data format", error: String(error) },
        { status: 400 }
      ),
    };
  }
};
