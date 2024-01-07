import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class YoutubeApiService {
  axiosClient: Axios;

  constructor() {
    this.axiosClient = new Axios({ baseURL: 'https://www.googleapis.com' });
  }

  async getMySubscriptions(accessToken: string) {
    try {
      const response = await this.axiosClient.get('/youtube/v3/subscriptions', {
        params: {
          part: 'snippet,contentDetails',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getChannel(accessToken: string) {
    return this.axiosClient.get('/youtube/v3/channels', {
      params: {
        part: 'snippet,contentDetails,statistics',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async uploadVideo(accessToken: string, video: any) {
    try {
      const response = await this.axiosClient.post(
        '/upload/youtube/v3/videos',
        {
          ...video,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteVideo(accessToken: string, videoId: string) {
    try {
      const response = await this.axiosClient.delete('/youtube/v3/videos', {
        params: {
          id: videoId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateVideo(accessToken: string, video: any) {
    try {
      const response = await this.axiosClient.put(
        '/youtube/v3/videos',
        {
          ...video,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async rateVideo(accessToken: string, videoId: string, rating: string) {
    try {
      const response = await this.axiosClient.post(
        '/youtube/v3/videos/rate',
        {
          id: videoId,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMyRatings(accessToken: string) {
    try {
      const response = await this.axiosClient.get('/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          myRating: 'none',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMyLikedVideos(accessToken: string) {
    try {
      const response = await this.axiosClient.get('/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          myRating: 'like',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMyDislikedVideos(accessToken: string) {
    try {
      const response = await this.axiosClient.get('/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          myRating: 'dislike',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getPlaylists(accessToken: string) {
    this.axiosClient.get('/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getPlaylistItems(accessToken: string, playlistId: string) {
    this.axiosClient.get('/youtube/v3/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideos(accessToken: string) {
    this.axiosClient.get('/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        myRating: 'like',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideoDetails(accessToken: string, videoId: string) {
    this.axiosClient.get('/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideoComments(accessToken: string, videoId: string) {
    this.axiosClient.get('/youtube/v3/commentThreads', {
      params: {
        part: 'snippet,replies',
        videoId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideoCommentReplies(accessToken: string, commentId: string) {
    this.axiosClient.get('/youtube/v3/comments', {
      params: {
        part: 'snippet',
        parentId: commentId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getSubscriptions(accessToken: string) {
    this.axiosClient.get('/youtube/v3/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getSubscribers(accessToken: string) {
    this.axiosClient.get('/youtube/v3/subscriptions', {
      params: {
        part: 'snippet,contentDetails',
        mySubscribers: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getActivities(accessToken: string) {
    this.axiosClient.get('/youtube/v3/activities', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSections(accessToken: string) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSectionDetails(accessToken: string, sectionId: string) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        id: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getPlaylistsByChannelId(accessToken: string, channelId: string) {
    this.axiosClient.get('/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideosByChannelId(accessToken: string, channelId: string) {
    this.axiosClient.get('/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        channelId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelDetailsByChannelId(accessToken: string, channelId: string) {
    this.axiosClient.get('/youtube/v3/channels', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: channelId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSectionsByChannelId(accessToken: string, channelId: string) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSectionDetailsByChannelId(
    accessToken: string,
    channelId: string,
    sectionId: string,
  ) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
        id: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getPlaylistsByChannelIdAndSectionId(
    accessToken: string,
    channelId: string,
    sectionId: string,
  ) {
    this.axiosClient.get('/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
        channelSectionId: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getVideosByChannelIdAndSectionId(
    accessToken: string,
    channelId: string,
    sectionId: string,
  ) {
    this.axiosClient.get('/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        channelId,
        channelSectionId: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelDetailsByChannelIdAndSectionId(
    accessToken: string,
    channelId: string,
    sectionId: string,
  ) {
    this.axiosClient.get('/youtube/v3/channels', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: channelId,
        channelSectionId: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSectionsByChannelIdAndSectionId(
    accessToken: string,
    channelId: string,
    sectionId: string,
  ) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
        channelSectionId: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getChannelSectionDetailsByChannelIdAndSectionId(
    accessToken: string,
    channelId: string,
    sectionId: string,
    sectionDetailId: string,
  ) {
    this.axiosClient.get('/youtube/v3/channelSections', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
        channelSectionId: sectionId,
        id: sectionDetailId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getPlaylistsByChannelIdAndSectionIdAndSectionDetailId(
    accessToken: string,
    channelId: string,
    sectionId: string,
    sectionDetailId: string,
  ) {
    this.axiosClient.get('/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        channelId,
        channelSectionId: sectionId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
