import { expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

const suffix1 = new Date().toJSON();
const suffix2 = new Date().toJSON();
export const projectName = `Testing Project Creation ${suffix1}`;
export const taskName = `Task ${suffix2}`;

async function projectCreationSteps(
  page,
  client: string,
  projecttype: string,
  projectName: string,
  projectManager: string,
  billingcode: string,
  description: string,
) {
  const { projectCreation } = initPageManager(page);

  await page.locator("button").filter({ hasText: "Create Project" }).click();
  await projectCreation.client().click();
  const inputclient = client;
  await page
    .getByRole("option", { name: inputclient })
    .locator("div")
    .filter({ hasText: inputclient })
    .click();
  await page.waitForTimeout(5000);
  await projectCreation.projectType().click();
  const outputclient = await projectCreation.client().getAttribute("value");
  expect(inputclient).toBe(outputclient);
  const inputprojecttype = projecttype;
  await page.getByRole("option", { name: inputprojecttype }).click();
  const outputprojecttype = await projectCreation
    .projectType()
    .getAttribute("value");
  expect(inputprojecttype).toBe(outputprojecttype);
  await page.getByRole("button", { name: "Next" }).click();
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill(projectName);
  await projectCreation.projectManager().click();
  const outputprojectname = await projectCreation
    .projectName()
    .getAttribute("value");
  expect(projectName).toBe(outputprojectname);
  const inputpm = projectManager;
  await page.getByRole("option", { name: inputpm, exact: true }).click();
  await projectCreation.billingCode().click();
  const outputpm = await projectCreation.projectManager().getAttribute("value");
  const inputbillingcode = billingcode;
  await projectCreation.billingCode().fill(inputbillingcode);
  await projectCreation.description().click;
  const outputbillingcode = await projectCreation
    .billingCode()
    .getAttribute("value");
  expect(inputbillingcode).toBe(outputbillingcode);
  const inputdescription = description;
  await projectCreation.description().fill(inputdescription);
  expect(projectCreation.description()).toHaveText(inputdescription);
  await projectCreation.projectName().click();
  await page.waitForTimeout(5000);
  expect(inputpm).toBe(outputpm);
  await projectCreation.submitProject();
}

async function taskCreationSteps(
  page,
  assigneeName: string,
  taskName: string,
  taskdescription: string,
) {
  const { taskcreation } = initPageManager(page);

  await taskcreation.summary().click();
  await taskcreation.summary().fill(taskName);
  await taskcreation.description().click();
  const outputsummary = await taskcreation.summary().getAttribute("value");
  expect(taskName).toBe(outputsummary);
  await taskcreation.description().fill(taskdescription);
  await taskcreation.startDate().click();
  expect(taskcreation.description()).toHaveText(taskdescription);
  const inputstartdate = "12/20/2022";
  await taskcreation.startDate().fill(inputstartdate);
  await taskcreation.endDate().click();
  const outputstartdate = await taskcreation.startDate().getAttribute("value");
  expect(inputstartdate).toBe(outputstartdate);
  const inputenddate = "01/27/2023";
  await taskcreation.endDate().fill(inputenddate);
  await taskcreation.priority().click();
  const outputenddate = await taskcreation.endDate().getAttribute("value");
  expect(inputenddate).toBe(outputenddate);
  const inputpriority = "High";
  await page.getByRole("option", { name: inputpriority }).click();
  await taskcreation.assignee().click();
  await page.getByRole("option", { name: assigneeName, exact: true }).click();
  await taskcreation.summary().click();
  const outputassignee = await taskcreation.assignee().getAttribute("value");
  expect(assigneeName).toBe(outputassignee);
  await taskcreation.billable().check();
}

async function projectDelete(page, projectName: string) {
  const { projectDetails } = initPageManager(page);

  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill(projectName);
  await projectDetails.searchProject().press("Enter");
  await page.getByRole("heading", { name: projectName, exact: true }).click();
  await projectDetails.deleteButton().click();
  await projectDetails.yesButton().click();
  await expect(
    page.getByRole("heading", { name: "Project Deleted Successfully" }),
  ).toBeVisible();
}

async function projectSearchAndClick(page, projectName: string) {
  const { projectDetails } = initPageManager(page);

  await page.locator("#list").nth(1).click();
  await projectDetails.searchProject().click();
  await projectDetails.searchProject().fill(projectName);
  await projectDetails.searchProject().press("Enter");
  await page.getByRole("heading", { name: projectName, exact: true }).click();
}
export {
  projectCreationSteps,
  taskCreationSteps,
  projectDelete,
  projectSearchAndClick,
};
