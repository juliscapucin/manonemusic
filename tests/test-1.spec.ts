import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
   await page.goto("http://localhost:3000/contact");
   await page.getByRole("button", { name: "This site uses cookies" }).click();
   await page.getByRole("button", { name: "close menu" }).click();
   await page.getByRole("button", { name: "Film" }).click();
   await page.getByRole("button", { name: "Projects" }).click();
   await page.getByRole("button", { name: "MAN/ONE MUSIC" }).click();
});
