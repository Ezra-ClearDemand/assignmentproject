import { expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";
import { projectSearchAndClick } from "./ProjectAndTaskCraetion ";

async function manualworklog(
  page,
  duration1: String,
  miles: String,
  perdiem1: String,
) {
  const { logtime } = initPageManager(page);
  await logtime.logTime().click();
  const inputValue = duration1;
  await logtime.duration().fill(inputValue);
  await logtime.mileage().click();
  const enteredvalue = await logtime.duration().getAttribute("value");
  expect(enteredvalue).toBe(inputValue);
  const inputValuemile = miles;
  await logtime.mileage().fill(inputValuemile);
  await logtime.perdiem().click();
  const enteredvaluemile = await logtime.mileage().getAttribute("value");
  expect(enteredvaluemile).toBe(inputValuemile);
  const inputValueperdiem = perdiem1;
  await logtime.perdiem().fill(inputValueperdiem);
  await logtime.message().click();
  const enteredvalueperdiem = await logtime.perdiem().getAttribute("value");
  expect(enteredvalueperdiem).toBe(inputValueperdiem);
  await logtime.message().fill("test");
  expect(logtime.message()).toHaveValue("test");
  await logtime.saveButton().click();
}

async function automaticworklog(page, miles: String, perdiem: String) {
  const { logtime } = initPageManager(page);
  await logtime.automaticTimerStop().click();
  const automaticinputValuemile = miles;
  await logtime.mileage().fill(automaticinputValuemile);
  await logtime.perdiem().click();
  const automaticenteredvaluemile = await logtime
    .mileage()
    .getAttribute("value");
  expect(automaticenteredvaluemile).toBe(automaticinputValuemile);
  const automaticinputValueperdiem = perdiem;
  await logtime.perdiem().fill(automaticinputValueperdiem);
  await logtime.message().click();
  const automaticenteredvalueperdiem = await logtime
    .perdiem()
    .getAttribute("value");
  expect(automaticenteredvalueperdiem).toBe(automaticinputValueperdiem);
  await logtime.message().fill("testing");
  await expect(logtime.message()).toHaveValue("testing");
  await logtime.saveButton().click();
}

async function log_time(
  page,
  expect,
  durt: String,
  mils: String,
  perdm: String,
) {
  const { logtime } = initPageManager(page);
  await logtime.logTime().click();
  const inputValue1 = "02:45";
  await logtime.duration().fill(durt);
  await logtime.mileage().click();
  const enteredvalue1 = await logtime.duration().getAttribute("value");
  expect(enteredvalue1).toBe(inputValue1);
  const inputValuemilefordecimal = mils;
  await logtime.mileage().fill(inputValuemilefordecimal);
  await logtime.perdiem().click();
  const enteredvaluemilefordecimal = await logtime
    .mileage()
    .getAttribute("value");
  expect(enteredvaluemilefordecimal).toBe(inputValuemilefordecimal);
  const inputValueperdiemfordecimal = perdm;
  await logtime.perdiem().fill(inputValueperdiemfordecimal);
  await logtime.message().click();
  const enteredvalueperdiemfordecimal = await logtime
    .perdiem()
    .getAttribute("value");
  expect(enteredvalueperdiemfordecimal).toBe(inputValueperdiemfordecimal);
  await logtime.message().fill("test");
  await expect(logtime.message()).toHaveValue("test");
  await logtime.saveButton().click();
}

async function projectSearchingSteps(page) {
  const { projectDetails } = initPageManager(page);
  await projectSearchAndClick(page, "automatic timer for timesheet");
  await page.waitForTimeout(1000);
  await projectDetails.clockInTab().click();
  await projectDetails.projectBack().click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill("public project for timesheet");
  await projectDetails.searchProject().press("Enter");
  await page
    .getByRole("heading", { name: "public project for timesheet" })
    .click();
}

export { manualworklog, automaticworklog, log_time, projectSearchingSteps };
