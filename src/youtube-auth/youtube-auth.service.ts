import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Axios } from 'axios';
import { applicationConfig } from 'config';
import { YoutubeAuth } from './entities/youtube-auth.entity';
import { CreateYoutubeAuthDto } from './dto/create-youtube-auth.dto';
import { UpdateYoutubeAuthDto } from './dto/update-youtube-auth.dto';

@Injectable()
export class YoutubeAuthService {
  oauthAxiosClient: Axios;

  constructor(
    @InjectRepository(YoutubeAuth)
    private youtubeAuthRepository: Repository<YoutubeAuth>,
  ) {
    this.oauthAxiosClient = new Axios({
      baseURL: 'https://oauth2.googleapis.com',
    });
  }

  create(createYoutubeAuthDto: CreateYoutubeAuthDto) {
    return this.youtubeAuthRepository.save(createYoutubeAuthDto);
  }

  findOne(payload = {}, options: FindOneOptions<YoutubeAuth> = {}) {
    return this.youtubeAuthRepository.findOne({
      where: payload,
      ...options,
    });
  }

  update(id: string, updateYoutubeAuthDto: UpdateYoutubeAuthDto) {
    return this.youtubeAuthRepository.update(id, updateYoutubeAuthDto);
  }

  async generateAccessTokenUsingRefreshToken(refreshToken: string) {
    try {
      const response = await this.oauthAxiosClient.post('/token', {
        client_id: applicationConfig.youtube.clientId,
        client_secret: applicationConfig.youtube.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
