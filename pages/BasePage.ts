import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://www.automationexercise.com';
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.closePopupsIfPresent();
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Attempts to close any visible popups, modals, or ads
   * This is useful for handling commercials and overlays
   */
  async closePopupsIfPresent() {
    try {
      await this.page.evaluate(() => {
        const selectors = [
          '.adsbygoogle',
          'iframe[title="Advertisement"]',
          '.modal-backdrop',
          '.modal.show',
          '[id*="google_ads"]',
          '[class*="advertisement"]',
          'ins.adsbygoogle'
        ];
        
        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.display = 'none';
            htmlEl.style.visibility = 'hidden';
            htmlEl.style.opacity = '0';
            htmlEl.style.zIndex = '-9999';
          });
        });
        
        // Also remove any fixed/absolute positioned overlays that might be blocking
        const allElements = document.querySelectorAll('*');
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          const style = window.getComputedStyle(htmlEl);
          if ((style.position === 'fixed' || style.position === 'absolute') && 
              parseInt(style.zIndex) > 1000) {
            // Check if it's covering the whole viewport (likely an ad or overlay)
            if (htmlEl.offsetWidth > window.innerWidth * 0.8 && 
                htmlEl.offsetHeight > window.innerHeight * 0.8) {
              htmlEl.style.display = 'none';
            }
          }
        });
      });

      // Press Escape to close any modals
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    } catch (error) {
    }
  }
}

