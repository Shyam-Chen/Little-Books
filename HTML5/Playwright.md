# Playwright

Element text

```js
const title = '#title';
const titleText = await page.$eval(title, (el) => el.textContent);
expect(titleText).toMatch('Title');
```

At the same URL

```js
await page.click('<BTN_SELECTOR>');
await page.waitForSelector('<STH_SELECTOR>');
```

At a different URL

```js
await Promise.all([page.click('<BTN_SELECTOR>'), page.waitForNavigation()]);
```
