import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DeleteAccountPage extends BasePage {
  private readonly deleteAccountLink: Locator;
  private readonly continueButton: Locator;
  
  public readonly accountDeletedMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.continueButton = page.getByTestId('continue-button');
    this.accountDeletedMessage = page.getByTestId('account-deleted');
  }

  async clickDeleteAccount() {
    await this.deleteAccountLink.click();
    await this.waitForPageLoad();
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.waitForPageLoad();
  }
}

