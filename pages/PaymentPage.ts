import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  private readonly nameOnCardInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly cvcInput: Locator;
  private readonly expiryMonthInput: Locator;
  private readonly expiryYearInput: Locator;
  private readonly payButton: Locator;
  
  public readonly paymentHeading: Locator;

  constructor(page: Page) {
    super(page);
    
    this.paymentHeading = page.locator('h2:has-text("Payment")');
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
  }

  /**
   * Fill in the payment form with card details
   * @param cardDetails - Object containing card information
   */
  async fillPaymentDetails(cardDetails: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.nameOnCardInput.fill(cardDetails.nameOnCard);
    await this.cardNumberInput.fill(cardDetails.cardNumber);
    await this.cvcInput.fill(cardDetails.cvc);
    await this.expiryMonthInput.fill(cardDetails.expiryMonth);
    await this.expiryYearInput.fill(cardDetails.expiryYear);
  }

  async clickPayAndConfirmOrder() {
    await this.payButton.click();
    await this.page.waitForURL('**/payment_done/**', { timeout: 10000 });
  }
}

