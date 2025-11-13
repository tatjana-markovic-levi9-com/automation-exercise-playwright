import { faker } from '@faker-js/faker';

export const TEST_EMAILS = {
  get valid(): string {
    return faker.string.alphanumeric(5).toLowerCase() + Date.now() + '@testmail.com';
  },
  invalid: 'invalid-email-format',
  existing: faker.string.alphanumeric(5).toLowerCase() + Date.now() + '@testmail.com',
};

export const USER = {
  name: 'Test User',
  get emailExisting(): string {
    return TEST_EMAILS.existing;
  },
};

export function generateRandomEmail(): string {
  return faker.internet.email();
}

export function generateRandomFirstName(): string {
  return faker.person.firstName();
}

export function generateRandomLastName(): string {
  return faker.person.lastName();
}

export function generateRandomPassword(): string {
  return faker.internet.password({ length: 12, memorable: true, pattern: /[A-Za-z0-9]/ });
}

export function generateRandomDateOfBirth() {
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  return {
    day: birthDate.getDate().toString(),
    month: months[birthDate.getMonth()],
    year: birthDate.getFullYear().toString(),
  };
}

export interface UserData {
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
}

export function generateUserData(overrides?: Partial<UserData>): UserData {
  const firstName = generateRandomFirstName();
  const lastName = generateRandomLastName();
  const dateOfBirth = generateRandomDateOfBirth();
  
  const defaultData: UserData = {
    name: `${firstName} ${lastName}`,
    email: generateRandomEmail(),
    gender: faker.helpers.arrayElement(['Mr', 'Mrs']) as 'Mr' | 'Mrs',
    password: generateRandomPassword(),
    dateOfBirth: dateOfBirth,
    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number(),
    newsletter: faker.datatype.boolean(),
    specialOffers: faker.datatype.boolean(),
  };

  return { ...defaultData, ...overrides };
}

