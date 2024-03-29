/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverModuleFormat: "cjs",
  serverBuildPath: "api/index.js",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: [".*"],
  serverDependenciesToBundle: ["ky"],
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_headers: true,
    v2_routeConvention: true,
  },
};
