import { test, expect } from "@playwright/test";
import {
  contributor,
  guest,
  orgadmin,
  projectmanager,
  tsadmin,
  tsapprover,
} from "../common/user_details";
import {
  projectDelete,
  projectSearchAndClick,
  taskCreationSteps,
} from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

// Utility functions
async function clickAndWaitForText(page, selector, text, exact = true) {
  await page.getByText(text, { exact }).click();
}

async function fillFormField(page, label, value) {
  await page.getByLabel(label).click();
  await page.getByLabel(label).fill(value);
}

async function addTaskToProject(page, taskName: any, orgadminName: any) {
  const { taskcreation } = initPageManager(page);
  taskcreation.createTask();
  await taskCreationSteps(page, orgadminName, taskName, "testing");
  taskcreation.submitTask();
  await expect(
    page.getByRole("heading", { name: "Task Created Successfully" }),
  ).toBeVisible();
}

async function notes(page) {
  // Check if notes can be created, updated, and deleted
  await clickAndWaitForText(page, "Notes", "Notes", true);
  await fillFormField(page, "Notes", "testing");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment created successfully.")).toBeVisible();

  await expect(page.getByLabel("Notes").inputValue()).resolves.toBe(""); // check if input is cleared

  await page.locator('iconify-icon[icon="ic:outline-edit"]').click();
  await fillFormField(page, "Notes", "testing123");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment updated successfully.")).toBeVisible();

  await expect(page.getByLabel("Notes").inputValue()).resolves.toBe(""); // check if input is cleared again

  await page.locator('iconify-icon[icon="ic:outline-delete"]').click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("Comment deleted successfully.")).toBeVisible();
}

async function deleteProjectButton(page) {
  const deleteProject = page.getByRole("button", { name: "Delete" });
  await expect(deleteProject).not.toBeVisible();
}

async function updateProjectSettings(page, EMAIL: string) {
  const { projectDetails } = initPageManager(page);

  await projectDetails.settingsTab().click();
  await page.waitForTimeout(5000);
  await projectDetails.emailRecipients().click();
  await projectDetails.emailRecipients().fill("dinesh@kyro.us");
  await projectDetails.emailRecipients().press("Enter");
  await projectDetails.emailRecipients().fill("dinesh@kyro.us");
  await projectDetails.emailRecipients().press("Enter");
  await page.waitForTimeout(5000);
  await expect(page.getByText("This email already exists")).toBeVisible();
  await page
    .getByRole("button", { name: "dinesh@kyro.us" })
    .getByRole("button")
    .click();
  await projectDetails.emailRecipients().press("Enter");
  await page
    .getByRole("button", { name: "dinesh@kyro.us" })
    .getByRole("button")
    .click();
  await projectDetails.emailRecipients().fill(EMAIL);
  await projectDetails.emailRecipients().press("Enter");
  await projectDetails.saveChangesButton().click();
  await expect(
    page.getByRole("heading", {
      name: "Email recipients updated successfully.",
    }),
  ).toBeVisible({ timeout: 12000 });
}

async function settingsAndMemberTabRead(page) {
  const { projectDetails } = initPageManager(page);

  //checking the member tab
  await projectDetails.membersTab().click();
  await expect(projectDetails.gridAddMembers()).not.toBeVisible();

  //checking the project creation button
  const CREATEPROJECTBUTTON = page
    .locator("button")
    .filter({ hasText: "Create Project" });
  await expect(CREATEPROJECTBUTTON).not.toBeVisible();
}

async function projectdeatilsforonlyread(page) {
  // Project Delete button
  await deleteProjectButton(page);

  // Perform actions related to notes
  await notes(page);

  //read permission
  await settingsAndMemberTabRead(page);
}

async function writeAccessWithContributor(page) {
  const { projectDetails } = initPageManager(page);

  // checking all the tab on the project
  expect(projectDetails.clockInTab()).toBeVisible();
  expect(projectDetails.logTime()).toBeVisible();
  expect(projectDetails.dailyLogsTab()).toBeVisible();
  expect(projectDetails.reportsTab()).toBeVisible();
  expect(projectDetails.SubmitExpense()).toBeVisible();
  expect(projectDetails.timeAndExpense()).toBeVisible();
  expect(projectDetails.documentsTab()).toBeVisible();
  expect(projectDetails.taskTab()).toBeVisible();
}

async function memberAddingOnProject(page, user1: string, user2: string) {
  const { projectDetails } = initPageManager(page);

  // add the members in the private project
  await projectDetails.membersTab().click();
  await projectDetails.gridAddMembers().click();
  await page.getByPlaceholder("Search User", { exact: true }).fill(user1);
  await page.getByRole("option", { name: user1 }).click();
  await page.getByPlaceholder("Search User", { exact: true }).fill(user2);
  await page.getByRole("option", { name: user2 }).click();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(
    page.getByRole("heading", { name: "Users Added Successfully" }),
  ).toBeVisible();

  //checking the project creation button
  const CREATEPROJECTBUTTON = page
    .locator("button")
    .filter({ hasText: "Create Project" });
  await expect(CREATEPROJECTBUTTON).toBeVisible();
}

// Test Suite configuration
test.describe.configure({ mode: "serial" }); // Serial mode to maintain state between tests

// Test data setup
const SUFFIX = new Date().toJSON();
const TASKNAME = `Task on org-admin ${SUFFIX}`;
const TASKNAME2 = `Task on pm ${SUFFIX}`;
const TASKNAME3 = `Task on contri ${SUFFIX}`;
const PRIVATEPROJECT = `Homeproject ${SUFFIX}`;
const NUM = Math.floor(Math.random() * 100000) + 1;
const SETTINGSEMAIL = `Test${NUM}@kyro.us`;
const SETTINGSEMAIL2 = `Test+${NUM}@kyro.us`;

// Main test
test("Homepage-ProjectDetails For Org Admin @project", async ({ page }) => {
  const { projectDetails, projectCreation } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;

  // create the project as a private
  await projectCreation.createProject();
  const inputclient = "Test Client 123";
  await page.waitForTimeout(5000);
  await projectCreation.client().fill(inputclient);
  await page
    .getByRole("option", { name: inputclient })
    .locator("div")
    .filter({ hasText: inputclient })
    .click();
  await projectCreation.projectType().click();
  await page.getByRole("option", { name: "electrical" }).click();
  await projectCreation.nextButton().click();
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill(PRIVATEPROJECT);
  await projectCreation.projectManager().click();
  await page.getByRole("option", { name: projectmanager.name }).click();
  await projectCreation.billingCode().click();
  await projectCreation.billingCode().fill("mp1234");
  await projectCreation.description().click();
  await projectCreation.description().fill("testing");
  const responseforid = page.waitForResponse(`${process.env.API_URL}/projects`);
  await page.getByRole("button", { name: "Submit" }).click();
  const response = await (await responseforid).json();
  let projectid = "";
  projectid = response["id"];
  console.log(projectid);

  // Navigate to the newly created project
  const currentUrl = `${process.env.WEB_URL}/projects/${projectid}`;
  await expect(page).toHaveURL(currentUrl);
  await page.waitForTimeout(3000);

  // Add a task to the project
  await addTaskToProject(page, TASKNAME, orgadmin.name);

  //checking the task tab
  expect(projectDetails.taskTab()).toBeVisible();

  // Perform actions related to notes
  await notes(page);

  // checking all the tab on the project
  await writeAccessWithContributor(page);

  // Update project settings
  await updateProjectSettings(page, SETTINGSEMAIL);

  // add the members in the private project
  await memberAddingOnProject(page, contributor.name, guest.name);
});

test.describe("Check The Pm Home Page", () => {
  test.use({
    storageState: "pm.json",
  });
  test("PM-Homepage @project", async ({ page }) => {
    await page.goto("/");
    await projectSearchAndClick(page, PRIVATEPROJECT);

    // checking all the tab on the project
    await writeAccessWithContributor(page);

    // Project Delete button
    await deleteProjectButton(page);

    // Add a task to the project
    await addTaskToProject(page, TASKNAME2, orgadmin.name);

    // Perform actions related to notes
    await notes(page);

    // Update project settings
    await updateProjectSettings(page, SETTINGSEMAIL2);

    // add the members in the private project
    await memberAddingOnProject(page, tsadmin.name, tsapprover.name);
  });
});

test.describe("Check Contributor Home Page", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("Contributor-Homepage @project", async ({ page }) => {
    await page.goto("/");
    await projectSearchAndClick(page, PRIVATEPROJECT);

    // checking all the tab on the project
    await writeAccessWithContributor(page);

    // Project Delete button
    await deleteProjectButton(page);

    // Add a task to the project
    await addTaskToProject(page, TASKNAME3, orgadmin.name);

    // Perform actions related to notes
    await notes(page);

    //read permission
    await settingsAndMemberTabRead(page);
  });
});

test.describe("Check The ts-admin Home Page", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("tsadmin-Homepage @project", async ({ page }) => {
    const { projectDetails } = initPageManager(page);

    await page.goto("/");
    await projectSearchAndClick(page, PRIVATEPROJECT);

    // checking all the tab on the project
    expect(projectDetails.clockInTab()).toBeVisible();
    expect(projectDetails.logTime()).toBeVisible();
    expect(projectDetails.dailyLogsTab()).not.toBeVisible();
    expect(projectDetails.reportsTab()).not.toBeVisible();
    expect(projectDetails.SubmitExpense()).toBeVisible();
    expect(projectDetails.timeAndExpense()).toBeVisible();
    expect(projectDetails.documentsTab()).toBeVisible();
    expect(projectDetails.taskTab()).toBeVisible();

    await projectdeatilsforonlyread(page);
  });
});

test.describe("Check The ts-approver Home Page", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("tsapprover-Homepage @project", async ({ page }) => {
    const { projectDetails } = initPageManager(page);

    await page.goto("/");
    await projectSearchAndClick(page, PRIVATEPROJECT);

    // checking all the tab on the project
    expect(projectDetails.clockInTab()).toBeVisible();
    expect(projectDetails.logTime()).toBeVisible();
    expect(projectDetails.dailyLogsTab()).not.toBeVisible();
    expect(projectDetails.reportsTab()).not.toBeVisible();
    expect(projectDetails.SubmitExpense()).toBeVisible();
    expect(projectDetails.timeAndExpense()).toBeVisible();
    expect(projectDetails.documentsTab()).toBeVisible();
    expect(projectDetails.taskTab()).toBeVisible();

    await projectdeatilsforonlyread(page);
  });
});

test.describe("Check The guest Home Page", () => {
  test.use({
    storageState: "guest.json",
  });
  test("guest-Homepage @project", async ({ page }) => {
    const { projectDetails } = initPageManager(page);

    await page.goto("/");
    await projectSearchAndClick(page, PRIVATEPROJECT);

    //checking the tab on the project
    await page.waitForTimeout(3000);
    expect(projectDetails.clockInTab()).not.toBeVisible();
    expect(projectDetails.logTime()).not.toBeVisible();
    expect(projectDetails.dailyLogsTab()).not.toBeVisible();
    expect(projectDetails.reportsTab()).toBeVisible();
    expect(projectDetails.SubmitExpense()).not.toBeVisible();
    expect(projectDetails.timeAndExpense()).not.toBeVisible();
    expect(projectDetails.documentsTab()).toBeVisible();
    expect(projectDetails.taskTab()).toBeVisible();

    await projectdeatilsforonlyread(page);
  });
});

test("Delete all the private project created before @project", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#list").nth(1).click();
  await projectDelete(page, PRIVATEPROJECT);
});
