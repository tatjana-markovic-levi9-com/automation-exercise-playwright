import { Page, Locator } from '@playwright/test';
import { hideAdsAndOverlays, dismissModals } from '../utils/testHelpers';

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
  
  async closePopupsIfPresent() {
    await hideAdsAndOverlays(this.page);
    await dismissModals(this.page);
  }
}

