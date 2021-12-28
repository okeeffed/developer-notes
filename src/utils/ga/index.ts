// log the pageview with their URL
export const pageview = (url: string) => {
  // @ts-expect-error: TODO add gtag to window type
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }) => {
  // @ts-expect-error: TODO add gtag to window type
  window.gtag("event", action, params);
};
