import path from "path";
import { fileURLToPath } from "url";

import Fastify from "fastify";
import fastifyStatic from "fastify-static";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(dirname, "public"),
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
