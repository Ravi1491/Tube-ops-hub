import { Request, Response } from 'express';
import { Controller, Get, Res, Req } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { applicationConfig } from 'config';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/user/entities/user.entity';
import { Public } from 'src/auth/decorators/public';
import { YoutubeApiService } from 'src/common/services/youtube-api.service';
import { YoutubeAuthService } from './youtube-auth.service';

@Controller('youtube-auth')
export class YoutubeAuthController {
  oAuth2Client: OAuth2Client;

  constructor(
    private readonly youtubeAuthService: YoutubeAuthService,
    private readonly youtubeApiService: YoutubeApiService,
  ) {
    this.oAuth2Client = new OAuth2Client(
      applicationConfig.youtube.clientId,
      applicationConfig.youtube.clientSecret,
      applicationConfig.youtube.redirectUrl,
    );
  }

  @Get('/connect')
  connect(@Res() res: Response, @CurrentUser() currentUser: User) {
    try {
      const url = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube.readonly'],
        client_id: applicationConfig.youtube.clientId,
        redirect_uri: applicationConfig.youtube.redirectUrl,
        state: currentUser.id,
      });

      return res.send(url);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Public()
  @Get('/callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    try {
      const code = req.query.code as string;
      const state = req.query.state as string;

      const { tokens } = await this.oAuth2Client.getToken(code as string);
      const { access_token, refresh_token, expiry_date } = tokens;

      const channel = await this.youtubeApiService.getChannel(access_token);
      const channelData = JSON.parse(channel.data);

      const existingConfig = await this.youtubeAuthService.findOne({
        userId: state,
        channelId: channelData.items[0].id,
      });

      if (!existingConfig) {
        await this.youtubeAuthService.create({
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: expiry_date,
          channelId: channelData.items[0].id,
          userId: state,
        });
      } else {
        await this.youtubeAuthService.update(existingConfig.id, {
          accessToken: access_token,
          expiresAt: expiry_date,
        });
      }

      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
