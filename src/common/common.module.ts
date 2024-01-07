import { Global, Module } from '@nestjs/common';
import { YoutubeService } from './services/youtube.service';

@Global()
@Module({
  imports: [],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class CommonModule {}
