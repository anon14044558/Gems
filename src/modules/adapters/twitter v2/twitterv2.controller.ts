// twitterv2.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TwitterV2Service } from './twitterv2.service';

@Controller('twitterv2')
export class TwitterV2Controller {
  constructor(private readonly twitterV2Service: TwitterV2Service) {}

  @Post('post-tweet')
  
  async postTweet(@Body() body: { text: string }): Promise<any> {
    try {
      const response = await this.twitterV2Service.postTweet(body.text);
      return { success: true, response };
    } catch (error) {
      return { success: false, error };
    }
  }

  // @Post('post-thread-tweet')
  // async postThreadTweet(): Promise<any> {
  //   try {
  //     const mediaId = await this.client.v1.uploadMedia('./image.png');

  //     const tweetTexts = [
  //       'Hello, let\'s talk about Twitter!',
  //       { text: 'Twitter is a fantastic social network. Look at this:', media: { media_ids: [mediaId] } },
  //       'This thread is automatically made with twitter-api-v2 :D',
  //     ];
  
  //     const tweet = await this.twitterV2Service.postThreadTweet(tweetTexts);
  //     return { success: true, message: 'Thread tweet posted successfully', tweet };
  //   } catch (error) {
  //     return { success: false, error };
  //   }
  // }
  
  @Post('post-thread-tweet')
async postThreadTweet(): Promise<any> {
  try {
    await this.twitterV2Service.postThreadTweet('Hi');
    return { success: true, message: 'Thread tweet posted successfully' };
  } catch (error) {
    return { success: false, error };
  }
}
  

}
