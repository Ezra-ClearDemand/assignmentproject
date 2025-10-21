import { test, expect } from "@playwright/test";
import {
  automaticworklog,
  manualworklog,
  log_time,
  projectSearchingSteps,
} from "../common/worklog";
import { projectSearchAndClick } from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test.describe.configure({ mode: "serial" });
test("Run the automatic timer For Org Admin @worklog", async ({ page }) => {
  await page.goto("/");
  await projectSearchingSteps(page);
  // check the log time is working or not
  await manualworklog(page, "10:30", "1", "1");
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();

  // check the duration as a hour and min and also check the decimal value
  await log_time(page, expect, "2h 45m", "0.8", "0.9");
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();
});

test.describe("contributor-automatic timer", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("Run the automatic timer For Contributor @worklog", async ({ page }) => {
    await page.goto("/");
    await projectSearchingSteps(page);

    // check the log time is working or not
    await manualworklog(page, "10:30", "1", "1");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();

    // check the duration as a hour and min and also check the decimal value
    await log_time(page, expect, "2h 45m", "0.8", "0.9");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();
  });
});

test.describe("Pm-automatic timer", () => {
  test.use({
    storageState: "pm.json",
  });
  test("Run the automatic timer for pm @worklog", async ({ page }) => {
    await page.goto("/");
    await projectSearchingSteps(page);
    // check the log time is working or not
    await manualworklog(page, "10:30", "1", "1");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();

    // check the duration as a hour and min and also check the decimal value
    await log_time(page, expect, "2h 45m", "0.8", "0.9");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();
  });
});

test.describe("Guest-automatic timer", () => {
  test.use({
    storageState: "guest.json",
  });
  test("guest-check the automatic timer is visible or not @worklog", async ({
    page,
  }) => {
    await page.goto("/");
    await projectSearchAndClick(page, "automatic timer for timesheet");
    const timer = page.locator("#automate-timer-start path");
    await expect(timer).not.toBeVisible();
  });
});

test.describe("Tsadmin-automatic timer", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Run the automatic timer for ts-admin @worklog", async ({ page }) => {
    await page.goto("/");
    await projectSearchingSteps(page);

    // check the log time is working or not
    await manualworklog(page, "10:30", "1", "1");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();

    // check the duration as a hour and min and also check the decimal value
    await log_time(page, expect, "2h 45m", "0.8", "0.9");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();
  });
});

test.describe("Tsapprover-automatic timer", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("Run the automatic timer for ts-approver @worklog", async ({ page }) => {
    await page.goto("/");
    await projectSearchingSteps(page);
    // check the log time is working or not
    await manualworklog(page, "10:30", "1", "1");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();

    // check the duration as a hour and min and also check the decimal value
    await log_time(page, expect, "2h 45m", "0.8", "0.9");
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();
  });
});

test("stop the automatic timer For Org Admin @worklog", async ({ page }) => {
  const responseforsettings = page.waitForResponse(
    (response) =>
      response.url() ===
        `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
      response.status() === 200,
  );
  await page.goto("/");
  const responseforsetting = await responseforsettings;
  await automaticworklog(page, "1", "1");
  await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
});

test.describe("contributor-automatic timer", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("Stop the automatic timer For Contributor @worklog", async ({
    page,
  }) => {
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await automaticworklog(page, "120", "100");
    await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
  });
});

test.describe("Pm-automatic timer", () => {
  test.use({
    storageState: "pm.json",
  });
  test("Stop the automatic timer for pm @worklog", async ({ page }) => {
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await automaticworklog(page, "4.1", "3.1");
    await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
  });
});

test.describe("Tsadmin-automatic timer", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Stop the automatic timer for ts-admin @worklog", async ({ page }) => {
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await automaticworklog(page, "0.9", "0.8");
    await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
  });
});
test.describe("Tsapprover-automatic timer", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("Stop the automatic timer for ts-approver @worklog", async ({
    page,
  }) => {
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await automaticworklog(page, "1", "1");
    await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
  });
});

test("Test the automatic timer with notes @worklog", async ({ page }) => {
  const { logtime, projectDetails } = initPageManager(page);
  await page.goto("/");
  await projectSearchAndClick(page, "public project for timesheet");
  await projectDetails.clockInTab().click();
  await page.getByLabel("Add Log Notes").getByRole("img").click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("testing");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Save" }).click();
  expect(
    page.getByRole("heading", { name: "Notes Added successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
  await page.getByLabel("Add Log Notes").getByRole("img").click();
  await page.getByText("testing", { exact: true }).click();
  await page.getByText("testing", { exact: true }).fill("testing123");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Save" }).click();
  expect(
    page.getByRole("heading", { name: "Notes Added successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
  await logtime.automaticTimerStop().click();
  await logtime.mileage().click();
  await logtime.mileage().fill("50");
  await logtime.perdiem().click();
  await logtime.perdiem().fill("100");
  await expect(logtime.message()).toHaveValue("testing123");
  await logtime.saveButton().click();
  await expect(page.getByText("Worklog Updated Successfully")).toBeVisible();
});
