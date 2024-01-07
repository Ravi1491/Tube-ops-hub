import { Global, Module } from '@nestjs/common';
import { YoutubeApiService } from './services/youtube-api.service';

@Global()
@Module({
  imports: [],
  providers: [YoutubeApiService],
  exports: [YoutubeApiService],
})
export class CommonModule {}
