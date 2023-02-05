const conf = require("./config.json");
const client = require("./handlers/client.js");

require("./handlers/eventHandler.js");
require("./commandHandler/commandHandler.js");

client.login(conf.TOKEN);
