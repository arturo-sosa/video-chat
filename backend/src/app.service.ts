import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getRoom(id: string): string {
    const room = { id: id ? id : uuid() };
    return JSON.stringify(room);
  }
}
