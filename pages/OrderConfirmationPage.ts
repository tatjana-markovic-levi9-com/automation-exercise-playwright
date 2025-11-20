import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  public readonly orderPlacedHeading: Locator;
  public readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.orderPlacedHeading = page.locator('h2:has-text("Order Placed")');
    this.successMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
  }
}
