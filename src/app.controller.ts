import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CredentialsService } from './credentials/credentials.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly credentialsService: CredentialsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('issueCredential')
  issueCredential(): Promise<void> {
    return this.credentialsService.issueCredential();
  }

  @Get('issuePresentation')
  issuePresentation(): Promise<void> {
    return this.credentialsService.issuePresentation();
  }

  @Get('verifyCredential')
  verifyCredential(): void {
    return this.credentialsService.verifyCredential();
  }

  @Get('verifyPresentation')
  verifyPresentation(): void {
    return this.credentialsService.verifyPresentation();
  }
}
