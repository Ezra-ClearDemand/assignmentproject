import { test, expect } from "@playwright/test";
import { contributor, guest, projectmanager } from "../common/user_details";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test("organisation-user-project @organization", async ({ page }) => {
  test.setTimeout(240000);
  const { listMenu, userManagementPage, projectDetails } =
    initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  await userManagementPage.navigateToUsers();
  await userManagementPage.searchUser().click();
  await userManagementPage.searchUser().fill(projectmanager.name);
  await page.getByText("kyro-Pm").click();
  await page.getByRole("button", { name: "Add" }).click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill("private project for timesheet 3");
  await page
    .getByRole("row", {
      name: "Select row private project for timesheet 3 kyro-orgadmin kyro-orgadmin - Active",
    })
    .getByLabel("Select row")
    .check();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(
    page.getByText("User added successfully to 1 project"),
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page
    .locator(
      ".layout-page-content > div > div > div > div > div > div > .MuiBox-root",
    )
    .click();
  await userManagementPage.searchUser().click();
  await userManagementPage.searchUser().fill(contributor.name);
  await page.getByText("kyro-contributor").click();
  await page.getByRole("button", { name: "Add" }).click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill("private project for timesheet 3");
  await page
    .getByRole("row", {
      name: "Select row private project for timesheet 3 kyro-orgadmin kyro-orgadmin - Active",
    })
    .getByLabel("Select row")
    .check();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(
    page.getByText("User added successfully to 1 project"),
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page
    .locator(
      ".layout-page-content > div > div > div > div > div > div > .MuiBox-root",
    )
    .click();
  await userManagementPage.searchUser().click();
  await userManagementPage.searchUser().fill(guest.name);
  await page.getByText("kyro-guest").click();
  await page.getByRole("button", { name: "Add" }).click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill("private project for timesheet 3");
  await page
    .getByRole("row", {
      name: "Select row private project for timesheet 3 kyro-orgadmin kyro-orgadmin - Active",
    })
    .getByLabel("Select row")
    .check();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(
    page.getByText("User added successfully to 1 project"),
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Home" }).click();
  await page.getByRole("link", { name: "Projects" }).click();
  await page.getByLabel("svg-button").nth(4).click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill("private project for timesheet 3");
  await page
    .getByRole("heading", { name: "private project for timesheet 3" })
    .click();
  await page.waitForTimeout(3000);
  await page.getByText("Members", { exact: true }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole("row", { name: "kyro-Pm dinesh.r+776868@kyro." })
    .getByLabel("svg-button")
    .click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByText("User removed successfully")).toBeVisible();
  await page
    .getByRole("row", { name: "kyro-contributor dinesh.r+" })
    .getByLabel("svg-button")
    .click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByText("User removed successfully")).toBeVisible();
  await page
    .getByRole("cell", { name: "svg-button" })
    .getByLabel("svg-button")
    .click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByText("User removed successfully")).toBeVisible();
});
