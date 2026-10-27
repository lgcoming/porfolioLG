import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.emulateMedia({
    reducedMotion: testInfo.project.name.startsWith("mobile") ? "reduce" : "no-preference",
  });
});

test("renders the complete portfolio and real project links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Luis Gómez");
  await expect(page.getByRole("heading", { name: "Full Stack Web Developer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sobre mí" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tecnologías" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Proyectos", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Servicios" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Contacto", exact: true })).toBeVisible();
  await expect(page.locator(".contact-lead")).toHaveText("¿Tienes una idea o proyecto en mente?");
  await expect(page.getByText("El envío se completa desde tu aplicación de correo.")).toHaveCount(0);
  await expect(page.locator(".site-header .brand-word")).toHaveCount(0);
  await expect(page.locator(".hero-sigil")).toHaveCount(0);
  await expect(page.locator(".hero-kicker")).not.toContainText("2026");
  await expect(page.locator(".contact-logo")).toHaveCount(0);
  await expect(page.locator(".section-constellation")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Contactar por WhatsApp" })).toHaveCount(1);
  await expect(page.getByText("+34 653 878 194")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Contactar por WhatsApp" })).toHaveAttribute(
    "href",
    "https://wa.me/34653878194",
  );

  await expect(page.getByRole("link", { name: "Ver proyecto Calmell Group" })).toHaveAttribute(
    "href",
    "https://calmell.com",
  );
  await expect(page.getByRole("link", { name: "Ver proyecto WikipeIA" })).toHaveAttribute(
    "href",
    "https://wikipeia.es",
  );
  await expect(page.getByRole("link", { name: "Ver proyecto Clínica Dental Castillo" })).toHaveAttribute(
    "href",
    "https://clinica-dental-castillo.vercel.app/",
  );
  await expect(page.getByRole("link", { name: "Ver proyecto VonLippe Design" })).toHaveAttribute(
    "href",
    "https://www.vonlippe.com/",
  );
  await expect(page.getByRole("link", { name: "Ver proyecto Daycar Homes" })).toHaveAttribute(
    "href",
    "https://daycarhomes.com/",
  );
  await expect(page.getByRole("link", { name: "Ver proyecto Colchonfy" })).toHaveAttribute(
    "href",
    "https://colchon-fy.com/",
  );
  await expect(page.locator(".project-link")).toHaveCount(8);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("typing, sizing, technology tape and project cards follow the visual brief", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Comprobación específica de escritorio");
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await page.waitForTimeout(760);
  const partialName = await page.locator(".typing-live").innerText();
  expect(partialName.length).toBeGreaterThan(0);
  expect(partialName).not.toBe("Luis Gómez");
  await expect(page.locator(".typing-live")).toHaveText("Luis Gómez", { timeout: 2_200 });

  const heroField = page.locator(".hero-field-layer");
  const heroFieldAtTop = await heroField.evaluate((element) => getComputedStyle(element).transform);
  await page.evaluate(() => window.scrollTo(0, 320));
  await page.waitForTimeout(260);
  const heroFieldAfterScroll = await heroField.evaluate((element) => getComputedStyle(element).transform);
  expect(heroFieldAfterScroll).not.toBe(heroFieldAtTop);

  const typography = await page.evaluate(() => ({
    nav: Number.parseFloat(getComputedStyle(document.querySelector(".nav-links a")!).fontSize),
    heading: Number.parseFloat(getComputedStyle(document.querySelector(".section-heading h2")!).fontSize),
    statement: Number.parseFloat(getComputedStyle(document.querySelector(".about-statement p")!).fontSize),
    contactLead: Number.parseFloat(getComputedStyle(document.querySelector(".contact-lead")!).fontSize),
    ctaFont: Number.parseFloat(getComputedStyle(document.querySelector(".primary-cta")!).fontSize),
    ctaWidth: Number.parseFloat(getComputedStyle(document.querySelector(".primary-cta")!).width),
  }));
  expect(typography.nav).toBe(16);
  expect(typography.heading).toBeLessThanOrEqual(70);
  expect(typography.statement).toBeLessThanOrEqual(45);
  expect(typography.contactLead).toBeLessThanOrEqual(50);
  expect(typography.ctaFont).toBe(13);
  expect(typography.ctaWidth).toBe(200);

  const primaryCta = page.locator(".primary-cta");
  const ctaBeforeHover = await primaryCta.evaluate((element) => ({
    fillTransform: getComputedStyle(element, "::before").transform,
    iconTransform: getComputedStyle(element.querySelector(".primary-cta-icon")!).transform,
  }));
  await primaryCta.hover();
  await page.waitForTimeout(420);
  const ctaAfterHover = await primaryCta.evaluate((element) => ({
    fillTransform: getComputedStyle(element, "::before").transform,
    iconTransform: getComputedStyle(element.querySelector(".primary-cta-icon")!).transform,
  }));
  expect(ctaAfterHover.fillTransform).not.toBe(ctaBeforeHover.fillTransform);
  expect(ctaAfterHover.iconTransform).toBe(ctaBeforeHover.iconTransform);

  await page.locator("#technologies").scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  await expect(page.locator(".technology-row")).toHaveCount(3);
  await expect(page.locator(".technology-item i")).toHaveCount(0);
  await expect(page.locator(".technology-icon")).toHaveCount(45);
  await expect(page.locator(".technology-row").first()).toHaveAttribute("tabindex", "0");
  const technologyColors = await page.locator(".technology-item").evaluateAll((items) => (
    [...new Set(items.map((item) => getComputedStyle(item).color))]
  ));
  expect(technologyColors).toEqual(["rgb(255, 255, 255)"]);

  const tapeBefore = await page.locator(".technology-track").evaluateAll((tracks) => tracks.map((track) => ({
    x: new DOMMatrix(getComputedStyle(track).transform).m41,
    width: (track.querySelector(".technology-group") as HTMLElement).offsetWidth,
  })));
  await page.mouse.wheel(0, 240);
  await page.waitForTimeout(250);
  const tapeAfter = await page.locator(".technology-track").evaluateAll((tracks) => tracks.map((track) => (
    new DOMMatrix(getComputedStyle(track).transform).m41
  )));
  const deltas = tapeAfter.map((after, index) => {
    const width = tapeBefore[index].width;
    let delta = after - tapeBefore[index].x;
    if (delta > width / 2) delta -= width;
    if (delta < -width / 2) delta += width;
    return delta;
  });
  expect(deltas[0]).toBeGreaterThan(20);
  expect(deltas[1]).toBeLessThan(-20);
  expect(deltas[2]).toBeGreaterThan(20);
  expect(new Set(deltas.map((delta) => Math.round(Math.abs(delta)))).size).toBe(3);

  const firstRow = page.locator(".technology-row").first();
  const dragBox = await firstRow.boundingBox();
  expect(dragBox).not.toBeNull();
  const dragStart = await page.locator(".technology-track").first().evaluate((track) => (
    new DOMMatrix(getComputedStyle(track).transform).m41
  ));
  await page.mouse.move(dragBox!.x + dragBox!.width / 2, dragBox!.y + dragBox!.height / 2);
  await page.mouse.down();
  await page.mouse.move(dragBox!.x + dragBox!.width / 2 + 120, dragBox!.y + dragBox!.height / 2, { steps: 8 });
  await page.mouse.up();
  const dragEnd = await page.locator(".technology-track").first().evaluate((track) => (
    new DOMMatrix(getComputedStyle(track).transform).m41
  ));
  expect(Math.abs(dragEnd - dragStart)).toBeGreaterThan(60);

  const scrolledTapeTransform = await page.locator(".technology-track").first().evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.mouse.wheel(0, -120);
  await page.waitForTimeout(180);
  const reversedTapeTransform = await page.locator(".technology-track").first().evaluate(
    (element) => getComputedStyle(element).transform,
  );
  expect(reversedTapeTransform).not.toBe(scrolledTapeTransform);

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  const cardHeights = await page.locator(".project-link").evaluateAll((cards) => (
    cards.map((card) => Math.round(Number.parseFloat(getComputedStyle(card).height)))
  ));
  expect(new Set(cardHeights).size).toBe(1);
  expect(cardHeights[0]).toBeLessThanOrEqual(600);
  const firstCard = page.locator(".project-link").first();
  const restingBorder = await firstCard.evaluate((element) => getComputedStyle(element).borderColor);
  await firstCard.hover();
  await page.waitForTimeout(340);
  const hoverBorder = await firstCard.evaluate((element) => getComputedStyle(element).borderColor);
  expect(hoverBorder).not.toBe(restingBorder);

  for (const project of ["Clínica Dental Castillo", "VonLippe Design", "Colchonfy"]) {
    const image = page.getByRole("link", { name: `Ver proyecto ${project}` }).locator(".project-image");
    await expect(image).toHaveCSS("background-color", "rgb(255, 255, 255)");
  }

  const calmellImage = page
    .getByRole("link", { name: "Ver proyecto Calmell Group" })
    .locator(".project-image");
  await expect(calmellImage).toHaveAttribute("data-padding", "compact");
  const calmellScale = await calmellImage.evaluate((element) => (
    new DOMMatrix(getComputedStyle(element).transform).a
  ));
  expect(calmellScale).toBeGreaterThanOrEqual(1.25);

  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
});

test("intermediate viewport switches to the compact responsive layout", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Comprobación específica de tablet");
  await page.setViewportSize({ width: 826, height: 666 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  await expect(page.locator(".brand img")).toBeVisible();
  await expect(page.locator(".brand-word")).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("desktop annotations own their responsive tokens", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Comprobación específica de escritorio");
  await page.setViewportSize({ width: 1395, height: 666 });
  await page.goto("/");

  const layout = await page.evaluate(() => {
    const sectionIds = ["about", "technologies", "projects", "services", "contact"];
    const sections = sectionIds.map((id) => {
      const section = document.getElementById(id)!;
      const heading = section.querySelector<HTMLElement>(".section-heading h2")!;
      const sectionBox = section.getBoundingClientRect();
      const style = getComputedStyle(section);
      return {
        id,
        paddingTop: Number.parseFloat(style.paddingTop),
        paddingBottom: Number.parseFloat(style.paddingBottom),
        headingOffset: heading.getBoundingClientRect().left - sectionBox.left,
      };
    });
    const header = document.querySelector<HTMLElement>(".site-header")!;
    const navLink = document.querySelector<HTMLElement>(".nav-links a")!;
    const brandLogo = document.querySelector<HTMLElement>(".brand img")!;
    const technologyIntro = document.querySelector<HTMLElement>(".technologies-intro p")!;
    const technologiesMore = document.querySelector<HTMLElement>(".technologies-more")!;
    const footerBrand = document.querySelector<HTMLElement>(".footer-brand")!;
    const hero = document.getElementById("hero")!;
    const technologies = document.getElementById("technologies")!;
    const projects = document.getElementById("projects")!;
    const contact = document.getElementById("contact")!;
    const heroContent = document.querySelector<HTMLElement>(".hero-content")!;
    const technologyMarquee = document.querySelector<HTMLElement>(".technology-marquee")!;
    const aboutStatement = document.querySelector<HTMLElement>(".about-statement p")!;
    const aboutCopies = [...document.querySelectorAll<HTMLElement>(".about-copy p")];
    const sectionMetas = [...document.querySelectorAll<HTMLElement>(".section-meta")];
    const heroRole = document.querySelector<HTMLElement>(".hero-content h2")!;
    const heroDescription = document.querySelector<HTMLElement>(".hero-description")!;
    const heroKicker = document.querySelector<HTMLElement>(".hero-kicker")!;
    const contactCopy = document.querySelector<HTMLElement>(".contact-copy")!;
    const contactDescription = document.querySelector<HTMLElement>(".contact-copy > p:not(.contact-lead)")!;
    return {
      sections,
      headerHeight: Number.parseFloat(getComputedStyle(header).height),
      navFontSize: Number.parseFloat(getComputedStyle(navLink).fontSize),
      logoWidth: Number.parseFloat(getComputedStyle(brandLogo).width),
      introWidth: technologyIntro.getBoundingClientRect().width,
      moreFontSize: Number.parseFloat(getComputedStyle(technologiesMore).fontSize),
      footerBrandFontSize: Number.parseFloat(getComputedStyle(footerBrand).fontSize),
      sectionBackgrounds: [hero, technologies, projects, contact].map(
        (section) => getComputedStyle(section).backgroundColor,
      ),
      technologyPaddingTop: Number.parseFloat(getComputedStyle(technologyMarquee).paddingTop),
      technologyPaddingBottom: Number.parseFloat(getComputedStyle(technologyMarquee).paddingBottom),
      technologyRowGap: Number.parseFloat(getComputedStyle(technologyMarquee).rowGap),
      heroRowGap: Number.parseFloat(getComputedStyle(heroContent).rowGap),
      aboutStatementFontSize: Number.parseFloat(getComputedStyle(aboutStatement).fontSize),
      aboutCopyFontSizes: aboutCopies.map((copy) => Number.parseFloat(getComputedStyle(copy).fontSize)),
      sectionMetaFontSizes: sectionMetas.map((meta) => Number.parseFloat(getComputedStyle(meta).fontSize)),
      heroRoleFontSize: Number.parseFloat(getComputedStyle(heroRole).fontSize),
      heroRoleFontWeight: Number.parseFloat(getComputedStyle(heroRole).fontWeight),
      heroDescriptionFontSize: Number.parseFloat(getComputedStyle(heroDescription).fontSize),
      heroKickerFontSize: Number.parseFloat(getComputedStyle(heroKicker).fontSize),
      contactCopyPaddingTop: Number.parseFloat(getComputedStyle(contactCopy).paddingTop),
      contactDescriptionMarginTop: Number.parseFloat(getComputedStyle(contactDescription).marginTop),
      contactDescriptionFontSize: Number.parseFloat(getComputedStyle(contactDescription).fontSize),
      contactMaxWidth: getComputedStyle(contact).maxWidth,
      contactWidth: contact.getBoundingClientRect().width,
      projectsMaxWidth: getComputedStyle(projects).maxWidth,
      projectsWidth: projects.getBoundingClientRect().width,
      viewportWidth: window.innerWidth,
      constellationPlacement: [
        technologies.querySelectorAll(".section-constellation").length,
        projects.querySelectorAll(".section-constellation").length,
        contact.querySelectorAll(".section-constellation").length,
      ],
    };
  });

  for (const section of layout.sections) {
    const expectedPadding = section.id === "technologies" ? 100 : 70;
    expect(section.paddingTop).toBe(expectedPadding);
    expect(section.paddingBottom).toBe(expectedPadding);
    expect(section.headingOffset).toBeLessThan(90);
  }
  expect(layout.headerHeight).toBe(96);
  expect(layout.navFontSize).toBe(16);
  expect(layout.logoWidth).toBe(64);
  expect(layout.introWidth).toBeGreaterThan(1_100);
  expect(layout.moreFontSize).toBe(15);
  expect(layout.footerBrandFontSize).toBeGreaterThan(0);
  expect(layout.sectionBackgrounds).toEqual([
    "rgb(2, 2, 2)",
    "rgb(0, 0, 0)",
    "rgb(0, 0, 0)",
    "rgb(6, 6, 6)",
  ]);
  expect(layout.technologyPaddingTop).toBe(75);
  expect(layout.technologyPaddingBottom).toBe(75);
  expect(layout.technologyRowGap).toBeGreaterThanOrEqual(72);
  expect(layout.heroRowGap).toBe(10);
  expect(layout.aboutStatementFontSize).toBe(40);
  expect(layout.aboutCopyFontSizes).toEqual([17, 17]);
  expect(new Set(layout.sectionMetaFontSizes)).toEqual(new Set([14]));
  expect(layout.heroRoleFontSize).toBe(25);
  expect(layout.heroRoleFontWeight).toBe(900);
  expect(layout.heroDescriptionFontSize).toBe(18);
  expect(layout.heroKickerFontSize).toBe(14);
  expect(layout.contactCopyPaddingTop).toBe(15);
  expect(layout.contactDescriptionMarginTop).toBe(32);
  expect(layout.contactDescriptionFontSize).toBe(15);
  expect(layout.contactMaxWidth).toBe("none");
  expect(layout.contactWidth).toBe(layout.viewportWidth);
  expect(layout.projectsMaxWidth).toBe("none");
  expect(layout.projectsWidth).toBe(layout.viewportWidth);
  expect(layout.constellationPlacement).toEqual([0, 0, 1]);
});

test("mobile navigation and contact validation are usable", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Comprobación específica de móvil");
  await page.goto("/");
  await page.waitForTimeout(700);
  const menu = page.getByRole("button", { name: "Abrir menú" });
  await expect(menu).toBeVisible();
  await expect(menu.locator(".menu-toggle-glyph")).toBeVisible();
  await expect(menu.locator(".menu-toggle-line")).toHaveCount(3);
  await expect(page.locator(".brand img")).toHaveCSS("width", "42px");
  const menuMarkerContent = await menu.evaluate((element) => (
    getComputedStyle(element, "::after").content
  ));
  expect(["none", "normal"]).toContain(menuMarkerContent);
  await expect(page.locator(".primary-cta")).toHaveCSS("width", "225px");
  await expect(page.locator(".primary-cta")).toHaveCSS("font-size", "13px");
  await menu.click();
  await expect(page.locator('.mobile-menu a[href="#projects"]')).toBeVisible();
  await page.locator('.mobile-menu a[href="#contact"]').click();

  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByText("Introduce un email válido.")).toBeVisible();
  await expect(page.getByText("El asunto necesita al menos 3 caracteres.")).toBeVisible();

  const calmellImage = page
    .getByRole("link", { name: "Ver proyecto Calmell Group" })
    .locator(".project-image");
  await expect(calmellImage).toHaveAttribute("data-fit", "contain");
  await expect(calmellImage).toHaveAttribute("data-padding", "compact");
  await expect(calmellImage).toHaveCSS("object-fit", "contain");

  for (const project of ["Clínica Dental Castillo", "Daycar Homes"]) {
    const image = page.getByRole("link", { name: `Ver proyecto ${project}` }).locator(".project-image");
    const horizontalPadding = await image.evaluate((element) => (
      Number.parseFloat(getComputedStyle(element).paddingLeft)
    ));
    expect(horizontalPadding).toBeGreaterThanOrEqual(50);
  }
});

test("contact form posts safely to the email endpoint and confirms delivery", async ({ page }) => {
  let requestBody: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    requestBody = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Mensaje enviado. Te responderé en menos de 48 horas." }),
    });
  });

  await page.goto("/#contact");
  const submitButton = page.getByRole("button", { name: "Enviar mensaje" });
  await expect(submitButton).toHaveCSS("cursor", "pointer");
  await page.getByRole("textbox", { name: "Email" }).fill("cliente@example.com");
  await page.getByLabel("Asunto").fill("Nueva web profesional");
  await page.getByLabel("Mensaje").fill("Me gustaría hablar sobre un nuevo proyecto web.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(page.getByRole("status")).toHaveText(
    "Mensaje enviado. Te responderé en menos de 48 horas.",
  );
  expect(requestBody).toMatchObject({
    email: "cliente@example.com",
    subject: "Nueva web profesional",
    message: "Me gustaría hablar sobre un nuevo proyecto web.",
    website: "",
  });
  expect(requestBody?.startedAt).toEqual(expect.any(Number));
  await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue("");
});

test("back to top appears after 30 percent and returns to the hero", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });

  const backToTop = page.getByRole("button", { name: "Volver arriba" });
  await expect(backToTop).toHaveCount(0);
  await page.evaluate(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, maxScroll * 0.36);
  });
  await expect(backToTop).toBeVisible();
  await backToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
  await expect(backToTop).toHaveCount(0);
});

test("contact endpoint rejects invalid payloads before email delivery", async ({ request }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Una comprobación del endpoint es suficiente");
  const response = await request.post("/api/contact", {
    data: {
      email: "incorrecto",
      subject: "x",
      message: "corto",
      website: "",
      startedAt: Date.now() - 2_000,
    },
  });

  expect(response.status()).toBe(400);
});

test("las animaciones se mantienen activas aunque el navegador solicite reducir movimiento", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".typing-live")).toHaveText("Luis Gómez", { timeout: 2_500 });

  await page.locator("#technologies").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const tapeBefore = await page.locator(".technology-track").first().evaluate(
    (element) => {
      const transform = getComputedStyle(element).transform;
      return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    },
  );
  await page.evaluate(() => window.scrollBy(0, 280));
  await page.waitForTimeout(250);
  const tapeAfter = await page.locator(".technology-track").first().evaluate(
    (element) => {
      const transform = getComputedStyle(element).transform;
      return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
    },
  );
  expect(tapeAfter).not.toBeCloseTo(tapeBefore, 1);
  expect(pageErrors).toEqual([]);
});

test("scroll-linked motion responds in both directions", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Comprobación específica de escritorio");
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await page.waitForTimeout(700);
  const statement = page.locator(".about-statement");
  const targetTop = await statement.evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  const entryY = await page.evaluate((top) => Math.max(0, top - window.innerHeight + 24), targetTop);
  await page.evaluate((y) => window.scrollTo(0, y), entryY);
  await page.waitForTimeout(400);
  const entryTransform = await statement.evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return { x: matrix.m41, y: matrix.m42 };
  });

  await page.evaluate((top) => window.scrollTo(0, top - window.innerHeight * 0.38), targetTop);
  await page.waitForTimeout(600);
  const downTransform = await statement.evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return { x: matrix.m41, y: matrix.m42 };
  });

  await page.evaluate((y) => window.scrollTo(0, y), entryY);
  await page.waitForTimeout(600);
  const upTransform = await statement.evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return { x: matrix.m41, y: matrix.m42 };
  });
  expect(Math.abs(downTransform.x - entryTransform.x)).toBeGreaterThan(8);
  expect(Math.abs(upTransform.x - entryTransform.x)).toBeLessThan(
    Math.abs(downTransform.x - entryTransform.x),
  );
  expect(Math.abs(upTransform.y - entryTransform.y)).toBeLessThanOrEqual(
    Math.abs(downTransform.y - entryTransform.y),
  );
});

test("english version is served at /en with translated content", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "About me" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();
  await expect(page.locator(".about-statement .statement-security")).toHaveText("security");
  await expect(page.locator(".about-statement .statement-ai")).toHaveText("artificial intelligence");
  await expect(page.getByRole("link", { name: "View project Calmell Group" })).toHaveAttribute(
    "href",
    "https://calmell.com",
  );
  await expect(page.locator(".project-link")).toHaveCount(8);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en$/);
});

test("spanish statement highlights code, AI and security", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator(".about-statement em")).toHaveText("código");
  await expect(page.locator(".about-statement .statement-ai")).toHaveText("inteligencia artificial");
  const security = page.locator(".about-statement .statement-security");
  await expect(security).toHaveText("seguridad");
  await expect(security).toHaveCSS("background-clip", "text");
  await expect(page.locator(".about-copy p").first()).toContainText(
    "soy un desarrollador web full stack especializado en crear aplicaciones modernas",
  );
});

test("language switch keeps the reading position", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 900);
  });
  await page.locator(".lang-switch a[hreflang='en']").click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".lang-switch a[data-active='true']")).toHaveText("EN");
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(800);

  await page.locator(".lang-switch a[hreflang='es']").click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("unknown locales return 404 and /es redirects to the root", async ({ request }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"), "Una comprobación de rutas es suficiente");
  expect((await request.get("/fr")).status()).toBe(404);
  const redirect = await request.get("/es", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("/");
});
