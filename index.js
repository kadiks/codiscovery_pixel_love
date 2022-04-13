import path from "path";
import { fileURLToPath } from "url";

import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifySocketIO from "fastify-socket.io";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: false,
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "public"),
});
fastify.register(fastifySocketIO);

fastify.ready((err) => {
  console.log("fastify read");
  if (err) {
    console.log("Error loading fastify");
    return;
  }
  fastify.io.on("connection", (socket) => {
    console.log("socket.id", socket.id);
    socket.on("update-pixel-data", (pixelData) => {
      // console.log("backend pixel data", pixelData);
      fastify.io.emit("update-pixel-data", pixelData);
    });
  });
});

fastify.listen(
  {
    port: process.env.PORT || 3000,
  },
  (err, address) => {
    if (err) {
      console.log("Error starting server", err);
      return;
    }
    console.log("Server started");
  }
);
