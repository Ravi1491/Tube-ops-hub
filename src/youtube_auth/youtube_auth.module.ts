import { Module } from '@nestjs/common';
import { YoutubeAuthService } from './youtube_auth.service';
import { YoutubeAuthController } from './youtube_auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeAuth } from './entities/youtube_auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeAuth])],
  controllers: [YoutubeAuthController],
  providers: [YoutubeAuthService],
})
export class YoutubeAuthModule {}
