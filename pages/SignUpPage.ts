import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
  public readonly signupNameInput: Locator;
  public readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;

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
  public readonly signUpErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.dayDropdown = page.locator('select[data-qa="days"]');
    this.monthDropdown = page.locator('select[data-qa="months"]');
    this.yearDropdown = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countryDropdown = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');

    this.continueButton = page.locator('a[data-qa="continue-button"]');

    this.accountCreatedMessage = page.locator('h2[data-qa="account-created"]');
    this.loggedInAsText = page.locator('text=Logged in as');
    this.signUpErrorMessage = page.locator('form[action="/signup"] p', { hasText: 'Email Address already exist!' });
  }

  async navigateToSignUp() {
    await this.navigateTo('/login');
    await this.waitForPageLoad();
  }

  async signUp(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async waitForSignUpErrorMessage() {
    await this.signUpErrorMessage.waitFor({ state: 'visible' });
  }

  async selectGender(gender: 'Mr' | 'Mrs') {
    if (gender === 'Mr') {
      await this.titleMrRadio.check();
    } else {
      await this.titleMrsRadio.check();
    }
  }

  async fillAccountInformation(data: {
    password: string;
    day: string;
    month: string;
    year: string;
    newsletter?: boolean;
    specialOffers?: boolean;
  }) {
    await this.passwordInput.fill(data.password);
    await this.dayDropdown.selectOption(data.day);
    await this.monthDropdown.selectOption(data.month);
    await this.yearDropdown.selectOption(data.year);

    if (data.newsletter) {
      await this.newsletterCheckbox.check();
    }

    if (data.specialOffers) {
      await this.specialOffersCheckbox.check();
    }
  }

  async fillAddressInformation(data: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    
    if (data.company) {
      await this.companyInput.fill(data.company);
    }
    
    await this.address1Input.fill(data.address1);
    
    if (data.address2) {
      await this.address2Input.fill(data.address2);
    }
    
    await this.countryDropdown.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);
  }

  async submitAccountCreation() {
    await this.createAccountButton.click();
    await this.waitForPageLoad();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  getUsernameLocator(username: string): Locator {
    return this.page.locator(`text=${username}`);
  }

  async fillAndSubmitSignUpForm(userData: {
    name: string;
    email: string;
    gender: 'Mr' | 'Mrs';
    password: string;
    dateOfBirth: { day: string; month: string; year: string };
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    newsletter?: boolean;
    specialOffers?: boolean;
  }) {
    await this.signUp(userData.name, userData.email);
    await this.waitForPageLoad();

    await this.selectGender(userData.gender);

    await this.fillAccountInformation({
      password: userData.password,
      day: userData.dateOfBirth.day,
      month: userData.dateOfBirth.month,
      year: userData.dateOfBirth.year,
      newsletter: userData.newsletter,
      specialOffers: userData.specialOffers,
    });

    await this.fillAddressInformation({
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      mobileNumber: userData.mobileNumber,
    });

    await this.submitAccountCreation();
  }

  async createUserAndLogout(userData: {
    name: string;
    email: string;
    gender: 'Mr' | 'Mrs';
    password: string;
    dateOfBirth: { day: string; month: string; year: string };
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    newsletter?: boolean;
    specialOffers?: boolean;
  }) {
    await this.navigateToSignUp();
    await this.fillAndSubmitSignUpForm(userData);
    await this.clickContinue();
    await this.page.locator('a[href="/logout"]').click();
    await this.page.waitForLoadState('networkidle');
  }

}

