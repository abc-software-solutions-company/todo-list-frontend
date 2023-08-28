import {test, expect} from '@playwright/test';

const url = 'http://localhost:3000';

const googleBtnId = 'google-btn';
const modalThirdPartyLogin = 'modal-third-party-login';

test.describe('Login page', () => {
  test('Login without account', async ({page}) => {
    await page.goto(url);

    const newUser = page.getByPlaceholder('Enter your name');
    const loginBtn = page.getByRole('button', {name: /LOGIN/});

    // create new user
    await newUser.fill('Phuoc ne');
    await loginBtn.click({button: 'left'});

    await expect(page.getByTestId('lobby-title')).toHaveText('TO-DO LIST');
  });

  test('Show third party login form', async ({page}) => {
    await page.goto(url);

    // Show login form
    const googleBtn = page.getByTestId(googleBtnId);
    await googleBtn.click({button: 'left'});
    expect(page.getByTestId(modalThirdPartyLogin)).toBeDefined();
  });
});
