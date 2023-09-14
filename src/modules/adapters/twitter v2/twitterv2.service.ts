// twitterv2.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { TwitterApi } from 'twitter-api-v2'

@Injectable()
export class TwitterV2Service implements OnModuleInit {
  private readonly client: TwitterApi

  async onModuleInit() {
    console.log('twitterService')
  }

  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })
  }

  async postTweet(tweetText: string): Promise<void> {
    try {
      const tweet = await this.client.v2.tweet(tweetText)
      console.log(`Tweet posted with ID ${tweet.data.id}`)
    } catch (error) {
      console.error(`Failed to post tweet: ${error}`)
      throw error
    }
  }

  async postTweetWithResponse(formattedData: any): Promise<void> {
    const tweetText = JSON.stringify(formattedData, null, 2)

    await this.postTweet(tweetText)
  }

  async postThreadTweet(responseData: any): Promise<any> {
    try {
      const tweet = await this.client.v2.tweetThread([
        ...responseData
      ])
      return tweet
    } catch (error) {
      console.error(`Failed to post tweet: ${error}`)
      throw error
    }
  }

  async uploadMedia(filePath: string): Promise<string> {
    try {
      const mediaId = await this.client.v1.uploadMedia(filePath);
      return mediaId;
    } catch (error) {
      console.error(`Failed to upload media: ${error}`);
      throw error;
    }
  }
}
