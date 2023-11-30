import { Injectable } from '@nestjs/common';
import { IServerResponse } from '@northvolt/shared';

@Injectable()
export class AppService {
  getData(): IServerResponse {
    return { message: 'The API is online!' };
  }
}
