import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  
  public readonly searchResults: Locator;
  public readonly productsTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    this.searchInput = page.locator('input[placeholder="Search Product"]');
    this.searchButton = page.locator('button#submit_search');
    this.searchResults = page.locator('.features_items .col-sm-4');
    this.productsTitle = page.locator('.features_items h2.title');
  }

  async searchForProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  getProductByName(productName: string): Locator {
    return this.page.locator(`.features_items .product-image-wrapper:has-text("${productName}")`);
  }
}

