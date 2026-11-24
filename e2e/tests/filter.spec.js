import { test, expect } from '@playwright/test';

test('filter high priority tasks', async ({ page }) => {
  await page.goto('/');

  // High-task
  await page.fill('#topic', 'High task');
  await page.selectOption('#priority', 'high');
  await page.click('#save-btn');

  // Low-task
  await page.fill('#topic', 'Low task');
  await page.selectOption('#priority', 'low');
  await page.click('#save-btn');

  // SUodatus
  await page.click('.pill.high');

  await expect(page.getByText('High task')).toBeVisible();
  await expect(page.getByText('Low task')).toHaveCount(0);
});

// Toinen testi
test('all filter retores all tasks', async ({ page }) => {
  await page.goto('/');

  // High-task
  await page.fill('#topic', 'Task A');
  await page.selectOption('#priority', 'high');
  await page.click('#save-btn');

  // Low-task
  await page.fill('#topic', 'Task B');
  await page.selectOption('#priority', 'low');
  await page.click('#save-btn');

  await page.click('.pill.high');
  await expect(
    page.locator('.title').filter({ hasText: 'Task A' }),
  ).toBeVisible();
  await page.click('.pill.all');
  await expect(
    page.locator('.title').filter({ hasText: 'Task A' }),
  ).toBeVisible();
  await expect(
    page.locator('.title').filter({ hasText: 'Task B' }),
  ).toBeVisible();
});
