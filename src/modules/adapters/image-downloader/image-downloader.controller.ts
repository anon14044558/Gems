import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageDownloaderService } from './image-downloader.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageDownloaderService: ImageDownloaderService) {}

  @Get()
  async downloadImage(@Query('url') url: string, @Res() res: Response): Promise<void> {
    if (!url) {
      res.status(400).send('URL is missing');
      return;
    }

    try {
      const buffer = await this.imageDownloaderService.downloadImageFromDiv(url,'1');

      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'inline');
      res.send(buffer);
    } catch (error) {
      res.status(500).send('Error downloading image');
    }
  }
}
