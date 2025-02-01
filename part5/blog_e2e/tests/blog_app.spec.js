const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'test',
                password: 'test',
                name: 'Test User'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Login')
    await expect(locator).toBeVisible()
    await page.getByRole('button', { name: 'Log in' })
    await expect(page.getByText('blog app by elias peltokangas')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'test', 'test')

            await expect(page.getByText('Logged in as Test User')).toBeVisible()
        })
        
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'test', 'wrong')

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText('Logged in as Test User')).not.toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'test', 'test')
        })
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'PW test title', 'PW test author', 'PW test url')

            await expect(page.getByText('PW test title PW test author')).toBeVisible()
        })
        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'PW test title', 'PW test author', 'PW test url')
            })
            test('it can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'View' }).click()
                await page.getByRole('button', { name: 'Like' }).click()
                await expect(page.getByText('1 Likes')).toBeVisible()
            })
            test('it can be deleted by the user who created it', async ({ page }) => {
                await page.getByRole('button', { name: 'View' }).click()
                page.on('dialog', dialog => dialog.accept());
                await page.getByRole('button', { name: 'Remove' }).click()
                await expect(page.getByText('PW test title PW test author')).not.toBeVisible()
            })
            test('it cannot be deleted by another user', async ({ page, request }) => {
                await request.post('/api/users', {
                    data: {
                        username: 'test2',
                        password: 'test2',
                        name: 'Test User 2'
                    }
                })
                await page.getByRole('button', { name: 'Log out' }).click()
                await loginWith(page, 'test2', 'test2')
                await page.getByRole('button', { name: 'View' }).click()
                await expect(page.locator('.remove')).not.toBeVisible()
            })
        })
        describe('and multiple blogs exist', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'PW test title 1', 'PW test author 1', 'PW test url 1')
                await createBlog(page, 'PW test title 2', 'PW test author 2', 'PW test url 2')
                await createBlog(page, 'PW test title 3', 'PW test author 3', 'PW test url 3')
            })
            test('they are ordered by likes', async ({ page }) => {
                const firstBlog = page.locator('.blog').filter({ hasText: 'PW test title 1 PW test author 1' })
                const secondBlog = page.locator('.blog').filter({ hasText: 'PW test title 2 PW test author 2' })
                const thirdBlog = page.locator('.blog').filter({ hasText: 'PW test title 3 PW test author 3' })

                await firstBlog.getByRole('button', { name: 'View' }).click()
                await secondBlog.getByRole('button', { name: 'View' }).click()
                await thirdBlog.getByRole('button', { name: 'View' }).click()

                await secondBlog.getByRole('button', { name: 'Like' }).click()
                await secondBlog.getByRole('button', { name: 'Like' }).click()
                await secondBlog.getByRole('button', { name: 'Like' }).click()
                await thirdBlog.getByRole('button', { name: 'Like' }).click()
                await thirdBlog.getByRole('button', { name: 'Like' }).click()

                await expect(page.locator('.blog').first()).toContainText('PW test title 2 PW test author 2')
                await expect(page.locator('.blog').nth(2)).toContainText('PW test title 3 PW test author 3')
                await expect(page.locator('.blog').nth(4)).toContainText('PW test title 1 PW test author 1')
            })
        })
    })
})