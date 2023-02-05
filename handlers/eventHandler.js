const path = require("path");
const client = require("./client.js");
const { readdirSync } = require("fs");

const filetype = ".js";

const eventsPath = path.join(__dirname, "../events");

const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(filetype)
);

for (const file of eventFiles) {
  const event = require(`../events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
