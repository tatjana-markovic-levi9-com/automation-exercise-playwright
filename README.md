# Automation Exercise Playwright Testing

This project contains automated tests for [AutomationExercise.com](https://www.automationexercise.com/) using Playwright with TypeScript and the Page Object Model (POM) pattern.

## Project Structure

- `pages/` - Page Object Model classes (BasePage, SignUpPage, HomePage)
- `tests/` - Test files organized by feature
- `utils/` - Test data generators and utility functions
- `playwright.config.ts` - Playwright configuration
- `.cursorrules` - Project coding standards and best practices

## Features

- ✅ **Page Object Model (POM)** - Clean separation of page logic and tests
- ✅ **TypeScript** - Type-safe test code
- ✅ **Reusable Components** - BasePage with common methods
- ✅ **Test Data Generators** - Random data generation for unique test runs
- ✅ **Cross-browser Testing** - Chrome, Firefox, and WebKit
- ✅ **Screenshots & Videos** - Automatic capture on test failures
- ✅ **Comprehensive Assertions** - Validates all aspects of signup flow

## Installation

1. Make sure you have Node.js installed
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

## Running Tests

- **All tests:** `npx playwright test`
- **Headed mode:** `npx playwright test --headed`
- **Specific test file:** `npx playwright test tests/signup.spec.ts`
- **Specific browser:** `npx playwright test --project=chromium`
- **Debug mode:** `npx playwright test --debug`
- **UI mode:** `npx playwright test --ui`

## View Test Reports

- View HTML report: `npx playwright show-report`

## Test Cases

Test files are organized by feature in the `tests/` directory. Each test suite follows the AAA pattern (Arrange, Act, Assert) and uses the Page Object Model for clean, maintainable tests.

## Page Objects

### BasePage
Base class with minimal common methods used across all pages:
- Navigation, waiting, visibility checks, and scrolling utilities
- All page objects extend this class

### SignUpPage
Handles all signup-related functionality including form filling and account creation

### HomePage
Manages home page navigation and user state verification

## Test Data Utilities

The `testData.ts` file provides:
- Random test data generation with Faker
- Predefined test emails and users
- Type-safe data structures with interfaces

## Configuration

The project is configured in `playwright.config.ts`:
- Base URL: `https://www.automationexercise.com`
- Screenshots on failure: Enabled
- Video on failure: Enabled
- Trace on retry: Enabled
- Parallel execution: Enabled
- Retry on CI: 2 attempts

## Best Practices Implemented

1. **Page Object Model** - Separates test logic from page interactions
2. **DRY Principle** - Reusable methods in BasePage
3. **Type Safety** - Full TypeScript typing
4. **Random Data** - Prevents test data conflicts
5. **Descriptive Names** - Clear, self-documenting code
6. **Comprehensive Assertions** - Validates expected outcomes
7. **Proper Waits** - Explicit waits for stable tests

## Adding New Tests

To add a new test:

1. Create a new page object in `pages/` (e.g., `LoginPage.ts`)
2. Extend `BasePage` class
3. Define locators and methods
4. Create test file in `tests/` (e.g., `login.spec.ts`)
5. Import the page object and write tests
6. Refer to `.cursorrules` for detailed guidelines and patterns

## Troubleshooting

### Tests failing due to timeouts
- Increase timeout in test or run with `--timeout=60000` flag

### Browser not installed
- Install specific browser: `npx playwright install chromium`

### Need to update dependencies
- Update packages: `npm update`

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [AutomationExercise Test Cases](https://www.automationexercise.com/test_cases)

## Contributing

When adding new tests or pages:
1. Follow the POM structure and guidelines in `.cursorrules`
2. Use TypeScript with proper types
3. Add JSDoc comments for complex methods
4. Keep page objects clean (no assertions)
5. Write independent, parallelizable tests

## License

This is a test automation practice project.


