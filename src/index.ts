import createServer from "./server/server";
import { setupRepo } from "./repo/utils";

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

const start = async () => {
  await setupRepo();
  try {
    await createServer(port);
  } catch (err) {
    process.exit(1);
  }
};

start();
