import { Page } from '@playwright/test';
import { SignUpInitialPage } from './SignUpInitialPage';
import { AccountInformationPage } from './AccountInformationPage';
import { UserData } from '../utils/testData';


export class SignUpPage {
  private signUpInitialPage: SignUpInitialPage;
  private accountInformationPage: AccountInformationPage;

  get signupNameInput() {
    return this.signUpInitialPage.signupNameInput;
  }

  get signupEmailInput() {
    return this.signUpInitialPage.signupEmailInput;
  }

  get signUpErrorMessage() {
    return this.signUpInitialPage.signUpErrorMessage;
  }

  get accountCreatedMessage() {
    return this.accountInformationPage.accountCreatedMessage;
  }

  get loggedInAsText() {
    return this.accountInformationPage.loggedInAsText;
  }

  constructor(page: Page) {
    this.signUpInitialPage = new SignUpInitialPage(page);
    this.accountInformationPage = new AccountInformationPage(page);
  }

  async navigateToSignUp() {
    await this.signUpInitialPage.navigateToSignUp();
  }

  async signUp(name: string, email: string) {
    await this.signUpInitialPage.signUp(name, email);
  }

  async waitForSignUpErrorMessage() {
    await this.signUpInitialPage.waitForSignUpErrorMessage();
  }

  async clickContinue() {
    await this.accountInformationPage.clickContinue();
  }

  async fillAndSubmitSignUpForm(userData: UserData) {
    await this.signUp(userData.name, userData.email);
    
    await this.accountInformationPage.fillAndSubmitAccountForm(userData);
  }
}
