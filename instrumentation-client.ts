import posthog from "posthog-js";

export function register() {
  if (typeof window !== "undefined") {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    if (posthogKey && !posthog.__loaded) {
      posthog.init(posthogKey, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log("PostHog initialized");
          }
        },
      });
    }
  }
}
