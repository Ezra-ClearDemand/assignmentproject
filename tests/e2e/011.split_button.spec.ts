import { test, expect } from "@playwright/test";
import {
  expensesubmitprojectwithouttask,
  expensesubmitprojectwithtask,
  logtimesubmitprojectwithouttask,
  logtimesubmitprojectwithtask,
} from "../common/expense_and_logtime_submit";
import { orgadmin, projectmanager } from "../common/user_details";
import {
  projectDelete,
  taskCreationSteps,
} from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

const NUM = Math.floor(Math.random() * 100000) + 1;
const EXPENSESUBMITWITHOUTTASK = `expense${NUM}`;
const SUFFFIX = new Date().toJSON();
const TASKNAME = `Task ${SUFFFIX}`;
const EXPENSESUBMITWITHTASK = `expensewithtask${SUFFFIX}`;
test.describe.configure({ mode: "serial" });
test("orgadmin-Create the project with task and without task @splitbutton", async ({
  page,
}) => {
  const { projectCreation, taskcreation } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  await page.waitForTimeout(5000);
  await projectCreation.createProject();
  await page.waitForTimeout(5000);
  await projectCreation.client().click();
  const inputclient = "Test Client 123";
  await projectCreation.client().fill(inputclient);
  await page
    .getByRole("option", { name: inputclient })
    .locator("div")
    .filter({ hasText: inputclient })
    .click();
  await page.waitForTimeout(5000);
  await projectCreation.projectType().click();
  const outputclient = await projectCreation.client().getAttribute("value");
  expect(inputclient).toBe(outputclient);
  const inputprojecttype = "electrical";
  await page.getByRole("option", { name: inputprojecttype }).click();
  const outputprojecttype = await projectCreation
    .projectType()
    .getAttribute("value");
  expect(inputprojecttype).toBe(outputprojecttype);
  await projectCreation.markAsPublic().check();
  await projectCreation.nextButton().click();
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill(EXPENSESUBMITWITHOUTTASK);
  await projectCreation.submitProject();
  await expect(
    page.getByRole("heading", { name: EXPENSESUBMITWITHOUTTASK }),
  ).toBeVisible();
  await projectCreation.createProject();
  await page.waitForTimeout(5000);
  await projectCreation.client().fill(inputclient);
  await page
    .getByRole("option", { name: inputclient })
    .locator("div")
    .filter({ hasText: inputclient })
    .click();
  await projectCreation.projectType().click();
  await page.getByRole("option", { name: "electrical" }).click();
  await projectCreation.markAsPublic().check();
  await projectCreation.nextButton().click();
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill(EXPENSESUBMITWITHTASK);
  await projectCreation.projectManager().click();
  await page.getByRole("option", { name: projectmanager.name }).click();
  await projectCreation.billingCode().click();
  await projectCreation.billingCode().fill("mp1234");
  await projectCreation.description().click();
  await projectCreation.description().fill("testing");
  const responseforid = page.waitForResponse(`${process.env.API_URL}/projects`);
  await projectCreation.submitProject();
  const response = await (await responseforid).json();
  let userid = "";
  userid = response["id"];
  console.log(userid);

  //add the task in the project
  const currenturl = `${process.env.WEB_URL}/projects/${userid}`;
  await expect(page).toHaveURL(currenturl);
  await page.waitForTimeout(3000);
  taskcreation.createTask();
  await taskCreationSteps(page, orgadmin.name, TASKNAME, "testing");
  taskcreation.submitTask();
  await expect(page.getByText("Task Created Successfully")).toBeVisible(); // check the task is created or not
});

test("orgadmin-submit the expense and logtime @splitbutton", async ({
  page,
}) => {
  const { listMenu } = initPageManager(page);
  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  await page.waitForTimeout(5000);
  await listMenu.expenseButton().click();
  await expensesubmitprojectwithouttask(
    page,
    EXPENSESUBMITWITHOUTTASK,
    "kyro-orgadmin",
    "45",
    "Parking and Tolls",
    "./e2e/images/client.png",
  );
  await listMenu.expenseButton().click();
  await expensesubmitprojectwithouttask(
    page,
    EXPENSESUBMITWITHOUTTASK,
    "kyro-contributor",
    "45",
    "Hotel Expense",
    "./e2e/images/client.png",
  );
  await listMenu.logTimeButton().click();
  await logtimesubmitprojectwithouttask(
    page,
    EXPENSESUBMITWITHOUTTASK,
    "kyro-orgadmin",
    "2:00",
    "34",
    "50",
  );
  await listMenu.logTimeButton().click();
  await logtimesubmitprojectwithouttask(
    page,
    EXPENSESUBMITWITHOUTTASK,
    "kyro-Pm",
    "2:00",
    "34",
    "50",
  );
  await listMenu.expenseButton().click();
  await expensesubmitprojectwithtask(
    page,
    EXPENSESUBMITWITHTASK,
    TASKNAME,
    "kyro-orgadmin",
    "23",
    "Air Travel",
    "./e2e/images/orgpic.jpeg",
  );
  await listMenu.expenseButton().click();
  await expensesubmitprojectwithtask(
    page,
    EXPENSESUBMITWITHTASK,
    TASKNAME,
    "kyro-contributor",
    "24.99",
    "Air Travel",
    "./e2e/images/orgpic.jpeg",
  );
  await listMenu.logTimeButton().click();
  await logtimesubmitprojectwithtask(
    page,
    EXPENSESUBMITWITHTASK,
    TASKNAME,
    "kyro-orgadmin",
    "2:00",
    "34",
    "50",
  );
  await listMenu.logTimeButton().click();
  await logtimesubmitprojectwithtask(
    page,
    EXPENSESUBMITWITHTASK,
    TASKNAME,
    "kyro-Pm",
    "2:00",
    "34",
    "50",
  );
});

test.describe("expense and log time submit from tsapprover", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("tsapprover-submit the expense and logtime @splitbutton", async ({
    page,
  }) => {
    const { listMenu } = initPageManager(page);
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await page.waitForTimeout(5000);
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsapprover",
      "45",
      "Parking and Tolls",
      "./e2e/images/client.png",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-contributor",
      "45",
      "Hotel Expense",
      "./e2e/images/client.png",
    );
    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsapprover",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-orgadmin",
      "2:00",
      "34",
      "50",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsapprover",
      "23",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-Pm",
      "24.99",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsapprover",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-contributor",
      "2:00",
      "34",
      "50",
    );
  });
});

test.describe("expense and log time submit from tsadmin", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("tsadmin-submit the expense and logtime @splitbutton", async ({
    page,
  }) => {
    const { listMenu } = initPageManager(page);
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await page.waitForTimeout(5000);
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsadmin",
      "45",
      "Parking and Tolls",
      "./e2e/images/client.png",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-Pm",
      "45",
      "Hotel Expense",
      "./e2e/images/client.png",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsadmin",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-orgadmin",
      "2:00",
      "34",
      "50",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsadmin",
      "23",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );
    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-contributor",
      "24.99",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsadmin",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsapprover",
      "2h",
      "34",
      "50",
    );
  });
});

test.describe("expense and log time submit from PM", () => {
  test.use({
    storageState: "pm.json",
  });
  test("Pm-submit the expense and logtime @splitbutton", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await page.waitForTimeout(5000);

    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsadmin",
      "45",
      "Parking and Tolls",
      "./e2e/images/client.png",
    );

    await listMenu.expenseButton().click();
    await expensesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-Pm",
      "45",
      "Hotel Expense",
      "./e2e/images/client.png",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-Pm",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithouttask(
      page,
      EXPENSESUBMITWITHOUTTASK,
      "kyro-tsapprover",
      "2:00",
      "34",
      "50",
    );

    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-Pm",
      "23",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );

    await listMenu.expenseButton().click();
    await expensesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsapprover",
      "24.99",
      "Air Travel",
      "./e2e/images/orgpic.jpeg",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-Pm",
      "2:00",
      "34",
      "50",
    );

    await listMenu.logTimeButton().click();
    await logtimesubmitprojectwithtask(
      page,
      EXPENSESUBMITWITHTASK,
      TASKNAME,
      "kyro-tsadmin",
      "2:00",
      "34",
      "50",
    );
  });
});

test.describe("expense and log time submit from contributor", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("contributor-submit the expense and logtime", async ({ page }) => {
    const { listMenu } = initPageManager(page);
    const responseforsettings = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/settings?limit=1000&resource_type=timesheet` &&
        response.status() === 200,
    );
    await page.goto("/");
    const responseforsetting = await responseforsettings;
    await page.waitForTimeout(5000);
    await listMenu.expenseButton().click();
    await page.locator("form #project-list-id").click();
    await page.getByRole("button", { name: "Clear" }).click();
    await page.locator("form #project-list-id").fill(EXPENSESUBMITWITHOUTTASK);
    await page.getByRole("option", { name: EXPENSESUBMITWITHOUTTASK }).click();
    const TASK = page.locator("#task-list-id");
    await expect(TASK).toBeVisible();
    await page.getByLabel("​", { exact: true }).click();
    await page.getByRole("option", { name: "Miscellaneous" }).click();
    await page.getByPlaceholder("$").click();
    await page.getByPlaceholder("$").fill("45");
    await page
      .getByRole("button", { name: "svg-button Upload" })
      .setInputFiles("./e2e/images/client.png");
    await page.waitForTimeout(5000);
    await page.locator('textarea[name="message"]').click();
    await page.locator('textarea[name="message"]').fill("testing");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Expense saved successfully")).toBeVisible();

    await listMenu.logTimeButton().click();
    await page.locator("form #project-list-id").click();
    await page.getByRole("button", { name: "Clear" }).click();
    await page.locator("form #project-list-id").fill(EXPENSESUBMITWITHOUTTASK);
    await page.getByRole("option", { name: EXPENSESUBMITWITHOUTTASK }).click();
    const TASK1 = page.locator("#task-list-id");
    await expect(TASK1).toBeVisible();
    await page.getByPlaceholder("hh:mm").click();
    await page.getByPlaceholder("hh:mm").fill("19");
    await page.getByPlaceholder("miles").click();
    await page.getByPlaceholder("miles").fill("0.1");
    await page.locator('input[name="perDiem"]').click();
    await page.locator('input[name="perDiem"]').fill("45");
    await page.locator('textarea[name="message"]').click();
    await page.locator('textarea[name="message"]').fill("testing");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Worklog saved successfully")).toBeVisible();
    await listMenu.expenseButton().click();
    await page.locator("form #project-list-id").click();
    await page.getByRole("button", { name: "Clear" }).click();
    await page.locator("form #project-list-id").fill(EXPENSESUBMITWITHTASK);
    await page.getByRole("option", { name: EXPENSESUBMITWITHTASK }).click();
    await page.locator("#task-list-id").click();
    await page.locator("#task-list-id").fill(TASKNAME);
    await page.getByRole("option", { name: TASKNAME }).click();
    await page.getByLabel("​", { exact: true }).click();
    await page.getByRole("option", { name: "Air Travel" }).click();
    await page.getByPlaceholder("$").click();
    await page.getByPlaceholder("$").fill("23");
    await page
      .getByRole("button", { name: "svg-button Upload" })
      .setInputFiles("./e2e/images/client.png");
    await page.waitForTimeout(10000);
    await page.locator('textarea[name="message"]').click();
    await page.locator('textarea[name="message"]').fill("testing");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Expense saved successfully")).toBeVisible({
      timeout: 150000,
    });

    await listMenu.logTimeButton().click();
    await page.locator("form #project-list-id").click();
    await page.getByRole("button", { name: "Clear" }).click();
    await page.locator("form #project-list-id").fill(EXPENSESUBMITWITHTASK);
    await page.getByRole("option", { name: EXPENSESUBMITWITHTASK }).click();
    await page.locator("#task-list-id").click();
    await page.locator("#task-list-id").fill(TASKNAME);
    await page.getByRole("option", { name: TASKNAME }).click();
    await page.getByPlaceholder("hh:mm").click();
    await page.getByPlaceholder("hh:mm").fill("10");
    await page.getByPlaceholder("miles").click();
    await page.getByPlaceholder("miles").fill("0.9");
    await page.locator('input[name="perDiem"]').click();
    await page.locator('input[name="perDiem"]').fill("34");
    await page.locator('textarea[name="message"]').click();
    await page.locator('textarea[name="message"]').fill("testing");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Worklog saved successfully")).toBeVisible({
      timeout: 150000,
    });
  });
});

test("Delete project created before @project", async ({ page }) => {
  await page.goto("/");
  await page.locator("#list").nth(1).click();
  await projectDelete(page, EXPENSESUBMITWITHOUTTASK);
  await page.waitForTimeout(5000);
  await projectDelete(page, EXPENSESUBMITWITHTASK);
});
