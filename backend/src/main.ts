import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressPeerServer } from 'peer';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const peerServer = ExpressPeerServer(app.getHttpServer());

  app.use('/peerjs', peerServer);

  await app.listen(3000);
})();
