export const environment = {
  production: true,
  // These are exported by webpack environment plugin (see: custom-webpack.config.ts)
  webvisURL: process.env["THREEDY_WEBVIS_URL"],
};
