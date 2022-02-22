import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { NavBar } from "./components/NavBar";

export const meta: MetaFunction = () => {
  return { title: "AKM" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "alternate icon",
      href: "/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "alternate icon",
      href: "/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "alternate icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  ];
};

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen">
        <NavBar />
        <main className="flex-grow py-8 bg-gray-50">
          <Outlet />
        </main>
        <ScrollRestoration />
        {/* Only include scripts if required */}
        {includeScripts ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}
