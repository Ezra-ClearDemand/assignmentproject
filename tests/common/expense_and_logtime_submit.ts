import { expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

async function expensesubmitprojectwithtask(
  page,
  project: String,
  task: String,
  user: String,
  expense: String,
  expensecatrgory: String,
  files: String,
) {
  const { expenseSubmit } = initPageManager(page);
  await expenseSubmit.project().click();
  await page.getByRole("button", { name: "Clear" }).click();
  await expenseSubmit.project().fill(project);
  await page.getByRole("option", { name: project }).click();
  await expenseSubmit.task().click();
  await expenseSubmit.task().fill(task);
  await page.getByRole("option", { name: task, exact: true }).click();
  await expenseSubmit.user().click();
  await page.getByRole("heading", { name: user }).click();
  await expenseSubmit.expenseCategory().click();
  await page.getByRole("option", { name: expensecatrgory }).click();
  await expenseSubmit.expenseAmount().click();
  await expenseSubmit.expenseAmount().fill(expense);
  await expenseSubmit.uploadFile().setInputFiles(files);
  await page.waitForTimeout(5000);
  await expenseSubmit.message().click();
  await expenseSubmit.message().fill("testing");
  await expenseSubmit.saveButton().click();
  await expect(page.getByText("Expense saved successfully")).toBeVisible();
}

async function expensesubmitprojectwithouttask(
  page,
  project: String,
  user: String,
  expense: String,
  expensecatrgory: String,
  files: String,
) {
  const { expenseSubmit } = initPageManager(page);
  await expenseSubmit.project().click();
  await page.getByRole("button", { name: "Clear" }).click();
  await expenseSubmit.project().fill(project);
  await page.getByRole("option", { name: project, exact: true }).click();
  await expect(expenseSubmit.task()).toBeVisible();
  await expenseSubmit.user().click();
  await page.getByRole("heading", { name: user }).click();
  await expenseSubmit.expenseCategory().click();
  await page.getByRole("option", { name: expensecatrgory }).click();
  await expenseSubmit.expenseAmount().click();
  await expenseSubmit.expenseAmount().fill(expense);
  await expenseSubmit.uploadFile().setInputFiles(files);
  await page.waitForTimeout(5000);
  await expenseSubmit.message().click();
  await expenseSubmit.message().fill("testing");
  await expenseSubmit.saveButton().click();
  await expect(page.getByText("Expense saved successfully")).toBeVisible({
    timeout: 150000,
  });
}

async function logtimesubmitprojectwithtask(
  page,
  project: String,
  task: String,
  user: String,
  duration: String,
  miles: String,
  perdiem: string,
) {
  const { logtime } = initPageManager(page);
  await logtime.project().click();
  await page.getByRole("button", { name: "Clear" }).click();
  await logtime.project().fill(project);
  await page.getByRole("option", { name: project, exact: true }).click();
  await logtime.task().click();
  await logtime.task().fill(task);
  await page.getByRole("option", { name: task }).click();
  await logtime.user().click();
  await page.getByRole("heading", { name: user }).click();
  await logtime.duration().click();
  await logtime.duration().fill(duration);
  await logtime.mileage().click();
  await logtime.mileage().fill(miles);
  await logtime.perdiem().click();
  await logtime.perdiem().fill(perdiem);
  await logtime.message().click();
  await logtime.message().fill("testing");
  await logtime.saveButton().click();
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();
}

async function logtimesubmitprojectwithouttask(
  page,
  project: String,
  user: String,
  duration: String,
  miles: String,
  perdiem: string,
) {
  const { logtime } = initPageManager(page);
  await logtime.project().click();
  await page.getByRole("button", { name: "Clear" }).click();
  await logtime.project().fill(project);
  await page.getByRole("option", { name: project, exact: true }).click();
  await expect(logtime.task()).toBeVisible();
  await logtime.user().click();
  await page.getByRole("heading", { name: user }).click();
  await logtime.duration().click();
  await logtime.duration().fill(duration);
  await logtime.mileage().click();
  await logtime.mileage().fill(miles);
  await logtime.perdiem().click();
  await logtime.perdiem().fill(perdiem);
  await logtime.message().click();
  await logtime.message().fill("testing");
  await logtime.saveButton().click();
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();
}

export {
  expensesubmitprojectwithouttask,
  expensesubmitprojectwithtask,
  logtimesubmitprojectwithouttask,
  logtimesubmitprojectwithtask,
};
