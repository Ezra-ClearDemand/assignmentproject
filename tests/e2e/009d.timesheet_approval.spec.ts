import { test, expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

let timesheetId = "";
test.describe.configure({ mode: "serial" });
test("Submit the timesheet by org admin @timesheet", async ({ page }) => {
  const { timesheets, listMenu } = initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  const responseforuser = page.waitForResponse(
    `${process.env.API_URL}/users?is_kyro_user=true&name=&user_type=Internal%2CClient&offset=0&limit=25`,
  );
  await listMenu.users().click();
  const response2 = await (await responseforuser).json();
  let userid = "";
  userid = response2.users.find(
    (user: { display_name: string }) => user.display_name === "kyro-orgadmin",
  ).id;
  console.log(userid);
  const combinedValue = `${process.env.API_URL}/timesheets?user_id=${userid}&sort_by=from_date&order=asc&limit=1000`;
  console.log(combinedValue);
  await listMenu.manageMenu().click();
  await listMenu.timesheets().click();
  await timesheets.searchTimesheet().click();
  await timesheets.searchTimesheet().fill("29");
  const responsetimesheet = page.waitForResponse(combinedValue);
  await page.getByText("29 Jul 24 - 04 Aug 24", { exact: true }).click();
  const responseforid = await (await responsetimesheet).json();
  console.log(responseforid);
  timesheetId = await responseforid.timesheets.find(
    (timesheet: { name: string }) =>
      timesheet.name === "29-Jul-2024 to 04-Aug-2024",
  ).id;
  console.log(timesheetId);
  await timesheets.resubmitTimesheet().click();
  expect(page.getByLabel("kyro-tsadmin")).toBeVisible();
  await timesheets.notes().click();
  await timesheets.notes().fill("submitting the timesheet for approval");
  const responsefortimesheet = page.waitForResponse(
    (response) =>
      response.url() === `${process.env.API_URL}/timesheets/${timesheetId}` &&
      response.status() === 200,
  );
  await timesheets.resubmitTimesheet().click();
  const response = await responsefortimesheet;
  expect(
    page.getByRole("heading", { name: "Timesheet Submitted Successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
});

test.describe("Request correction by ts-admin", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Request correction by tsadmin @timesheet", async ({ page }) => {
    const { timesheets, listMenu } = initPageManager(page);
    await page.goto("/");
    await listMenu.manageMenu().click();
    await listMenu.timesheets().click();
    await timesheets.teamTimesheet().click();
    await page.waitForTimeout(3000);
    await page
      .locator(".MuiBox-root > .MuiFormControl-root > .MuiInputBase-root")
      .click();
    await page
      .getByRole("option", { name: "29 Jul 24 - 04 Aug 24", exact: true })
      .click();
    await timesheets.approvedTimesheet().click();
    await timesheets.teamTimesheet().click();
    await timesheets.userDropdown().click();
    await page.getByRole("option", { name: "kyro-orgadmin" }).click();
    await page
      .getByRole("cell", { name: "Jul 24 - 04 Aug 24 svg-button" })
      .locator("span")
      .click();
    await timesheets.correctionRequested().click();
    await timesheets.addButton().click();
    await timesheets.addButton().fill("there is issue on the logged time");
    await timesheets.sendButton().click();
    await page.waitForTimeout(5000);
    expect(
      page.getByRole("heading", { name: "Correction Request Sent" }),
    ).toBeVisible();
    await page.waitForTimeout(3000);
  });
});

test("Submit the timesheet again by org admin @timesheet", async ({ page }) => {
  const { timesheets, listMenu } = initPageManager(page);
  await page.goto("/");
  await listMenu.manageMenu().click();
  await listMenu.timesheets().click();
  await timesheets.searchTimesheet().click();
  await timesheets.searchTimesheet().fill("29");
  await page.getByText("29 Jul 24 - 04 Aug 24", { exact: true }).click();
  await page.getByRole("button", { name: "Resubmit Timesheet" }).click();
  await timesheets.notes().click();
  await timesheets.notes().fill("changed the log time on the timesheet");
  const responsefortimesheet = page.waitForResponse(
    (response) =>
      response.url() === `${process.env.API_URL}/timesheets/${timesheetId}` &&
      response.status() === 200,
  );
  await timesheets.resubmitTimesheet().click();
  const response = await responsefortimesheet;
  await page.waitForTimeout(3000);
  expect(
    page.getByRole("heading", { name: "Timesheet Submitted Successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
});

test.describe("Appoved the timesheet by tsadmin", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Appoved the timesheet by pm @timesheet", async ({ page }) => {
    const { timesheets, listMenu } = initPageManager(page);
    await page.goto("/");
    await listMenu.manageMenu().click();
    await listMenu.timesheets().click();
    await timesheets.teamTimesheet().click();
    await page
      .locator(".MuiBox-root > .MuiFormControl-root > .MuiInputBase-root")
      .click();
    await page.getByRole("option", { name: "29 Jul 24 - 04 Aug 24" }).click();
    await timesheets.approvedTimesheet().click();
    await timesheets.teamTimesheet().click();
    await timesheets.userDropdown().click();
    await page.getByRole("option", { name: "kyro-orgadmin" }).click();
    await page
      .getByRole("cell", { name: "Jul 24 - 04 Aug 24 svg-button" })
      .locator("span")
      .click();
    const responsefortimesheet = page.waitForResponse(
      (response) =>
        response.url() === `${process.env.API_URL}/timesheets/${timesheetId}` &&
        response.status() === 200,
    );
    await timesheets.approvedTimesheetButton().click();
    const response = await responsefortimesheet;
    await page.waitForTimeout(3000);
    expect(
      page.getByRole("heading", { name: "Timesheet Approved Successfully" }),
    ).toBeVisible();
    await page.waitForTimeout(3000);
  });
});

test.describe("Unlock the approved timesheet by tsadmin", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Unlock the approved timesheet by pm @timesheet", async ({ page }) => {
    const { timesheets, listMenu } = initPageManager(page);
    await page.goto("/");
    await listMenu.manageMenu().click();
    await listMenu.timesheets().click();
    await timesheets.approvedTimesheet().click();
    await page
      .locator(".MuiBox-root > .MuiFormControl-root > .MuiInputBase-root")
      .click();
    await page.getByRole("option", { name: "29 Jul 24 - 04 Aug 24" }).click();
    await timesheets.userDropdown().click();
    await page.getByRole("option", { name: "kyro-orgadmin" }).click();
    await page.getByLabel("Select row").check();
    await page.getByRole("button", { name: "Unlock" }).click();
    await page.locator("div").filter({ hasText: /^Add$/ }).click();
    await timesheets.notes().fill("there is issue on the expenses");
    const responsefortimesheet = page.waitForResponse(
      (response) =>
        response.url() === `${process.env.API_URL}/timesheets/${timesheetId}` &&
        response.status() === 200,
    );
    await timesheets.sendButton().click();
    const response = await responsefortimesheet;
    await page.waitForTimeout(3000);
    expect(
      page.getByRole("heading", { name: "Correction Request Sent" }),
    ).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(3000);
  });
});
