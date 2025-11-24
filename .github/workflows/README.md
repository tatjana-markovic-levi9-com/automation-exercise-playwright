# CI/CD Workflows for Playwright Tests

This directory contains GitHub Actions workflows for automated testing with Allure reporting.

## 📋 Workflows

### 1. `playwright-tests.yml`
**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Manual trigger via workflow dispatch

**Features:**
- Runs all Playwright tests across chromium, firefox, and webkit
- Generates Allure reports with historical trends
- Publishes reports to GitHub Pages
- Uploads artifacts (Allure results, Playwright HTML report, videos on failure)
- Keeps last 20 test report histories

### 2. `playwright-scheduled.yml`
**Triggers:**
- Scheduled run every day at 9 AM UTC
- Manual trigger via workflow dispatch

**Features:**
- Daily automated test execution
- Same reporting capabilities as the main workflow
- Useful for monitoring application health

## 🚀 Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 2: First Run

After pushing these workflow files:
1. Go to **Actions** tab in your GitHub repository
2. Select **Playwright Tests with Allure Report** workflow
3. Click **Run workflow** button
4. Wait for the workflow to complete

### Step 3: Access Reports

Once the workflow completes, your Allure report will be available at:
```
https://<username>.github.io/<repository-name>/<run-number>
```

The link will also be displayed in the workflow summary.

## 📊 Report Features

### Allure Report Includes:
- ✅ Test execution results with pass/fail status
- 📈 Historical trends (last 20 runs)
- ⏱️ Execution time analytics
- 📸 Screenshots for failed tests
- 🎥 Videos for failed tests
- 📝 Detailed test steps
- 🏷️ Test categories and tags
- 📊 Visual graphs and charts

### Artifacts Available:
- **allure-results**: Raw Allure test results
- **playwright-report**: HTML report from Playwright
- **test-videos**: Videos of failed tests (if any)

## 🔧 Customization

### Adjust Test Execution

Edit the workflow files to customize:

**Run specific browsers only:**
```yaml
- name: Run Playwright tests
  run: npx playwright test --project=chromium
```

**Run specific test tags:**
```yaml
- name: Run Playwright tests
  run: npx playwright test --grep @smoke
```

**Adjust workers for CI:**
```yaml
- name: Run Playwright tests
  run: npx playwright test --workers=2
```

### Change Schedule

Edit `playwright-scheduled.yml` to adjust the cron schedule:
```yaml
schedule:
  # Run every Monday at 8 AM UTC
  - cron: '0 8 * * 1'
  
  # Run every 6 hours
  - cron: '0 */6 * * *'
```

### Adjust Report Retention

Change the number of historical reports to keep:
```yaml
with:
  allure_results: allure-results
  allure_history: allure-history
  keep_reports: 20  # Change this number
```

## 🎯 Manual Workflow Trigger

You can manually trigger workflows from GitHub:
1. Go to **Actions** tab
2. Select the workflow you want to run
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

## 📧 Notifications

To add Slack/Email notifications on test failures, add this step:
```yaml
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Playwright tests failed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🐛 Troubleshooting

### Reports not showing on GitHub Pages
- Ensure GitHub Pages is enabled in repository settings
- Check that `gh-pages` branch exists after first workflow run
- Wait 2-3 minutes for GitHub Pages to deploy after workflow completes

### Workflow fails on browser installation
- This is usually resolved by the `--with-deps` flag
- If issues persist, add explicit system dependencies

### Tests timeout
- Adjust the timeout in workflow: `timeout-minutes: 60`
- Check if the test site is accessible from GitHub runners

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

