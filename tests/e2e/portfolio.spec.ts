import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("renders the portfolio and exposes the main navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Luis Gómez/);
  await expect(page.getByRole("heading", { level: 1, name: /Luis Gómez/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();

  for (const section of ["about", "technologies", "projects", "services", "contact"]) {
    await expect(page.locator(`#${section}`)).toHaveCount(1);
  }
});

test("mobile menu opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toBeVisible();

  const mobileNavigation = page.locator("#mobile-navigation");
  await mobileNavigation.getByRole("link", { name: "Proyectos" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(mobileNavigation).toHaveCount(0);
});

test("project cards keep their real links", async ({ page }) => {
  await page.goto("/#projects");

  await expect(page.getByRole("link", { name: /Calmell Group/ })).toHaveAttribute("href", "https://calmell.com/");
  await expect(page.getByRole("link", { name: /Camisetas Mundial/ })).toHaveAttribute(
    "href",
    "https://camisetasmundial.com/",
  );
  await expect(page.getByRole("link", { name: /Metabyts/ })).toHaveAttribute("href", "https://metabyts.com/");
  await expect(page.getByRole("link", { name: /WikipeIA/ })).toHaveAttribute("href", "https://wikipeia.es/");
});

test("contact form validates and reports success", async ({ page }) => {
  await page.goto("/#contact", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Enviar mensaje/ }).click();
  await expect(page.getByText("Introduce un email válido.")).toBeVisible();
  await expect(page.getByText("Cuéntame un poco más sobre tu idea.")).toBeVisible();

  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Mensaje enviado." }) });
  });

  await page.getByLabel("Email").fill("hola@example.com");
  await page.getByLabel("Asunto").fill("Nuevo proyecto web");
  await page.getByLabel("Mensaje").fill("Quiero comentar contigo un proyecto web moderno para mi empresa.");
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();
  await expect(page.getByRole("status")).toContainText("Mensaje enviado.");
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
});
