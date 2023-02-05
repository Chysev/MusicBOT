const Manager = require("./manager.js");

// Node Connection
Manager.on("nodeConnect", (node) => {
  console.log(`Server: "${node.options.name}" connected.`);
});

Manager.on("nodeError", (node, error) => {
  console.log(
    `Server: "${node.options.name}" encountered an error: ${error.message}.`
  );
});
