import translations from "./locales";

export default {
  debug: process.env.NODE_ENV !== "production",
  supportedLngs: ["en"],
  fallbackLng: "en",
  resources: translations,
};
