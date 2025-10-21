import { test, expect } from "@playwright/test";
import { contributor, orgadmin, projectmanager } from "../common/user_details";
import {
  projectSearchAndClick,
  taskCreationSteps,
} from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

const DATE = new Date().toJSON();
const TASKNAME = `Task ${DATE}`;
const TASKNAME2 = `dam construction ${DATE}`;
const TASKNAME3 = `airport construction ${DATE}`;

async function taskdetails(page) {
  const { taskcreation } = initPageManager(page);
  const { taskDetails } = initPageManager(page);

  await projectSearchAndClick(page, "china");
  await page.getByRole("main").getByText("Tasks", { exact: true }).click();
  expect(page.getByRole("heading", { name: TASKNAME })).toBeVisible();
  await page.getByRole("heading", { name: TASKNAME }).click();

  //create the sub-task
  taskcreation.createSubTask();
  await taskCreationSteps(page, orgadmin.name, TASKNAME3, "testing");
  taskcreation.submitSubTask();
  await expect(page.getByText("Task Created Successfully")).toBeVisible(); // check the sub task is created or not

  // check the Notes is created,updated and delete
  await taskDetails.notesTab().click();
  await taskDetails.notes().click();
  await taskDetails.notes().fill("testing");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment created successfully.")).toBeVisible();
  // check the notes is empty after added
  await page.waitForTimeout(3000);
  await expect(taskDetails.notes().inputValue()).resolves.toBe("");

  await page.locator('iconify-icon[icon="ic:outline-edit"]').click();
  await taskDetails.notes().click();
  await taskDetails.notes().fill("testing123");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment updated successfully.")).toBeVisible();
  // check the notes is empty after update
  await page.waitForTimeout(3000);
  await expect(taskDetails.notes().inputValue()).resolves.toBe("");

  await page.locator('iconify-icon[icon="ic:outline-delete"]').click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("Comment deleted successfully.")).toBeVisible();
}

async function fileUploadAndDelete(page) {
  const { taskDetails } = initPageManager(page);

  //files upload in task level
  await taskDetails.documentsTab().click();
  await page
    .getByRole("button", { name: "Plans (0) svg-button" })
    .locator("label")
    .setInputFiles("./e2e/images/orgpic.jpeg");
  await page.waitForTimeout(3000);
  await expect(
    page.getByRole("heading", { name: "File Added successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
  await page
    .getByRole("button", { name: "Attachments (0) svg-button" })
    .locator("label")
    .setInputFiles("./e2e/images/profile.png");
  await page.waitForTimeout(3000);
  await expect(
    page.getByRole("heading", { name: "File Added successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page
    .getByRole("button", { name: "Plans (1) svg-button" })
    .getByLabel("svg-button")
    .click();
  await page.getByRole("region").getByRole("img").nth(1).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(3000);
  await expect(
    page.getByRole("heading", { name: "File deleted successfully" }),
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page
    .getByRole("button", { name: "Attachments (1) svg-button" })
    .getByLabel("svg-button")
    .click();
  await page.getByRole("region").getByRole("img").nth(1).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.waitForTimeout(3000);
  await expect(
    page.getByRole("heading", { name: "File deleted successfully" }),
  ).toBeVisible();
}

async function taskSearch(page) {
  await projectSearchAndClick(page, "china");
  await page.getByRole("main").getByText("Tasks", { exact: true }).click();
  expect(page.getByRole("heading", { name: TASKNAME })).toBeVisible();
  await page.getByRole("heading", { name: TASKNAME }).click();
}
async function taskdetailsforreadpermission(page) {
  const { taskDetails } = initPageManager(page);

  expect(taskDetails.subTaskButton()).not.toBeVisible();

  // check the Notes is created,updated and delete
  await page.waitForTimeout(3000);
  await taskDetails.notesTab().click();
  await taskDetails.notes().click();
  await taskDetails.notes().fill("testing");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment created successfully.")).toBeVisible();
  // check the notes is empty after added
  await page.waitForTimeout(3000);
  await expect(taskDetails.notes().inputValue()).resolves.toBe("");

  await page.locator('iconify-icon[icon="ic:outline-edit"]').click();
  await taskDetails.notes().click();
  await taskDetails.notes().fill("testing123");
  await page.getByRole("button", { name: "Add Notes", exact: true }).click();
  await expect(page.getByText("Comment updated successfully.")).toBeVisible();
  // check the notes is empty after update
  await page.waitForTimeout(3000);
  await expect(taskDetails.notes().inputValue()).resolves.toBe("");

  await page.locator('iconify-icon[icon="ic:outline-delete"]').click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("Comment deleted successfully.")).toBeVisible();

  //document permission check
  await taskDetails.documentsTab().click();
  const plans = page
    .getByRole("button", { name: "Plans (0) svg-button" })
    .locator("label");
  await expect(plans).not.toBeVisible();
  const attachment = page
    .getByRole("button", { name: "Attachments (0) svg-button" })
    .locator("label");
  await expect(attachment).not.toBeVisible();
}

test.describe.configure({ mode: "serial" });
test("Create a task for already exsiting project @task", async ({ page }) => {
  const { taskcreation } = initPageManager(page);

  await page.goto("/");
  await projectSearchAndClick(page, "china");

  // task is created as a billable
  await taskcreation.createTask();
  await taskCreationSteps(page, orgadmin.name, TASKNAME, "testing");
  await taskcreation.checkBox().check(); // check that the checkbox ia working or not
  await taskcreation.submitTask();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Task Created Successfully")).toBeVisible(); // check the task is created or not

  //task is created as a non-billable
  await taskcreation.summary().fill(TASKNAME2);
  await taskcreation.description().fill("testing");
  await taskcreation.priority().click();
  await page.getByRole("option", { name: "High" }).click();
  await taskcreation.assignee().click();
  await page.getByRole("option", { name: projectmanager.name }).click();
  await taskcreation.nonBillable().check();
  await taskcreation.submitTask();
  await expect(page.getByText("Task Created Successfully")).toBeVisible(); // check the task is created or not
});

test("Task right panel for billable task @task", async ({ page }) => {
  const { taskDetails } = initPageManager(page);

  await page.goto("/");

  await taskdetails(page);

  // check the details in the task
  await taskDetails.taskDetail().click();

  //checking all tab on task
  expect(taskDetails.logTime()).toBeVisible();
  expect(taskDetails.dailyLogsTab()).toBeVisible();
  expect(taskDetails.reportsTab()).toBeVisible();

  await page.getByRole("button", { name: "Initiated" }).click();
  await page.getByRole("option", { name: "In Progress" }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole("button", { name: "In Progress" })).toBeVisible();
  await page
    .getByRole("button", { name: "Choose date, selected date is Dec 20, 2022" })
    .click();
  await page.getByRole("gridcell", { name: "21" }).click();
  await page.waitForTimeout(5000);
  await expect(
    page.getByRole("button", {
      name: "Choose date, selected date is Dec 21, 2022",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Choose date, selected date is Jan 27, 2023" })
    .click();
  await page.getByRole("gridcell", { name: "28" }).click();
  await page.waitForTimeout(5000);
  await expect(
    page.getByRole("button", {
      name: "Choose date, selected date is Jan 28, 2023",
    }),
  ).toBeVisible();
  await taskDetails.assignee().click();
  const inputassignee = contributor.name;
  await page.getByRole("option", { name: inputassignee, exact: true }).click();
  await taskDetails.reporter().click();
  await page.waitForTimeout(5000);
  const outputassignee = await taskDetails.assignee().getAttribute("value");
  expect(inputassignee).toBe(outputassignee);
  const inputreporter = projectmanager.name;
  await page.waitForTimeout(5000);
  await page.getByRole("option", { name: inputreporter, exact: true }).click();
  await page.waitForTimeout(5000);
  const outputreporter = await taskDetails.reporter().getAttribute("value");
  expect(inputreporter).toBe(outputreporter);
  await fileUploadAndDelete(page);
  await taskDetails.taskDetail().click();
  await expect(page.getByRole("button", { name: "In Progress" })).toBeVisible();

  expect(taskDetails.clockInTab()).not.toBeVisible();
});

test.describe("Check The Pm task Page", () => {
  test.use({
    storageState: "pm.json",
  });
  test("PM-taskpage @task", async ({ page }) => {
    const { taskDetails } = initPageManager(page);

    await page.goto("/");
    await taskdetails(page);

    // check the details in the task
    await taskDetails.taskDetail().click();

    expect(taskDetails.clockInTab()).not.toBeVisible();
    expect(taskDetails.logTime()).toBeVisible();
    expect(taskDetails.dailyLogsTab()).toBeVisible();
    expect(taskDetails.reportsTab()).toBeVisible();

    await page.getByRole("button", { name: "In Progress" }).click();
    await page.getByRole("option", { name: "Initiated" }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole("button", { name: "Initiated" })).toBeVisible();
    await page
      .getByRole("button", {
        name: "Choose date, selected date is Dec 21, 2022",
      })
      .click();
    await page.getByRole("gridcell", { name: "22" }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("button", {
        name: "Choose date, selected date is Dec 22, 2022",
      }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Choose date, selected date is Jan 28, 2023",
      })
      .click();
    await page.getByRole("gridcell", { name: "29" }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("button", {
        name: "Choose date, selected date is Jan 29, 2023",
      }),
    ).toBeVisible();
    await taskDetails.assignee().click();
    const inputassignee = orgadmin.name;
    await page
      .getByRole("option", { name: inputassignee, exact: true })
      .click();
    await taskDetails.reporter().click();
    await page.waitForTimeout(5000);
    const outputassignee = await taskDetails.assignee().getAttribute("value");
    expect(inputassignee).toBe(outputassignee);
    const inputreporter = orgadmin.name;
    await page.waitForTimeout(5000);
    await page
      .getByRole("option", { name: inputreporter, exact: true })
      .click();
    await page.waitForTimeout(5000);
    const outputreporter = await taskDetails.reporter().getAttribute("value");
    expect(inputreporter).toBe(outputreporter);
    await fileUploadAndDelete(page);
  });
});

test.describe("Check Contributor Task Page", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("Contributor-taskpage @task", async ({ page }) => {
    const { taskDetails } = initPageManager(page);

    await page.goto("/");
    await taskdetails(page);
    // check the details in the task
    await taskDetails.taskDetail().click();

    //checking all tab on task
    expect(taskDetails.logTime()).toBeVisible();
    expect(taskDetails.dailyLogsTab()).toBeVisible();
    expect(taskDetails.reportsTab()).toBeVisible();

    await page.getByRole("button", { name: "Initiated" }).click();
    await page.getByRole("option", { name: "In Progress" }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("button", { name: "In Progress" }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Choose date, selected date is Dec 22, 2022",
      })
      .click();
    await page.getByRole("gridcell", { name: "23" }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("button", {
        name: "Choose date, selected date is Dec 23, 2022",
      }),
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: "Choose date, selected date is Jan 29, 2023",
      })
      .click();
    await page.getByRole("gridcell", { name: "30" }).click();
    await page.waitForTimeout(5000);
    await expect(
      page.getByRole("button", {
        name: "Choose date, selected date is Jan 30, 2023",
      }),
    ).toBeVisible();
    await taskDetails.assignee().click();
    const inputassignee = contributor.name;
    await page
      .getByRole("option", { name: inputassignee, exact: true })
      .click();
    await taskDetails.reporter().click();
    await page.waitForTimeout(5000);
    const outputassignee = await taskDetails.assignee().getAttribute("value");
    expect(inputassignee).toBe(outputassignee);
    const inputreporter = projectmanager.name;
    await page.waitForTimeout(5000);
    await page
      .getByRole("option", { name: inputreporter, exact: true })
      .click();
    await page.waitForTimeout(5000);
    const outputreporter = await taskDetails.reporter().getAttribute("value");
    expect(inputreporter).toBe(outputreporter);
    await fileUploadAndDelete(page);

    expect(taskDetails.clockInTab()).toBeVisible();
  });
});

test.describe("Check The guest task Page", () => {
  test.use({
    storageState: "guest.json",
  });
  test("guest-taskpage @task", async ({ page }) => {
    const { taskDetails } = initPageManager(page);

    await page.goto("/");
    await taskSearch(page);

    expect(taskDetails.clockInTab()).not.toBeVisible();
    expect(taskDetails.logTime()).not.toBeVisible();
    expect(taskDetails.dailyLogsTab()).not.toBeVisible();
    expect(taskDetails.reportsTab()).toBeVisible();

    await taskdetailsforreadpermission(page);
  });
});

test.describe("Check The tsadmin task Page", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("tsadmin-taskpage @task", async ({ page }) => {
    const { taskDetails } = initPageManager(page);
    await page.goto("/");
    await taskSearch(page);

    expect(taskDetails.clockInTab()).not.toBeVisible();
    expect(taskDetails.logTime()).toBeVisible();
    expect(taskDetails.dailyLogsTab()).not.toBeVisible();
    expect(taskDetails.reportsTab()).not.toBeVisible();

    await taskdetailsforreadpermission(page);
  });
});

test.describe("Check The tsapprover Page", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("tsapprover-taskpage @task", async ({ page }) => {
    const { taskDetails } = initPageManager(page);
    await page.goto("/");
    await taskSearch(page);

    expect(taskDetails.clockInTab()).not.toBeVisible();
    expect(taskDetails.logTime()).toBeVisible();
    expect(taskDetails.dailyLogsTab()).not.toBeVisible();
    expect(taskDetails.reportsTab()).not.toBeVisible();

    await taskdetailsforreadpermission(page);
  });
});
