import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app2.abtasty.com/login');
  });
 
test.describe('AB Tasty Login Tests', () => {
    
    test('User can log in with valid credentials', async ({ page }) => {
        await page.fill('#email', 'user@abtasty.com');
        await page.fill('#password', 'Valid123');
        await page.click('#signInButton');
        await expect(page).toHaveURL(/dashboard/);
    });
 
    test('User sees error for invalid credentials', async ({ page }) => {
        await page.fill('#email', 'invalid@abtasty.com');
        await page.fill('#password', 'WrongPass');
        await page.click('#signInButton');
        await expect(page.locator('#loginErrorMessage')).toHaveText('Please enter a valid email or password');
    });
 
    test('SSO user is redirected to SSO page', async ({ page }) => {
        await page.click('button[data-testid="ssoLoginButton"]');
        await expect(page).toHaveURL(/ssologin/);
        await page.fill('#email', 'invalid@abtasty.com');
        await page.click('button[type="submit"]');
        await expect(page.locator('[data-testid="data-testid="emailErrorMessage""]')).toHaveText('Please enter a valid email');
    });

    test('Back to Login page leads to login main page', async ({ page }) => {
        await page.click('button[data-testid="ssoLoginButton"]');
        await expect(page).toHaveURL(/ssologin/);
        await page.fill('#email', 'invalid@abtasty.com');
        await page.click('button[type="submit"]');
        await expect(page.locator('a[href="/login"]')).toHaveText('Go back to Login page');
        await page.click('a[href="/login"]:has-text("Go back to Login page")');
        await expect(page.title()).resolves.toBe('Login');
    });
 
    test('Captcha appears after 3 failed login attempts', async ({ page }) => {
 
        for (let i = 0; i < 3; i++) {
            await page.fill('#email', 'user@abtasty.com');
            await page.fill('#password', 'WrongPass');
            await page.click('#signInButton');
        }
 
        await expect(page.locator('iframe[title="reCAPTCHA"]')).toBeVisible();
    });
 
    test('User cannot log in with incorrect MFA', async ({ page }) => {
        await page.fill('#email', 'user@abtasty.com');
        await page.fill('#password', 'Valid123');
        await page.click('button:has-text("Sign In")');
 
        // Simulate MFA step
        await page.fill('input[name="mfa-code"]', '777777');
        await page.click('button:has-text("Ok")');
 
        await expect(page.locator('.error-message')).toHaveText('Oops! The code you have entered is incorrect. Please try again.');
    });
 
    test('MFA expires after 1 minute', async ({ page }) => {
        await page.fill('#email', 'user@abtasty.com');
        await page.fill('#password', 'Valid123');
        await page.click('button:has-text("Sign In")');
 
        // Wait for MFA to expire
        await page.waitForTimeout(60000);
 
        await page.fill('input[name="mfa-code"]', '123456');
        await page.click('button:has-text("Ok")');
 
        await expect(page.locator('.error-message')).toHaveText('MFA code has expired, please request a new one.');
    });
 
    test('User can resend MFA code', async ({ page }) => {
        await page.fill('#email', 'user@abtasty.com');
        await page.fill('#password', 'Valid123');
        await page.click('button:has-text("Sign In")');
 
        await page.click('text=Renvoyer le code');
        await expect(page.locator('.confirmation-message')).toHaveText('A new MFA code has been sent to your phone.');
    });

 
});