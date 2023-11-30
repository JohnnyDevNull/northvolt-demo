import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.dev.env'],
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
