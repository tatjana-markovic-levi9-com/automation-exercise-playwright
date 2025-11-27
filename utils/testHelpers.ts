import { Page } from '@playwright/test';
import { UserData } from './testData';

/**
 * Helper function to create a user account in a separate browser context
 * Useful for setup/teardown operations that need isolated browser sessions
 * @param page - Playwright Page object from a separate browser context
 * @param userData - User data to register
 */
export async function createUserInSeparateContext(page: Page, userData: UserData): Promise<void> {
  // Import page objects locally to avoid circular dependency
  const { SignUpInitialPage } = await import('../pages/SignUpInitialPage');
  const { AccountInformationPage } = await import('../pages/AccountInformationPage');
  const { HomePage } = await import('../pages/HomePage');
  
  const signUpInitialPage = new SignUpInitialPage(page);
  const accountInformationPage = new AccountInformationPage(page);
  const homePage = new HomePage(page);
  
  await signUpInitialPage.navigateToSignUp();
  await signUpInitialPage.signUp(userData.name, userData.email);
  await accountInformationPage.fillAndSubmitAccountForm(userData);
  await accountInformationPage.clickContinue();
  await homePage.logout();
}

/**
 * Injects CSS rules to hide advertisements and overlays
 * @param page - Playwright Page instance
 */
export async function hideAdsAndOverlays(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      /* Hide advertisement elements */
      .adsbygoogle,
      iframe[title="Advertisement"],
      [id*="google_ads"],
      [class*="advertisement"],
      ins.adsbygoogle,
      .ad-container,
      .advertisement {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Hide large fixed/absolute overlays (likely ads or modals) */
      body > div[style*="position: fixed"],
      body > div[style*="position: absolute"] {
        z-index: -1 !important;
      }

      /* Ensure body is scrollable (modals often disable scroll) */
      body {
        overflow: auto !important;
      }
    `
  });
}

/**
 * Dismisses modals by pressing Escape key
 * @param page - Playwright Page instance
 * @param waitTime - Time to wait after pressing Escape (default: 200ms)
 */
export async function dismissModals(page: Page, waitTime: number = 200): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(waitTime);
}

/**
 * Blocks advertisements at network level
 * @param page - Playwright Page instance
 */
export async function blockAdsAtNetworkLevel(page: Page): Promise<void> {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const adDomains = [
      'doubleclick.net',
      'googlesyndication.com',
      'googleadservices.com',
      'adservice.google.com'
    ];

    const shouldBlock = adDomains.some(domain => url.includes(domain));
    
    shouldBlock ? route.abort() : route.continue();
  });
}

