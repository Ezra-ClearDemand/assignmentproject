import { test, expect } from "@playwright/test";
import { projectSearchAndClick } from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test("Test cases manual worklog for a particular project as 00:00 @worklog", async ({
  page,
}) => {
  const { logtime } = initPageManager(page);
  await page.goto("/");
  await projectSearchAndClick(page, "public project for timesheet");
  await logtime.logTime().click();
  const inputValue = "00:00";
  await logtime.duration().click();
  await logtime.mileage().click();
  const enteredvalue = await logtime.duration().getAttribute("value");
  expect(enteredvalue).toBe(inputValue);
});

test("Test cases manual worklog with the value as 4.1 @worklog", async ({
  page,
}) => {
  const { logtime } = initPageManager(page);
  await page.goto("/");
  await projectSearchAndClick(page, "public project for timesheet");
  await logtime.logTime().click();
  await logtime.duration().click();
  await logtime.duration().fill("0");
  await logtime.mileage().click();
  await logtime.mileage().fill("4.1");
  await logtime.perdiem().click();
  await logtime.perdiem().fill("4.1");
  await logtime.message().click();
  await logtime.message().fill("unit987");
  const responseforaccount = page.waitForResponse(
    `${process.env.API_URL}/worklogs`,
  );
  await logtime.saveButton().click();
  const response2 = await (await responseforaccount).json();
  let account = "";
  account = response2["per_diem"].amount;
  const per_diam = 410;
  expect(per_diam).toBe(account);
});

test("Test cases manual worklog with the value as 0 @worklog", async ({
  page,
}) => {
  const { logtime } = initPageManager(page);
  await page.goto("/");
  await projectSearchAndClick(page, "public project for timesheet");
  await logtime.logTime().click();
  await logtime.duration().click();
  await logtime.duration().fill("0");
  await logtime.mileage().click();
  await logtime.mileage().fill("0");
  await logtime.perdiem().click();
  await logtime.perdiem().fill("0");
  await logtime.message().click();
  await logtime.message().fill("unit987");
  await logtime.saveButton().click();
  await expect(
    page.getByText("A minimum of one input is necessary"),
  ).toBeVisible();
});

test("Test cases for manual worklog with the custom field @worklog", async ({
  page,
}) => {
  const { logtime } = initPageManager(page);
  await page.goto("/");
  await projectSearchAndClick(page, "work-log with custom field");
  await logtime.logTime().click();
  const date = page.getByRole("textbox", { name: "mm/dd/yyyy" });
  const number = page.getByRole("spinbutton");
  const people = page.locator("#people");
  const select = page.locator("#select");
  const textfield = page.locator('input[name="text_field"]');
  const textarea = page.locator('textarea[name="textarea"]');
  await date.click();
  await page.getByRole("gridcell", { name: "10" }).click();
  await number.click();
  const inputnumber = "234";
  await number.fill(inputnumber);
  await people.click();
  const outputnumber = await number.getAttribute("value");
  expect(inputnumber).toBe(outputnumber);
  const inputpeople = "kyro-orgadmin";
  await page.locator("#people").fill(inputpeople);
  await page.getByRole("heading", { name: inputpeople }).click();
  await select.click();
  const outputpeople = await people.getAttribute("value");
  expect(inputpeople).toBe(outputpeople);
  const inputselect = "travel";
  await page.getByRole("option", { name: inputselect }).click();
  await textfield.click();
  const outputselect = await select.getAttribute("value");
  expect(inputselect).toBe(outputselect);
  const inputtextfield = "testing";
  await textfield.fill(inputtextfield);
  await textarea.click();
  const outputtextfield = await textfield.getAttribute("value");
  expect(inputtextfield).toBe(outputtextfield);
  const inputtextarea = "there is a issue in the application.";
  await textarea.fill(inputtextarea);
  expect(textarea).toHaveText(inputtextarea);
  await page.getByPlaceholder("hh:mm").click();
  await page.getByPlaceholder("hh:mm").fill("10h");
  await logtime.message().click();
  await logtime.message().fill("testing");
  await logtime.saveButton().click();
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();
});
