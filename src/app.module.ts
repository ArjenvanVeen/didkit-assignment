import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsService } from './credentials/credentials.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CredentialsService],
})
export class AppModule {}
