import { test, expect } from "@playwright/test";
import {
  notifyContributor,
  notifyorgAdmin,
  notifyPM,
} from "../common/user_details";
import {
  projectName,
  taskCreationSteps,
  taskName,
} from "../common/ProjectAndTaskCraetion ";

test.describe.configure({ mode: "serial" });
test.describe("Verifing the Notifications", () => {
  test.use({
    storageState: "notifyorgAdmin.json",
  });

  test.skip("Verifying the assigning of project @notification", async ({
    page,
  }) => {
    const responseforsettings = page.waitForResponse(
      `${process.env.API_URL}/projects?offset=0&limit=25`,
    );
    await page.goto("/");
    const responseforname = await responseforsettings;
    await page.getByRole("button", { name: "Admin" }).click();
    await page.getByRole("link", { name: "Organization" }).click();
    const responseforuser = page.waitForResponse(
      `${process.env.API_URL}/users?is_kyro_user=true&name=&offset=0&limit=25`,
    );
    await page.getByRole("link", { name: "Users" }).click();
    const response2 = await (await responseforuser).json();
    let userid = "";
    userid = userid = response2.users.find(
      (user: { display_name: string }) =>
        user.display_name === "Project-Manager",
    ).id;
    console.log(userid);
    await page.getByRole("button", { name: "Manage" }).click();
    await page.getByRole("link", { name: "Projects" }).click();
    await page.locator("button").filter({ hasText: "Create Project" }).click();
    const orgclient = page.locator("#client");
    const protype = page.locator("#project-type");
    const projectname = page.getByLabel("Project Name *");
    const pm = page.getByLabel("Project Manager");
    const probillingcode = page.getByLabel("Billing Code");
    const prodescription = page.getByLabel("Description");
    await orgclient.click();
    const inputclient = "TPS";
    await page
      .getByRole("option", { name: inputclient })
      .locator("div")
      .filter({ hasText: inputclient })
      .click();
    await page.waitForTimeout(5000);
    await protype.click();
    const outputclient = await orgclient.getAttribute("value");
    expect(inputclient).toBe(outputclient);
    const inputprojecttype = "Airport Construction";
    await page.getByRole("option", { name: inputprojecttype }).click();
    const outputprojecttype = await protype.getAttribute("value");
    expect(inputprojecttype).toBe(outputprojecttype);
    await page.getByLabel("Enable Tasks").check();
    await page.getByRole("button", { name: "Next" }).click();
    await projectname.click();
    await projectname.fill(projectName);
    await pm.click();
    const outputprojectname = await projectname.getAttribute("value");
    expect(projectName).toBe(outputprojectname);
    const inputpm = notifyPM.name;
    const waitingforprojectmanager = page.waitForResponse(
      (response) =>
        response.url() === `${process.env.API_URL}/users/${userid}` &&
        response.status() === 200,
    );
    await page.getByRole("option", { name: inputpm, exact: true }).click();
    const responseforsetting = await waitingforprojectmanager;
    await probillingcode.click();
    const outputpm = await pm.getAttribute("value");
    expect(inputpm).toBe(outputpm);
    const inputbillingcode = "mp1234";
    await probillingcode.fill(inputbillingcode);
    await prodescription.click;
    const outputbillingcode = await probillingcode.getAttribute("value");
    expect(inputbillingcode).toBe(outputbillingcode);
    const inputdescription = "testing";
    await prodescription.fill(inputdescription);
    expect(prodescription).toHaveText(inputdescription);
    await projectname.click();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByLabel("breadcrumb").getByRole("heading", { name: projectName }),
    ).toBeVisible();
  });
});

test.describe("Verifing the Notification by PM", () => {
  test.use({
    storageState: "notifyPM.json",
  });

  test.skip("Verifying the notification of project @notification", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("BellOutlineIcon").click();
    const projectnoti = "Kyro_Admin assigned you a project";
    const combinedvalue = `${projectnoti} - ${projectName}`;
    await page.waitForTimeout(5000);
    await page.getByText(combinedvalue).click();
    await page.waitForTimeout(5000);
    await page.getByTestId("BellOutlineIcon").click();
    await page.getByRole("tab", { name: "Members" }).click();
    await page.getByRole("button", { name: "Add Members" }).click();
    await page.getByPlaceholder("Search User", { exact: true }).click();
    await page
      .getByPlaceholder("Search User", { exact: true })
      .fill(notifyContributor.name);
    await page
      .getByRole("option", { name: notifyContributor.name, exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Add Members", exact: true })
      .click();
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByRole("tab", { name: "Tasks" }).click();

    await taskCreationSteps(page, notifyContributor.name, taskName, "testing");

    await expect(page.getByText(taskName)).toBeVisible();
  });
});
test.describe("Verifing the Notification by Contributor", () => {
  test.use({
    storageState: "notifyContributor.json",
  });

  test.skip("Verifying the notification of task @notification", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("BellOutlineIcon").click();
    const tasknoti = "Project-Manager assigned a task";
    const combinedvalue1 = `${tasknoti} - ${taskName}`;
    await page.waitForTimeout(5000);
    await page.getByText(combinedvalue1).click();
    await page.waitForTimeout(3000);
    //await expect(page.getByRole('heading', { name: taskName })).toBeVisible();
    await page.getByTestId("BellOutlineIcon").click();
    await page.getByRole("button", { name: "Initiated" }).click();
    await page.getByRole("option", { name: "Complete" }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole("button", { name: "Complete" })).toBeVisible();
  });
});

test.describe("Verifing the Notification by PM", () => {
  test.use({
    storageState: "notifyPM.json",
  });

  test.skip("Verifying the notification of task status @notification", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("BellOutlineIcon").click();
    const taskstatus = "Kyro-Contributor set task status to Complete";
    const combinedvalue2 = `${taskstatus} - ${taskName}`;
    await page.waitForTimeout(5000);
    await page.getByText(combinedvalue2).click();
    await page.waitForTimeout(3000);
    await expect(page.getByRole("heading", { name: taskName })).toBeVisible();
    await page.getByTestId("BellOutlineIcon").click();
    await page.getByRole("tab", { name: "Notes" }).click();
    await page.getByLabel("Notes * ").click();
    await page.getByLabel("Notes * ").fill("Good Work Buddy");
    await page.getByRole("button", { name: "Add Note" }).click();
    await expect(page.getByText("Comment created successfully.")).toBeVisible();
    await page.getByRole("link", { name: "Projects" }).click();
    await page.getByPlaceholder("Search Projects").click();
    await page.getByPlaceholder("Search Projects").fill(projectName);
    await page.getByPlaceholder("Search Projects").press("Enter");
    await expect(page.getByText(projectName)).toBeVisible();
    await page.getByLabel(projectName).click();
    await page.waitForTimeout(3000);
    await page.getByRole("button", { name: "Active" }).click();
    await page.getByRole("option", { name: "Complete" }).click();
    await page.getByRole("combobox").click();
    await page.waitForTimeout(2000);
    await page.getByRole("option", { name: notifyorgAdmin.name }).click();
    await page.waitForTimeout(2000);
  });
});
test.describe("Verifing the Notification by OrgAdmin", () => {
  test.use({
    storageState: "notifyorgAdmin.json",
  });

  test.skip("Verifying the status of project @notification", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("BellOutlineIcon").click();
    const projectnoti1 = "Project-Manager assigned you a project";
    const combinedvalue3 = `${projectnoti1} - ${projectName}`;
    await page.waitForTimeout(5000);
    await page.getByText(combinedvalue3).click();
    await page.waitForTimeout(5000);
    await page.getByTestId("BellOutlineIcon").click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole("button", { name: "Complete" })).toBeVisible();
    await page.getByRole("tab", { name: "Notes" }).click();
    await page.getByLabel("Notes * ").click();
    await page.getByLabel("Notes * ").fill("Good Work Buddy");
    await page.getByRole("button", { name: "Add Note" }).click();
    await expect(page.getByText("Comment created successfully.")).toBeVisible();
  });
});
