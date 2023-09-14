import { Injectable } from '@nestjs/common'
import * as puppeteer from 'puppeteer'
import * as fs from 'fs'

@Injectable()
export class ImageDownloaderService {
  async downloadImageFromDiv(url, name) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
      await page.goto(url)

      await page.waitForSelector('div.css-uv3bbs')

      await page.evaluate(() => {
        const divToHide = document.querySelector(
          'nav.css-137m7ew'
        ) as HTMLElement
        if (divToHide) {
          divToHide.style.display = 'none'
        }
      })

      await new Promise((resolve) => setTimeout(resolve, 3000))

      const divHandle = await page.$('div.css-uv3bbs')
      const imageBuffer = await divHandle.screenshot()

      const filePath = `./downloads/${name}.png`
      fs.writeFileSync(filePath, imageBuffer)

      return imageBuffer
    } finally {
      await browser.close()
    }
  }
}
