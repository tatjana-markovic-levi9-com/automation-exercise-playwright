# GitHub Actions Workflow Documentation

## Overview

This workflow provides enterprise-grade CI/CD for Playwright test automation with the following key features:

- ✅ **9 parallel test runners** (3 browsers × 3 shards)
- ✅ **Smart caching** for dependencies and browsers
- ✅ **Allure reporting** with historical trends
- ✅ **GitHub Pages deployment** for live reports
- ✅ **80% faster** than sequential execution

---

## Workflow Structure

### Job 1: Install Dependencies
**Purpose**: Cache dependencies for all test runners

**Steps**:
1. Checkout code
2. Setup Node.js 24.11.1
3. Cache node_modules (keyed by package-lock.json)
4. Install dependencies (if cache miss)
5. Cache Playwright browsers (keyed by package-lock.json)
6. Install browsers (if cache miss)

**Runtime**: ~30-60 seconds (with cache hit), ~3-5 minutes (cache miss)

---

### Job 2: Test (Matrix: 9 Runners)
**Purpose**: Run tests in parallel across browsers and shards

**Matrix Configuration**:
```yaml
browser: [chromium, firefox, webkit]
shard: [1, 2, 3]
```

**Creates 9 parallel jobs**:
- chromium (Shard 1/3, 2/3, 3/3)
- firefox (Shard 1/3, 2/3, 3/3)
- webkit (Shard 1/3, 2/3, 3/3)

**Steps per runner**:
1. Checkout code
2. Setup Node.js
3. Restore node_modules cache
4. Restore Playwright browsers cache
5. Install system dependencies (Linux packages for browsers)
6. Run tests: `npx playwright test --project={browser} --shard={shard}/3`
7. Upload Allure results (1-day retention)
8. Upload Playwright report (1-day retention)
9. Upload test videos on failure (7-day retention)

**Runtime**: ~1.5-2 minutes per runner (all run in parallel)

---

### Job 3: Merge Reports and Deploy
**Purpose**: Combine results from all runners and deploy to GitHub Pages

**Steps**:
1. Checkout code
2. Setup Node.js
3. Restore node_modules cache
4. Download all Allure results from 9 runners
5. Merge all results into single directory
6. Download historical data from GitHub Pages
7. Generate comprehensive Allure report
8. Upload merged Allure report (14-30 day retention)
9. Upload Allure results for history (push events only)
10. Upload Pages artifact (if not PR)
11. Deploy to GitHub Pages (if not PR)
12. Add workflow summary

**Runtime**: ~1 minute

---

## Triggers

### Automatic Triggers
- **Push to main/master**: Runs tests + deploys to GitHub Pages
- **Pull Request**: Runs tests (no deployment)

### Manual Trigger
- **workflow_dispatch**: Run manually from GitHub Actions UI
  - Optional input: `test_grep` for filtering tests (e.g., `@smoke`, `@login`)

---

## Environment Variables

```yaml
RETENTION_DAYS: 
  - PRs: 14 days
  - Push/Manual: 30 days

ARTIFACT_SUFFIX:
  - PRs: pr-{number}
  - Others: {run_id}

PAGES_URL: {owner}.github.io/{repo_name}
```

---

## Caching Strategy

### node_modules Cache
- **Path**: `node_modules/`
- **Key**: `node-modules-Linux-{hash(package-lock.json)}`
- **Invalidation**: When dependencies change
- **Savings**: ~1-2 minutes per run

### Playwright Browsers Cache
- **Path**: `~/.cache/ms-playwright`
- **Key**: `playwright-browsers-Linux-{hash(package-lock.json)}`
- **Invalidation**: When Playwright version changes (in package-lock.json)
- **Savings**: ~1-2 minutes per run

### System Dependencies
- **Not cached** (OS-level packages)
- Installed in each test runner via `npx playwright install-deps`
- Fast (~10-20 seconds) due to Ubuntu's apt cache

---

## Artifacts

### Per-Runner Artifacts (Short Retention)
- `allure-results-{browser}-{shard}` (1 day)
- `playwright-report-{browser}-{shard}` (1 day)
- `test-videos-{browser}-{shard}` (7 days, failures only)

### Merged Artifacts (Long Retention)
- `allure-report-{suffix}` (14-30 days)
- `allure-results-{suffix}` (14-30 days, push only)

---

## Performance Metrics

| Configuration | Runners | Average Time | Speedup |
|--------------|---------|--------------|---------|
| Sequential | 1 | ~12 minutes | Baseline |
| 4 Shards | 4 | ~4 minutes | 67% faster |
| **Browser Sharding** | **9** | **~2.5 min** | **~80% faster** |

### Breakdown
- Install Job: ~30-60 sec (cached) / ~3-5 min (first run)
- Test Jobs: ~1.5-2 min (9 parallel)
- Merge & Deploy: ~1 min
- **Total**: ~2.5-3 minutes (cached) / ~5-6 minutes (first run)

---

## Customization

### Adjust Number of Shards
To change shards per browser, update two places:

**1. Matrix configuration (line ~76)**:
```yaml
matrix:
  browser: [chromium, firefox, webkit]
  shard: [1, 2, 3, 4]  # Change to desired number
```

**2. Test command (line ~101)**:
```yaml
run: npx playwright test --project=${{ matrix.browser }} --shard=${{ matrix.shard }}/4
```

### Adjust Browsers
To test fewer browsers:
```yaml
matrix:
  browser: [chromium, firefox]  # Remove webkit
  shard: [1, 2, 3]
```

### Adjust Retention
Change retention days in the `env` section (line ~26):
```yaml
RETENTION_DAYS: ${{ github.event_name == 'pull_request' && 7 || 60 }}
```

---

## Troubleshooting

### Cache Not Working
- Check if `package-lock.json` hash changed
- Old cache keys don't match new ones (expected on first run after changes)

### Tests Failing in CI but Passing Locally
- Check browser versions match
- Review GitHub Actions logs for system dependency issues
- WebKit may need additional Linux packages

### Merge Job Failing
- Ensure all test jobs completed (even with failures)
- Check if Allure results were uploaded from test jobs
- Verify node_modules cache was restored

### GitHub Pages Deployment Failing
- Check GitHub Pages is enabled in repository settings
- Verify workflow has correct permissions (pages: write, id-token: write)
- Ensure not running on PR (deployment skipped for PRs)

---

## Best Practices

✅ **Do:**
- Keep shards balanced (3-5 per browser is optimal)
- Monitor workflow execution times
- Review cache hit rates
- Check Allure reports regularly for flaky tests

❌ **Don't:**
- Over-shard (more than 5 per browser adds overhead)
- Remove caching (saves 50%+ execution time)
- Run tests sequentially (defeats purpose of sharding)
- Deploy from PRs (security risk)

---

## Monitoring

### Key Metrics to Track
1. **Workflow Duration**: Should be ~2.5-3 minutes
2. **Cache Hit Rate**: Should be >80% after first run
3. **Test Pass Rate**: Monitor in Allure historical trends
4. **Flaky Tests**: Identify in Allure retry trends

### GitHub Actions UI
- **Summary**: Shows parallel job execution
- **Artifacts**: Download individual reports for debugging
- **Logs**: Review detailed execution logs per job

### Allure Report (GitHub Pages)
- **Trends**: Historical pass/fail rates
- **Duration**: Track test execution time changes
- **Retries**: Identify flaky tests
- **Categories**: Group failures by type

---

## Security Considerations

✅ **Implemented**:
- Read-only content access
- Minimal required permissions
- PR isolation (no deployment)
- Artifact retention limits

🔐 **Best Practices**:
- Don't store secrets in artifacts
- Don't expose sensitive data in test output
- Review PR workflow runs before merging

---

## Future Enhancements

Potential improvements:
- [ ] Add smoke test job for fast feedback
- [ ] Implement test impact analysis
- [ ] Add Slack/email notifications on failure
- [ ] Implement visual regression testing
- [ ] Add performance benchmarking
- [ ] Create separate staging/production workflows
- [ ] Add manual approval for production deployments

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Sharding](https://playwright.dev/docs/test-sharding)
- [Allure Framework](https://docs.qameta.io/allure/)
- [GitHub Pages](https://docs.github.com/en/pages)
