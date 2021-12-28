import type { AmplitudeClient } from "amplitude-js";

const getInstance = async (): Promise<AmplitudeClient> => {
  if (
    typeof window === "undefined" ||
    process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY === undefined
  ) {
    throw new Error(`Issue initialising Amplitude`);
  }

  const amplitude = (await import("amplitude-js")).default;
  const client: AmplitudeClient = amplitude.getInstance();
  client.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);

  return client;
};

export const logEvent = async <T = any>(event: string, eventData?: T) => {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const amplitude = await getInstance();
  amplitude.logEvent(event, eventData);
};
