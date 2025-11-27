import { Page, Locator, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../utils/testData';

/**
 * Account Information Page - Second form where user fills detailed account information
 */
export class AccountInformationPage extends BasePage {
  private readonly titleMrRadio: Locator;
  private readonly titleMrsRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly dayDropdown: Locator;
  private readonly monthDropdown: Locator;
  private readonly yearDropdown: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly specialOffersCheckbox: Locator;

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly countryDropdown: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly continueButton: Locator;

  public readonly accountCreatedMessage: Locator;
  public readonly loggedInAsText: Locator;

  constructor(page: Page) {
    super(page);
    
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.getByTestId('password');
    this.dayDropdown = page.getByTestId('days');
    this.monthDropdown = page.getByTestId('months');
    this.yearDropdown = page.getByTestId('years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    this.firstNameInput = page.getByTestId('first_name');
    this.lastNameInput = page.getByTestId('last_name');
    this.companyInput = page.getByTestId('company');
    this.address1Input = page.getByTestId('address');
    this.address2Input = page.getByTestId('address2');
    this.countryDropdown = page.getByTestId('country');
    this.stateInput = page.getByTestId('state');
    this.cityInput = page.getByTestId('city');
    this.zipcodeInput = page.getByTestId('zipcode');
    this.mobileNumberInput = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByTestId('create-account');
    this.continueButton = page.getByTestId('continue-button');

    this.accountCreatedMessage = page.getByTestId('account-created');
    this.loggedInAsText = page.locator('text=Logged in as');
  }

  /**
   * Select gender/title (Mr or Mrs)
   * @param gender - User's gender/title
   */
  async selectGender(gender: 'Mr' | 'Mrs') {
    if (gender === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }
  }

  /**
   * Fill account information section using UserData
   * @param userData - User data containing password, date of birth, and preferences
   */
  async fillAccountInformation(userData: UserData) {
    await this.passwordInput.fill(userData.password);
    await this.dayDropdown.selectOption(userData.dateOfBirth.day);
    await this.monthDropdown.selectOption(userData.dateOfBirth.month);
    await this.yearDropdown.selectOption(userData.dateOfBirth.year);

    if (userData.newsletter) {
      await this.newsletterCheckbox.check();
    }

    if (userData.specialOffers) {
      await this.specialOffersCheckbox.check();
    }
  }

  /**
   * Fill address information section using UserData
   * @param userData - User data containing address details
   */
  async fillAddressInformation(userData: UserData) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    
    if (userData.company) {
      await this.companyInput.fill(userData.company);
    }
    
    await this.address1Input.fill(userData.address1);
    
    if (userData.address2) {
      await this.address2Input.fill(userData.address2);
    }
    
    await this.countryDropdown.selectOption(userData.country);
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipcode);
    await this.mobileNumberInput.fill(userData.mobileNumber);
  }

  /**
   * Submit the account creation form
   */
  async submitAccountCreation() {
    await this.createAccountButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Click continue button after account is created
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Fill complete account information form and submit
   * Uses userData object for all fields
   * @param userData - Complete user data
   */
  async fillAndSubmitAccountForm(userData: UserData) {
    await test.step('Fill and submit account information form', async () => {
      await this.selectGender(userData.gender);
      await this.fillAccountInformation(userData);
      await this.fillAddressInformation(userData);
      await this.submitAccountCreation();
    });
  }
}

