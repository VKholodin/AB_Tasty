# AB Tasty 

This repository contains automated tests for the login functionality and other related features of the AB Tasty application using [Playwright](https://playwright.dev/).

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)

---

## Project Overview

This project automates the following scenarios for the AB Tasty application:

1. Login with valid credentials.
2. Login with invalid credentials.
3. Multi-factor authentication (MFA) workflows.
4. SSO login functionality.
5. Captcha handling after failed login attempts.
6. Responsiveness and UI checks.

The tests are implemented using the Playwright framework for reliable and fast browser automation.

---

## Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/) (v16 or higher recommended).
- Install Git.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/VKholodin/AB_Tasty.git
   cd AB_Tasty
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure Playwright is installed along with its browsers:

   ```bash
   npx playwright install
   ```

---

## Running Tests

To execute all tests, use the following command:

```bash
npx playwright test
```

To run tests in UI mode for better debugging:

```bash
npx playwright test --ui
```

---

## Project Structure

```
AB_Tasty/
├── tests/                  # Test files
│   ├── login_test.spec.js  # Tests for login functionality
│   ├── mfa_test.spec.js    # MFA tests
│   └── sso_test.spec.js    # SSO tests
├── .github/workflows/      # CI configuration
│   └── playwright.yml      # GitHub Actions workflow file
├── playwright.config.js    # Playwright configuration
└── package.json            # Dependencies and scripts
```

