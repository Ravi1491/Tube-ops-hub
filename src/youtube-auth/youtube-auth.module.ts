import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YoutubeAuth } from './entities/youtube-auth.entity';
import { YoutubeAuthController } from './youtube-auth.controller';
import { YoutubeAuthService } from './youtube-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeAuth])],
  controllers: [YoutubeAuthController],
  providers: [YoutubeAuthService],
})
export class YoutubeAuthModule {}
