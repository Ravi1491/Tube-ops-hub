import { PartialType } from '@nestjs/mapped-types';
import { CreateYoutubeAuthDto } from './create-youtube_auth.dto';

export class UpdateYoutubeAuthDto extends PartialType(CreateYoutubeAuthDto) {}
