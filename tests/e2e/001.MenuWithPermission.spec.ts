import { expect, test } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test.describe("check the org admin Menu items", () => {
  test.use({
    storageState: "orgadmin.json",
  });

  test.skip("Checking The menu For Org Admin @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).toBeVisible();
    expect(listMenu.forms()).toBeVisible();
    expect(listMenu.reports()).toBeVisible();
    expect(listMenu.timesheets()).toBeVisible();
    expect(listMenu.analyseMenu()).toBeVisible();
    await listMenu.analyseMenu().click();
    expect(listMenu.copilot()).toBeVisible();
    expect(listMenu.dashboard()).toBeVisible();
    expect(listMenu.adminMenu()).toBeVisible();
    await listMenu.adminMenu().click();
    expect(listMenu.organization()).toBeVisible();
    expect(listMenu.clients()).toBeVisible();
    expect(listMenu.users()).toBeVisible();
    expect(listMenu.customFields()).toBeVisible();
    expect(listMenu.integrateMenu()).toBeVisible();
    await listMenu.integrateMenu().click();
    await page.waitForTimeout(3000);
    expect(listMenu.apps()).toBeVisible();
    expect(listMenu.logTimeButton()).toBeVisible();
    expect(listMenu.expenseButton()).toBeVisible();
    expect(listMenu.createProjectButton()).toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the PM Menu items", () => {
  test.use({
    storageState: "pm.json",
  });

  test.skip("Checking The menu For PM @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).toBeVisible();
    expect(listMenu.forms()).toBeVisible();
    expect(listMenu.reports()).toBeVisible();
    expect(listMenu.timesheets()).toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).toBeVisible();
    expect(listMenu.expenseButton()).toBeVisible();
    expect(listMenu.createProjectButton()).toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the contributor Menu items", () => {
  test.use({
    storageState: "contributor.json",
  });

  test.skip("Checking The menu For contributor @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).not.toBeVisible();
    expect(listMenu.forms()).toBeVisible();
    expect(listMenu.reports()).toBeVisible();
    expect(listMenu.timesheets()).toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).toBeVisible();
    expect(listMenu.expenseButton()).toBeVisible();
    expect(listMenu.createProjectButton()).not.toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the guest Menu items", () => {
  test.use({
    storageState: "guest.json",
  });

  test.skip("Checking The menu For guest @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).not.toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).not.toBeVisible();
    expect(listMenu.expenseButton()).not.toBeVisible();
    expect(listMenu.createProjectButton()).not.toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the tsadmin Menu items", () => {
  test.use({
    storageState: "tsadmin.json",
  });

  test.skip("Checking The menu For tsadmin @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).not.toBeVisible();
    expect(listMenu.forms()).not.toBeVisible();
    expect(listMenu.reports()).not.toBeVisible();
    expect(listMenu.timesheets()).toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).toBeVisible();
    expect(listMenu.expenseButton()).toBeVisible();
    expect(listMenu.createProjectButton()).not.toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the tsapprover Menu items", () => {
  test.use({
    storageState: "tsapprover.json",
  });

  test.skip("Checking The menu For tsapprover @tabs", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).not.toBeVisible();
    expect(listMenu.forms()).not.toBeVisible();
    expect(listMenu.reports()).not.toBeVisible();
    expect(listMenu.timesheets()).toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).toBeVisible();
    expect(listMenu.expenseButton()).toBeVisible();
    expect(listMenu.createProjectButton()).not.toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});

test.describe("check the formReportApprover Menu items", () => {
  test.use({
    storageState: "formReportApprover.json",
  });

  test.skip("Checking The menu For formReportApprover @tabs", async ({
    page,
  }) => {
    const { listMenu } = initPageManager(page);
    await page.goto("/");
    expect(listMenu.homeMenu()).toBeVisible();
    await page.waitForTimeout(3000);
    expect(listMenu.projects()).toBeVisible();
    expect(listMenu.tasks()).toBeVisible();
    expect(listMenu.manageMenu()).toBeVisible();
    await listMenu.manageMenu().click();
    expect(listMenu.documents()).not.toBeVisible();
    expect(listMenu.forms()).toBeVisible();
    expect(listMenu.reports()).toBeVisible();
    expect(listMenu.timesheets()).not.toBeVisible();
    expect(listMenu.analyseMenu()).not.toBeVisible();
    expect(listMenu.organization()).not.toBeVisible();
    expect(listMenu.integrateMenu()).not.toBeVisible();
    expect(listMenu.logTimeButton()).not.toBeVisible();
    expect(listMenu.expenseButton()).not.toBeVisible();
    expect(listMenu.createProjectButton()).not.toBeVisible();
    expect(listMenu.notificationButton()).toBeVisible();
    expect(listMenu.profileButton()).toBeVisible();
  });
});
