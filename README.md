# Automation Exercise Playwright Testing

This project contains comprehensive automated tests for [AutomationExercise.com](https://www.automationexercise.com/) using Playwright with TypeScript and the Page Object Model (POM) pattern.

## 📁 Project Structure

```
automation-exercise-playwright/
├── fixtures/              # Test fixtures
│   └── page-fixtures.ts   # Page Object fixtures for dependency injection
├── pages/                 # Page Object Model classes
│   ├── BasePage.ts        # Base class with common functionality
│   ├── HomePage.ts        # Home page interactions
│   ├── LoginPage.ts       # Login functionality
│   ├── SignUpPage.ts      # User registration
│   ├── DeleteAccountPage.ts
│   ├── ProductsPage.ts    # Product browsing and cart
│   ├── SearchPage.ts      # Product search
│   ├── CartPage.ts        # Shopping cart management
│   ├── CheckoutPage.ts    # Checkout process
│   ├── PaymentPage.ts     # Payment form
│   └── OrderConfirmationPage.ts
├── tests/                 # Test files organized by feature
│   ├── signup.spec.ts     # User registration tests
│   ├── login.spec.ts      # Login and logout tests
│   ├── cart.spec.ts       # Shopping cart tests
│   ├── search.spec.ts     # Product search tests
│   └── checkout.spec.ts   # End-to-end checkout flow
├── utils/                 # Utilities and test data
│   └── testData.ts        # Test data generators with Faker
├── playwright.config.ts   # Playwright configuration
└── .cursorrules          # Project coding standards and best practices
```

## ✨ Features

- ✅ **Page Object Model (POM)** - Clean separation of page logic and tests
- ✅ **TypeScript** - Type-safe test code with interfaces
- ✅ **Test Fixtures** - Centralized page object fixtures for clean dependency injection
- ✅ **Reusable Components** - BasePage with common methods
- ✅ **Ad/Popup Blocking** - Automatic handling of commercial overlays
- ✅ **Test Data Generators** - Random data generation with Faker for unique test runs
- ✅ **Cross-browser Testing** - Chrome, Firefox, and WebKit support
- ✅ **Screenshots & Videos** - Automatic capture on test failures
- ✅ **Test Tags** - Organized tests with tags (@login, @products, @search, @checkout)
- ✅ **Comprehensive Coverage** - 18 tests covering major user flows

## 📊 Test Coverage

### Test Suites (18 Tests Total)

| Suite | Tests | Description |
|-------|-------|-------------|
| **Login** | 4 | Valid/invalid login, logout functionality |
| **Signup** | 5 | User registration, validation, account deletion |
| **Cart** | 4 | Add/remove products, quantity management |
| **Search** | 4 | Product search with various scenarios |
| **Checkout** | 1 | Complete end-to-end checkout flow |

## 🚀 Installation

1. Make sure you have Node.js installed (v24.11.1 or higher recommended)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🔄 CI/CD Pipeline

This project includes a production-grade GitHub Actions workflow with advanced optimizations:

### Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Install Dependencies                     │
│  • Cache node_modules (keyed by package-lock.json)         │
│  • Cache Playwright browsers (keyed by package-lock.json)  │
│  • Runs once, shared by all test runners                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           Test Job (9 Parallel Runners)                     │
│                                                              │
│  🟦 Chromium           🟧 Firefox           🟪 WebKit       │
│  ├─ Shard 1/3         ├─ Shard 1/3         ├─ Shard 1/3   │
│  ├─ Shard 2/3         ├─ Shard 2/3         ├─ Shard 2/3   │
│  └─ Shard 3/3         └─ Shard 3/3         └─ Shard 3/3   │
│                                                              │
│  Each runner:                                               │
│  • Restores cached dependencies                            │
│  • Runs 1/3 of tests for one browser                       │
│  • Uploads Allure results, reports, and videos             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Merge Reports and Deploy                       │
│  • Downloads results from all 9 runners                     │
│  • Merges into single comprehensive Allure report           │
│  • Downloads historical data for trends                     │
│  • Generates final Allure report                            │
│  • Deploys to GitHub Pages (if not PR)                      │
└─────────────────────────────────────────────────────────────┘
```

### Key Features

#### 🚀 **Performance Optimizations**
- **Browser-Based Sharding**: 3 browsers × 3 shards = 9 parallel runners
- **Smart Caching**: node_modules and browsers cached and reused
- **~80% faster** execution compared to sequential runs
- **Total runtime**: ~2-3 minutes (vs ~12+ minutes without optimizations)

#### 📊 **Reporting**
- **Allure Reports**: Beautiful, comprehensive test reports with history
- **GitHub Pages**: Live report automatically deployed
- **Historical Trends**: Track test stability and duration over time
- **Per-Runner Reports**: Individual Playwright reports for debugging

#### 🎯 **Triggers**
- **Push to main/master**: Full test suite with deployment
- **Pull Requests**: Full test suite (no deployment)
- **Manual Trigger**: Run on-demand with optional test filtering

#### 🔧 **Configuration**
- **Artifact Retention**: 
  - PRs: 14 days
  - Push/Manual: 30 days
- **Test Videos**: Captured on failures (7-day retention)
- **Cross-Browser**: Chromium, Firefox, WebKit tested in parallel

### Workflow Triggers

The CI pipeline runs on:
- ✅ Push to `main` or `master` branch
- ✅ Pull requests to `main` or `master`
- ✅ Manual workflow dispatch (with optional test filtering)

### Manual Workflow Execution

Run tests manually from GitHub Actions:
1. Go to **Actions** tab
2. Select **"Playwright Tests with Allure Report"**
3. Click **"Run workflow"**
4. Optional: Add test filter (e.g., `@login`, `@smoke`)
5. Click **"Run workflow"** button

### Viewing Test Reports

#### Live Allure Report (GitHub Pages)
Visit: `https://YOUR_USERNAME.github.io/automation-exercise-playwright/`

The report includes:
- ✅ Test execution results across all browsers
- ✅ Historical trends and statistics
- ✅ Test duration and flakiness tracking
- ✅ Screenshots and logs for failures
- ✅ Test categorization and filtering

#### Artifacts (Downloadable)
Available in each workflow run:
- **Merged Allure Report** (all browsers combined)
- **Individual Playwright Reports** (per browser-shard)
- **Test Videos** (failures only)
- **Allure Results** (raw data for history)

### Performance Comparison

| Configuration | Runners | Time | Speedup |
|--------------|---------|------|---------|
| Sequential (no sharding) | 1 | ~12 min | Baseline |
| Basic sharding (4 shards) | 4 | ~4 min | 67% faster |
| **Browser sharding (current)** | **9** | **~2.5 min** | **~80% faster** 🚀 |

### Cache Strategy

The workflow uses two-level caching:

1. **node_modules Cache**
   - Key: `node-modules-Linux-{package-lock.json hash}`
   - Invalidates when dependencies change
   - Saves ~1-2 minutes per run

2. **Playwright Browsers Cache**
   - Key: `playwright-browsers-Linux-{package-lock.json hash}`
   - Invalidates when Playwright version changes
   - Saves ~1-2 minutes per run

**Total cache savings**: ~2-4 minutes per workflow run after first execution

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/login.spec.ts

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests with specific tag
npx playwright test --grep @login
npx playwright test --grep @products
npx playwright test --grep @checkout

# Debug mode
npx playwright test --debug

# Run with more workers for faster execution
npx playwright test --workers=4
```

### View Test Reports

```bash
# View HTML report
npx playwright show-report

# Generate and open report
npx playwright test && npx playwright show-report
```

## 📋 Test Cases

### Login Tests (`tests/login.spec.ts`)
- ✅ Verify login with valid credentials
- ✅ Verify login with invalid email
- ✅ Verify login with invalid password
- ✅ Verify logout functionality

### Signup Tests (`tests/signup.spec.ts`)
- ✅ Successfully register new user with complete information
- ✅ Show error when signing up with existing email
- ✅ Validate invalid email format
- ✅ Validate empty name field
- ✅ Successfully delete user account

### Cart Tests (`tests/cart.spec.ts`)
- ✅ Successfully add a product to cart
- ✅ Successfully add multiple products to cart
- ✅ Successfully remove a product from cart
- ✅ Display correct quantity when adding same product multiple times

### Search Tests (`tests/search.spec.ts`)
- ✅ Successfully search for a product by name
- ✅ Find specific product when searching
- ✅ Show all products when search is empty
- ✅ Handle search with no results

### Checkout Tests (`tests/checkout.spec.ts`)
- ✅ Complete end-to-end checkout flow with payment

## 📄 Page Objects

### BasePage
Base class with common functionality:
- `navigateTo(url)` - Navigate to any URL
- `waitForPageLoad()` - Wait for page load + automatic popup/ad closing
- `closePopupsIfPresent()` - Aggressively remove ads and overlays
- `waitForElement(selector)` - Wait for element visibility
- `isElementVisible(selector)` - Check element visibility
- `scrollToElement(locator)` - Scroll element into view

### Key Page Objects
- **HomePage** - Home navigation, login/signup links, cart access
- **LoginPage** - User authentication
- **SignUpPage** - Complete user registration form
- **ProductsPage** - Product browsing, add to cart
- **SearchPage** - Product search functionality
- **CartPage** - Shopping cart management
- **CheckoutPage** - Order review and checkout
- **PaymentPage** - Payment form handling
- **OrderConfirmationPage** - Order success verification

## 🛠️ Test Data Management

The `utils/testData.ts` file provides:
- **Random data generation** with Faker.js
- **Predefined test users** with existing credentials
- **Product catalog** with product names
- **Payment card data** for checkout tests
- **Type-safe interfaces** for all data structures
- **Unique email generation** with timestamps

## ⚙️ Configuration

Key settings in `playwright.config.ts`:
- **Base URL**: `https://www.automationexercise.com`
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On retry
- **Parallel execution**: Enabled (8 workers)
- **Retries**: 2 attempts on CI
- **Timeout**: 30s per test

## 🎯 Best Practices Implemented

1. ✅ **Page Object Model** - All page interactions in page objects, never in tests
2. ✅ **Fixture-Based Testing** - Use fixtures for dependency injection, never import pages directly
3. ✅ **Test Steps in Page Objects** - Use `test.step()` in page objects for better reporting
4. ✅ **No Conditional Logic in Tests** - Tests follow linear flow without if/else statements
5. ✅ **Every Test Has Assertions** - All tests end with verification
6. ✅ **Interface Reuse** - Interfaces defined once and reused across files
7. ✅ **Object Parameters** - Methods with 6+ parameters use objects for clarity
8. ✅ **DRY Principle** - No code duplication, reusable methods
9. ✅ **Type Safety** - Full TypeScript with no `any` types
10. ✅ **Random Data** - Unique test data prevents conflicts
11. ✅ **Test Independence** - Tests can run in any order
12. ✅ **Descriptive Names** - Clear, self-documenting code
13. ✅ **AAA Pattern** - Arrange, Act, Assert structure
14. ✅ **Proper Waits** - Explicit waits, no hard-coded delays
15. ✅ **Assertions in Tests Only** - Page objects never contain `expect()`

## 🆕 Adding New Tests

To add a new test:

1. **Create a Page Object** in `pages/` if needed
   - Extend `BasePage` class
   - Define locators in constructor
   - Create action methods

2. **Add to fixtures** in `fixtures/page-fixtures.ts`
   - Register your new page object
   - Use dependency injection pattern

3. **Create test file** in `tests/` (e.g., `myfeature.spec.ts`)
   - Import test and expect from page-fixtures
   - Use describe blocks with tags
   - Follow AAA pattern (Arrange, Act, Assert)

4. **Refer to `.cursorrules`** for detailed guidelines and patterns

## 🔧 Troubleshooting

### Tests failing due to timeouts
- Increase timeout with `--timeout=60000` flag
- Or set in test with `test.setTimeout(60000)`

### Tests flaky when running in parallel
- Reduce workers with `--workers=2` flag
- Tests are designed to be independent and parallel-safe

### Browser not installed
- Install specific browser with `npx playwright install chromium`

### Ad overlays blocking elements
- BasePage automatically closes popups after page load
- Manual call available: `closePopupsIfPresent()`

### Need to update dependencies
- Update packages with `npm update`
- Reinstall browsers with `npx playwright install`

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [AutomationExercise Test Cases](https://www.automationexercise.com/test_cases)

## 🤝 Contributing

When adding new tests or pages:
1. Follow the POM structure and guidelines in `.cursorrules`
2. **Use fixtures, NEVER import pages directly** in test files
3. **Use `test.step()` in page objects ONLY**, not in tests
4. **No conditional logic in tests** (no if/else statements)
5. **Each test must end with assertion**
6. **Reuse interfaces** - import from `testData.ts`, don't redefine
7. **Use objects for 6+ parameters** instead of individual arguments
8. Use TypeScript with proper types (no `any`)
9. Define all locators in constructor
10. Add JSDoc comments for complex methods
11. Keep page objects clean (no assertions - use `expect()` only in tests)
12. Write independent, parallelizable tests
13. Add test tags for easy filtering
14. Ensure tests pass individually and in parallel

## 📝 Notes

- **Pass Rate**: 94-100% depending on external website stability
- **Local Execution Time**: ~20-50s for full suite on Chromium
- **CI Execution Time**: ~2-3 minutes (with 9 parallel runners and caching)
- **Known Flakiness**: Some tests may fail during parallel execution due to external website's ad overlays and slow page loads. All tests pass when run individually.
- **CI/CD**: Fully automated testing with GitHub Actions, Allure reporting, and GitHub Pages deployment
- **Browser Coverage**: All tests run on Chromium, Firefox, and WebKit in parallel

## 🔗 Quick Links

- **Live Test Reports**: `https://YOUR_USERNAME.github.io/automation-exercise-playwright/`
- **GitHub Actions**: Check the Actions tab for workflow runs
- **Test Cases Reference**: [AutomationExercise Test Cases](https://www.automationexercise.com/test_cases)

## 📄 License

This is a test automation practice project.
