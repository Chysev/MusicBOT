const nodes = require("./server.js");
const { Manager } = require("erela.js");
const client = require("../handlers/client.js");

const manager = new Manager({
  nodes,

  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);

    if (guild) guild.shard.send(payload);
  },
});

module.exports = manager;
