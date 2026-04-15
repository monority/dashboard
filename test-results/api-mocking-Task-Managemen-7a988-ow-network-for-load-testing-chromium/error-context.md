# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api-mocking.spec.ts >> Task Management with API Mocking >> should simulate slow network for load testing
- Location: e2e\api-mocking.spec.ts:141:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 2000
Received:    1152
```

# Page snapshot

```yaml
- generic [ref=e2]:
    - banner [ref=e3]:
        - generic [ref=e4]:
            - navigation [ref=e5]:
                - link "HumanWorkForce" [ref=e6] [cursor=pointer]:
                    - /url: /
                    - img [ref=e7]
                    - paragraph [ref=e14]:
                        - text: Human
                        - strong [ref=e15]: Work
                        - text: Force
                - list [ref=e16]:
                    - listitem [ref=e17]:
                        - link "Features" [ref=e18] [cursor=pointer]:
                            - /url: /features
                    - listitem [ref=e19]:
                        - link "Pricing" [ref=e20] [cursor=pointer]:
                            - /url: /pricing
                    - listitem [ref=e21]:
                        - link "Contact" [ref=e22] [cursor=pointer]:
                            - /url: /contact
                    - listitem [ref=e23]:
                        - button "Company" [ref=e24] [cursor=pointer]
            - generic [ref=e26]:
                - img [ref=e28] [cursor=pointer]
                - group "Language switch" [ref=e32]:
                    - button "EN" [pressed] [ref=e33] [cursor=pointer]
                    - button "FR" [ref=e34] [cursor=pointer]
    - main [ref=e35]:
        - region "This page does not exist" [ref=e36]:
            - generic [ref=e37]:
                - paragraph [ref=e38]: Error 404
                - heading "This page does not exist" [level=1] [ref=e39]
                - paragraph [ref=e40]: The page may have moved or the URL might be incorrect. You can go back home or contact us.
                - generic [ref=e41]:
                    - button "Go to homepage" [ref=e42] [cursor=pointer]:
                        - generic [ref=e43]: Go to homepage
                    - button "Contact support" [ref=e44] [cursor=pointer]:
                        - generic [ref=e45]: Contact support
        - generic "Human Workforce Cloud" [ref=e46]:
            - generic [ref=e47]:
                - generic [ref=e48]:
                    - heading "Human Workforce Cloud" [level=2] [ref=e49]
                    - paragraph [ref=e50]: Recruit the right human specialists for any project, in hours
                - list "Footer columns" [ref=e51]:
                    - listitem [ref=e52]:
                        - paragraph [ref=e53]: Product
                        - list [ref=e54]:
                            - listitem [ref=e55]:
                                - link "Features" [ref=e56] [cursor=pointer]:
                                    - /url: /features
                            - listitem [ref=e57]:
                                - link "Pricing" [ref=e58] [cursor=pointer]:
                                    - /url: /pricing
                            - listitem [ref=e59]:
                                - link "Roadmap" [ref=e60] [cursor=pointer]:
                                    - /url: /integrations
                    - listitem [ref=e61]:
                        - paragraph [ref=e62]: Company
                        - list [ref=e63]:
                            - listitem [ref=e64]:
                                - link "About" [ref=e65] [cursor=pointer]:
                                    - /url: /about
                            - listitem [ref=e66]:
                                - link "Careers" [ref=e67] [cursor=pointer]:
                                    - /url: /contact?intent=careers
                            - listitem [ref=e68]:
                                - link "Contact" [ref=e69] [cursor=pointer]:
                                    - /url: /contact
                    - listitem [ref=e70]:
                        - paragraph [ref=e71]: Resources
                        - list [ref=e72]:
                            - listitem [ref=e73]:
                                - link "Documentation" [ref=e74] [cursor=pointer]:
                                    - /url: /resources
                            - listitem [ref=e75]:
                                - link "System status" [ref=e76] [cursor=pointer]:
                                    - /url: /security
                            - listitem [ref=e77]:
                                - link "Community" [ref=e78] [cursor=pointer]:
                                    - /url: /testimonials
                - paragraph [ref=e80]: 2026 Human Workforce Cloud. All rights reserved.
```

# Test source

```ts
  68  |         await titleInput.fill('Test Task');
  69  |
  70  |         // Submit form
  71  |         const submitButton = page.locator('button[type="submit"]').first();
  72  |         if (await submitButton.isVisible()) {
  73  |           await submitButton.click();
  74  |
  75  |           // Wait for request
  76  |           await page.waitForLoadState('networkidle');
  77  |         }
  78  |       }
  79  |     }
  80  |   });
  81  |
  82  |   test('should handle API errors gracefully', async ({ page }) => {
  83  |     // Intercept API and return 500 error
  84  |     await page.route('**/api/tasks', (route) => {
  85  |       route.fulfill({
  86  |         status: 500,
  87  |         body: JSON.stringify({
  88  |           error: 'Internal Server Error',
  89  |         }),
  90  |       });
  91  |     });
  92  |
  93  |     await page.goto('/task');
  94  |
  95  |     // Check for error message or fallback UI
  96  |     const errorMessage = page.locator('[role="alert"], .error, .error-message').first();
  97  |
  98  |     // Should either show error or have graceful fallback
  99  |     const hasErrorUI = await errorMessage.isVisible().catch(() => false);
  100 |     const main = page.locator('main');
  101 |     const isDisplayed = await main.isVisible();
  102 |
  103 |     expect(hasErrorUI || isDisplayed).toBeTruthy();
  104 |   });
  105 |
  106 |   test('should retry failed requests with mock', async ({ page }) => {
  107 |     let requestCount = 0;
  108 |
  109 |     await page.route('**/api/tasks', (route) => {
  110 |       requestCount++;
  111 |
  112 |       // Fail first request, succeed second
  113 |       if (requestCount === 1) {
  114 |         route.fulfill({
  115 |           status: 500,
  116 |           body: JSON.stringify({ error: 'Server error' }),
  117 |         });
  118 |       } else {
  119 |         route.fulfill({
  120 |           status: 200,
  121 |           body: JSON.stringify({
  122 |             data: [
  123 |               {
  124 |                 id: 'task-1',
  125 |                 title: 'Task 1',
  126 |                 status: 'pending',
  127 |               },
  128 |             ],
  129 |           }),
  130 |         });
  131 |       }
  132 |     });
  133 |
  134 |     await page.goto('/task');
  135 |     await page.waitForLoadState('networkidle');
  136 |
  137 |     // Page should eventually load data despite initial failure
  138 |     expect(requestCount).toBeGreaterThanOrEqual(1);
  139 |   });
  140 |
  141 |   test('should simulate slow network for load testing', async ({ page }) => {
  142 |     const startTime = Date.now();
  143 |
  144 |     await page.route('**/api/tasks', async (route) => {
  145 |       // Simulate 2 second delay
  146 |       await new Promise((resolve) => setTimeout(resolve, 2000));
  147 |
  148 |       route.fulfill({
  149 |         status: 200,
  150 |         body: JSON.stringify({
  151 |           data: [
  152 |             {
  153 |               id: 'task-1',
  154 |               title: 'Task 1',
  155 |               status: 'pending',
  156 |             },
  157 |           ],
  158 |         }),
  159 |       });
  160 |     });
  161 |
  162 |     await page.goto('/task');
  163 |     await page.waitForLoadState('networkidle');
  164 |
  165 |     const loadTime = Date.now() - startTime;
  166 |
  167 |     // Should have taken at least 2 seconds due to mocked delay
> 168 |     expect(loadTime).toBeGreaterThanOrEqual(2000);
      |                      ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  169 |
  170 |     // Verify page is still usable
  171 |     const main = page.locator('main');
  172 |     await expect(main).toBeVisible();
  173 |   });
  174 | });
  175 |
  176 | test.describe('Multiple API endpoints mocking', () => {
  177 |   test('should mock multiple endpoints simultaneously', async ({ page }) => {
  178 |     // Mock tasks endpoint
  179 |     await page.route('**/api/tasks*', (route) => {
  180 |       route.fulfill({
  181 |         status: 200,
  182 |         body: JSON.stringify({
  183 |           data: [
  184 |             { id: 'task-1', title: 'Task 1', status: 'pending' },
  185 |             { id: 'task-2', title: 'Task 2', status: 'completed' },
  186 |           ],
  187 |         }),
  188 |       });
  189 |     });
  190 |
  191 |     // Mock users endpoint
  192 |     await page.route('**/api/users*', (route) => {
  193 |       route.fulfill({
  194 |         status: 200,
  195 |         body: JSON.stringify({
  196 |           data: [
  197 |             { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
  198 |             { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
  199 |           ],
  200 |         }),
  201 |       });
  202 |     });
  203 |
  204 |     // Mock orders endpoint
  205 |     await page.route('**/api/orders*', (route) => {
  206 |       route.fulfill({
  207 |         status: 200,
  208 |         body: JSON.stringify({
  209 |           data: [
  210 |             { id: 'order-1', status: 'pending', total: 9999 },
  211 |             { id: 'order-2', status: 'delivered', total: 5999 },
  212 |           ],
  213 |         }),
  214 |       });
  215 |     });
  216 |
  217 |     // Navigate to app
  218 |     await page.goto('/');
  219 |     await page.waitForLoadState('networkidle');
  220 |
  221 |     // All endpoints should have been called
  222 |     // Verify page loaded successfully
  223 |     await expect(page.locator('main')).toBeVisible();
  224 |   });
  225 | });
  226 |
```
