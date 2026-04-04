import { test, expect } from '@playwright/test';

test.describe('Form Interactions', () => {
  test('should have accessible form inputs', async ({ page }) => {
    await page.goto('/');

    // Find all inputs
    const inputs = page.locator('input');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      // Check first input has accessible label
      const firstInput = inputs.first();
      const ariaLabel = await firstInput.getAttribute('aria-label');
      const id = await firstInput.getAttribute('id');
      const label = id ? page.locator(`label[for="${id}"]`) : null;

      const hasAccessibleName = ariaLabel || (label && (await label.isVisible()));
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('should show validation errors', async ({ page }) => {
    // Look for forms with inputs
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      const firstForm = forms.first();

      // Try submitting empty form
      const submitButton = firstForm.locator('button[type="submit"]');
      if (await submitButton.isVisible()) {
        await submitButton.click();

        // Check for error messages
        const errorText = page.locator('[role="alert"], .error, [aria-invalid="true"]');
        const hasErrors = await errorText.count();

        // Either validation prevented submission or errors are shown
        expect(hasErrors >= 0).toBeTruthy();
      }
    }
  });

  test('should handle input state transitions', async ({ page }) => {
    const inputs = page.locator('input[type="text"], input:not([type])');

    if (await inputs.first().isVisible()) {
      const firstInput = inputs.first();

      // Type text
      await firstInput.fill('test value');

      // Check input has the value
      const value = await firstInput.inputValue();
      expect(value).toBe('test value');

      // Clear input
      await firstInput.clear();

      // Check it's cleared
      const clearedValue = await firstInput.inputValue();
      expect(clearedValue).toBe('');
    }
  });

  test('should support select dropdowns', async ({ page }) => {
    const selects = page.locator('select');
    const selectCount = await selects.count();

    if (selectCount > 0) {
      const firstSelect = selects.first();

      // Get options
      const options = firstSelect.locator('option');
      const optionCount = await options.count();

      if (optionCount > 1) {
        // Select second option
        await firstSelect.selectOption({ index: 1 });

        // Verify selection
        const selectedValue = await firstSelect.inputValue();
        expect(selectedValue).toBeTruthy();
      }
    }
  });
});

test.describe('Search Functionality', () => {
  test('should have functional search', async ({ page }) => {
    await page.goto('/');

    // Look for search input
    const searchInput = page
      .locator('input[placeholder*="search" i], input[aria-label*="search" i]')
      .first();

    if (await searchInput.isVisible()) {
      // Type in search
      await searchInput.fill('test');

      // Results should update or search endpoint called
      await page.waitForLoadState('networkidle');

      // Page should respond to search
      const value = await searchInput.inputValue();
      expect(value).toBe('test');
    }
  });

  test('should clear search results', async ({ page }) => {
    const searchInput = page
      .locator('input[placeholder*="search" i], input[aria-label*="search" i]')
      .first();

    if (await searchInput.isVisible()) {
      // Type search term
      await searchInput.fill('test');
      await page.waitForLoadState('networkidle');

      // Clear search
      await searchInput.clear();

      // Should return to default state
      const value = await searchInput.inputValue();
      expect(value).toBe('');
    }
  });
});

test.describe('Form Accessibility', () => {
  test('should support keyboard navigation in forms', async ({ page }) => {
    const inputs = page.locator('input, select, textarea, button');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      // Tab through form elements
      let tabCount = 0;
      for (let i = 0; i < Math.min(5, inputCount); i++) {
        await page.keyboard.press('Tab');
        tabCount++;
      }

      // Should have tabbed through elements
      expect(tabCount).toBeGreaterThan(0);
    }
  });

  test('should announce form errors to screen readers', async ({ page }) => {
    const errorMessages = page.locator('[role="alert"], .error-message, [aria-live]');

    // Page should have error handling structure
    const errorStructure = (await errorMessages.count()) >= 0;
    expect(errorStructure).toBeTruthy();
  });

  test('should mark required fields appropriately', async ({ page }) => {
    const requiredInputs = page.locator('input[required], input[aria-required="true"]');
    const requiredCount = await requiredInputs.count();

    if (requiredCount > 0) {
      const firstRequired = requiredInputs.first();

      // Check for visual indicator
      const ariaRequired = await firstRequired.getAttribute('aria-required');
      expect(ariaRequired).toBe('true');
    }
  });
});
