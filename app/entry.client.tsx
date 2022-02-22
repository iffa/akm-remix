import i18next from "i18next";
import { hydrate } from "react-dom";
import { initReactI18next } from "react-i18next";
import { RemixBrowser } from "remix";
import i18nOptions from "./i18n-options";

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init(i18nOptions)
    .then(() => {
      return hydrate(<RemixBrowser />, document);
    });
}
