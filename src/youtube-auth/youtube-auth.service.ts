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

  async getAccessToken(channelId: string) {
    const youtubeAuth = await this.findOne({
      channelId,
    });
    const currentTimestamp = Date.now();

    // Check if the access token has expired
    const hasExpired = youtubeAuth.expiresAt <= currentTimestamp;

    if (hasExpired) {
      const response = await this.generateAccessTokenUsingRefreshToken(
        youtubeAuth.refreshToken,
      );

      // Calculate expiration timestamp by adding expiresInMilliseconds to the current timestamp
      const expiresInMilliseconds = response.expires_in * 1000;
      const currentTimestamp = Date.now();
      const expiresAtTimestamp = currentTimestamp + expiresInMilliseconds;

      await this.update(youtubeAuth.id, {
        accessToken: response.access_token,
        expiresAt: currentTimestamp + expiresAtTimestamp,
      });

      return response.access_token;
    }

    return youtubeAuth.accessToken;
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
