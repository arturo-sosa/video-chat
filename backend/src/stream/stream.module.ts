import { Module } from '@nestjs/common';
import { StreamGateway } from './stream.gateway';

@Module({
  imports: [],
  providers: [StreamGateway],
})
export class StreamModule { }
