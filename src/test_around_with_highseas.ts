import { writeFileSync } from "fs";
import { chromium } from "playwright";
const browser = await chromium.launch();
const context = await browser.newContext();

context.addCookies([
    {
      name: "hs-session",
      path: "/",
      value: (process.env.DEV_HIGH_SEAS_TOKEN!),
      domain: "highseas.hackclub.com",
    },
  ]);
//   console.log(context.cookies())
context.cookies().then(console.log)
const page = await context.newPage();
  await page.goto("https://highseas.hackclub.com/shop", {
    waitUntil: "networkidle",
  });
  await page.goto("https://highseas.hackclub.com/signpost", {
    waitUntil: "networkidle",
  })
  await page.goto("https://highseas.hackclub.com/shipyard", {
    waitUntil: "networkidle",
  })
const storage = await context.storageState();
const localStorage = storage.origins[0].localStorage;
console.log(localStorage)
writeFileSync("localStorage.json", JSON.stringify(localStorage, null, 2))
writeFileSync("cookies.json", JSON.stringify(await context.cookies(), null, 2))
await browser.close();