const { test, expect } = require('@playwright/test');

test.describe('Todo App E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the app and show the greeting', async ({ page }) => {
        const greeting = page.locator('h1');
        await expect(greeting).toBeVisible();
        await expect(greeting).toHaveText(/Hello world!/i);
    });

    test('should add, complete and delete a todo', async ({ page }) => {
        const input = page.getByPlaceholder('New Item');
        const addButton = page.getByRole('button', { name: /Add Item/i });

        const todoName = `E2E Test - ${Date.now()}`;

        // Add
        await input.fill(todoName);
        await addButton.click();

        // Verify presence
        const todoItem = page.locator('.item', { hasText: todoName });
        await expect(todoItem).toBeVisible();

        // Complete
        const completeButton = todoItem.getByLabel(/Mark item as complete/i);
        await completeButton.click();
        await expect(todoItem).toHaveClass(/completed/);

        // Delete
        const deleteButton = todoItem.getByLabel('Remove Item');
        await deleteButton.click();

        // Verify absence
        await expect(todoItem).not.toBeVisible();
    });
});
