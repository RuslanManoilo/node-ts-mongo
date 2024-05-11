import { App } from '@/app';
import { MongooseClient } from '@clients/MongooseClient';
import routes from '@/routes';

(async () => {
  await MongooseClient.connect();

  const app = new App(routes);

  const server = app.listen();
  server.setTimeout(180000); // 3 min
})();
