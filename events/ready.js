const { Events } = require("discord.js");
const client = require("../handlers/client.js");
const Manager = require("../connections/manager.js");

module.exports = {
  name: Events.ShardReady,
  once: true,

  execute() {
    Manager.init(client.user.id);
    console.log(`Logged In as ${client.user.tag}!`);
  },
};
