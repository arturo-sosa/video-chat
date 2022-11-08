import { Module } from '@nestjs/common';

import { StreamModule } from '../stream/stream.module';
import { StreamGateway } from '../stream/stream.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StreamModule],
  controllers: [AppController],
  providers: [AppService, StreamGateway],
})
export class AppModule { }
