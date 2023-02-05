const path = require("path");
const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
const client = require("../handlers/client.js");

client.commands = new Collection();

const filetype = ".js";

const commandsPath = path.join(__dirname, "../commands");

const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(filetype)
);

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(
  "Successfully loaded all " +
    client.commands.size +
    " application (!) commands"
);
