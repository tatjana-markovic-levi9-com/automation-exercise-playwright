import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly placeOrderButton: Locator;
  public readonly addressDetailsHeading: Locator;
  public readonly reviewOrderHeading: Locator;

  constructor(page: Page) {
    super(page);
    
    this.addressDetailsHeading = page.locator('h2.heading:has-text("Address Details"), h2:has-text("Address Details")');
    this.reviewOrderHeading = page.locator('h2.heading:has-text("Review Your Order"), h2:has-text("Review Your Order")');
    this.placeOrderButton = page.locator('.btn.btn-default.check_out');
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForURL('**/payment', { timeout: 30000 });
  }
}

