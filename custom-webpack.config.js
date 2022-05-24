require("dotenv").config();
const EnvSettings = require("advanced-settings").EnvSettings;
const envSettings = new EnvSettings();

const options = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/settings.json", function (_req, res) {
        const settings = envSettings.loadJsonFileSync("./settings.json");
        res.json(settings);
      });

      return middlewares;
    },
  },
};

module.exports = options;
