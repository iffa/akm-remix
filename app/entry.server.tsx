import { renderToString } from "react-dom/server";
import { type EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import i18nOptions from "./i18n-options";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // Only initialize i18next once
  if (!i18next.isInitialized) {
    await i18next.use(initReactI18next).init(i18nOptions);
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
