import { test, expect } from "@playwright/test";
import { orgadmin, projectmanager } from "../common/user_details";
import {
  projectDelete,
  projectSearchAndClick,
} from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

async function projectDetailsRead(page) {
  await page.goto("/");
  await projectSearchAndClick(page, CLIENTCUSTOMFIELD);

  //update the project details
  await page.waitForTimeout(5000);
  expect(page.getByRole("combobox").first()).not.toBeEditable();
  expect(page.getByLabel("test1256").getByRole("textbox")).not.toBeEditable();
  expect(page.getByLabel("Test New").getByRole("textbox")).not.toBeEditable();
  expect(page.getByLabel("Yes").getByRole("textbox")).not.toBeEditable();
  expect(page.getByLabel("electrical").getByRole("textbox")).not.toBeEditable();
  expect(page.getByPlaceholder("mm/dd/yyyy").first()).not.toBeEditable();
  expect(page.getByPlaceholder("mm/dd/yyyy").nth(1)).not.toBeEditable();
  expect(page.getByRole("button", { name: "Active" })).not.toBeEditable();
  expect(page.getByPlaceholder("Add a description...")).not.toBeEditable();

  //Updating the custom fields
  expect(
    page.getByLabel("testing1345").getByRole("textbox"),
  ).not.toBeEditable();
  expect(
    page
      .getByLabel("there is a issue on the")
      .getByText("there is a issue on the"),
  ).not.toBeEditable();
  expect(page.getByRole("spinbutton")).not.toBeEditable();
  expect(page.getByPlaceholder("mm/dd/yyyy").nth(2)).not.toBeEditable();
  expect(page.getByRole("combobox").nth(1)).not.toBeEditable();
  expect(page.getByPlaceholder("Select")).not.toBeEditable();
}

const NUM = Math.floor(Math.random() * 100000) + 1;
const CLIENTCUSTOMFIELD = `custom-field${NUM}`;
const LOCATION = `chennai${NUM}`;
test.describe.configure({ mode: "serial" });
test("Create the public project with client level custom field @project", async ({
  page,
}) => {
  const { projectCreation, listMenu } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  await projectCreation.createProject();
  const text = page.getByLabel("Text *");
  const textarea = page.getByLabel("textarea *");
  const number = page.getByLabel("number *");
  const date = page.getByPlaceholder("mm/dd/yyyy");
  const people = page.getByLabel("people *");
  const select = page.getByLabel("select *");
  await page.waitForTimeout(5000);
  await projectCreation.client().click();
  const inputclient = "Test New";
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
  await projectCreation.projectName().fill(CLIENTCUSTOMFIELD);
  await projectCreation.projectManager().click();
  const outputprojectname = await projectCreation
    .projectName()
    .getAttribute("value");
  expect(CLIENTCUSTOMFIELD).toBe(outputprojectname);
  const inputpm = projectmanager.name;
  const waitingforprojectmanager = page.waitForResponse(
    (response) =>
      response.url() ===
        `${process.env.API_URL}/users?limit=1000&status=Active` &&
      response.status() === 200,
  );
  await page.getByRole("option", { name: inputpm }).click();
  const responseforsetting = await waitingforprojectmanager;
  await projectCreation.billingCode().click();
  const outputpm = await projectCreation.projectManager().getAttribute("value");
  const inputbillingcode = "test123";
  await projectCreation.billingCode().fill(inputbillingcode);
  await text.click();
  const outputbillingcode = await projectCreation
    .billingCode()
    .getAttribute("value");
  expect(inputbillingcode).toBe(outputbillingcode);

  // check the custom fields for the particular project
  const inputtext = "testing";
  await text.fill(inputtext);
  await textarea.click();
  const outputtext = await text.getAttribute("value");
  expect(inputtext).toBe(outputtext);
  const inputtextarea = "49/9 karapakkam,chennai";
  await textarea.fill(inputtextarea);
  await number.click();
  expect(textarea).toHaveText("49/9 karapakkam,chennai");
  const inputnumber = "345";
  await number.fill(inputnumber);
  await date.click();
  const outputnumber = await number.getAttribute("value");
  expect(inputnumber).toBe(outputnumber);
  await page.getByRole("gridcell", { name: "5", exact: true }).click();
  await people.click();
  await page.getByRole("heading", { name: "kyro-Pm" }).click();
  await select.click();
  const outputpeople = await people.getAttribute("value");
  expect("kyro-Pm").toBe(outputpeople);
  await page.getByRole("option", { name: "test", exact: true }).click();
  await page.getByLabel("select", { exact: true }).click();
  await page.getByRole("option", { name: "test1" }).click();
  await projectCreation.description().click();
  const inputdescription = "testing for custom field";
  await projectCreation.description().fill(inputdescription);
  expect(projectCreation.description()).toHaveText("testing for custom field");
  await projectCreation.projectName().click();
  expect(inputpm).toBe(outputpm);
  await projectCreation.submitProject();
  await expect(
    page.getByRole("heading", { name: CLIENTCUSTOMFIELD }),
  ).toBeVisible();
});

test("Org admin - Update the project details @project", async ({ page }) => {
  test.setTimeout(240000);
  await page.goto("/");
  await projectSearchAndClick(page, CLIENTCUSTOMFIELD);

  //update the project details
  await page.waitForTimeout(5000);
  await page.getByRole("combobox").first().click();
  await page
    .getByRole("option", { name: orgadmin.name })
    .getByRole("heading", { name: orgadmin.name })
    .click();
  await page.getByLabel("test123").getByRole("textbox").click();
  await page.getByLabel("test123").getByRole("textbox").fill("test124");
  await page.getByLabel("test123").getByRole("textbox").press("Enter");
  await page.getByRole("button", { name: "Yes" }).click();
  expect(page.getByLabel("Test New").getByRole("textbox")).not.toBeEditable();
  expect(page.getByLabel("Yes").getByRole("textbox")).not.toBeEditable();
  expect(page.getByLabel("electrical").getByRole("textbox")).not.toBeEditable();
  await page.getByPlaceholder("mm/dd/yyyy").first().click();
  await page.getByRole("gridcell", { name: "3", exact: true }).click();
  await page.getByPlaceholder("mm/dd/yyyy").nth(1).click();
  await page.getByRole("gridcell", { name: "18" }).click();
  await page.getByRole("button", { name: "Active" }).click();
  await page.getByRole("option", { name: "Cancelled" }).click();

  await page.waitForTimeout(5000);
  await page.getByRole("heading", { name: "ADD LOCATION" }).click();
  await page.getByText("Add New Location").click(); //add the location
  await page.getByLabel("Location Name").click();
  await page.getByLabel("Location Name").fill(LOCATION);
  await page.getByLabel("Description").click();
  await page.getByLabel("Description").fill("testing");
  await page.getByRole("button", { name: "Add Location" }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText(LOCATION)).toBeVisible(); // check the location is visible or not

  await page.getByPlaceholder("Add a description...").dblclick();
  await page
    .getByPlaceholder("Add a description...")
    .fill("testing the description");

  //Updating the custom fields
  const textbox = page.getByLabel("testing").getByRole("textbox");
  const textarea = page
    .getByLabel("/9 karapakkam,chennai")
    .getByText("/9 karapakkam,chennai");
  const number = page.getByRole("spinbutton");
  await page.waitForTimeout(5000);
  await textbox.click();
  await textbox.fill("testing123");
  await textarea.click();
  const outputtextbox = await textbox.getAttribute("value");
  expect(outputtextbox).toBe("testing123");
  await textarea.fill("there is a issue on the application");
  await number.click();
  await number.fill("567");
  await page.waitForTimeout(3000);
  await page.getByPlaceholder("mm/dd/yyyy").nth(2).click();
  await page.getByRole("gridcell", { name: "23" }).click();
  await page.getByRole("combobox").nth(1).click();
  await page.getByRole("heading", { name: "kyro-orgadmin" }).click();
  await page.getByPlaceholder("Select").click();
  await page.getByRole("option", { name: "test2" }).click();
  await page.getByRole("option", { name: "test1" }).click();
});

test.describe("Check The Pm public project", () => {
  test.use({
    storageState: "pm.json",
  });
  test("PM - Update the project details @project", async ({ page }) => {
    await page.goto("/");
    await projectSearchAndClick(page, CLIENTCUSTOMFIELD);

    //update the project details
    await page.waitForTimeout(5000);
    await page.getByRole("combobox").first().click();
    await page
      .getByRole("option", { name: projectmanager.name })
      .getByRole("heading", { name: projectmanager.name })
      .click();
    await page.getByLabel("test124").getByRole("textbox").click();
    await page.getByLabel("test124").getByRole("textbox").fill("test1256");
    await page.getByLabel("test124").getByRole("textbox").press("Enter");
    await page.getByRole("button", { name: "Yes" }).click();
    expect(page.getByLabel("Test New").getByRole("textbox")).not.toBeEditable();
    expect(page.getByLabel("Yes").getByRole("textbox")).not.toBeEditable();
    expect(
      page.getByLabel("electrical").getByRole("textbox"),
    ).not.toBeEditable();
    await page.getByPlaceholder("mm/dd/yyyy").first().click();
    await page.getByRole("gridcell", { name: "5", exact: true }).click();
    await page.getByPlaceholder("mm/dd/yyyy").nth(1).click();
    await page.getByRole("gridcell", { name: "24" }).click();
    await page.getByRole("button", { name: "Cancelled" }).click();
    await page.getByRole("option", { name: "Active", exact: true }).click();

    await page.waitForTimeout(5000);
    await page.getByText(LOCATION).click();

    // check if we able to update the location by using search location
    await page.getByPlaceholder("Search Saved Location").click();
    await page.waitForTimeout(5000);
    await page.getByPlaceholder("Search Saved Location").fill("texas");
    await page.getByRole("option", { name: "texas", exact: true }).click();
    await expect(page.getByText("texas")).toBeVisible();

    await page.getByPlaceholder("Add a description...").dblclick();
    await page
      .getByPlaceholder("Add a description...")
      .fill("testing the description by PM");

    //Updating the custom fields
    const textbox = page.getByLabel("testing123").getByRole("textbox");
    const textarea = page
      .getByLabel("there is a issue on the")
      .getByText("there is a issue on the");
    const number = page.getByRole("spinbutton");
    await page.waitForTimeout(5000);
    await textbox.click();
    await textbox.fill("testing1345");
    await textarea.click();
    const outputtextbox = await textbox.getAttribute("value");
    expect(outputtextbox).toBe("testing1345");
    await textarea.fill("there is a issue on the application by PM");
    await number.click();
    await number.fill("234");
    await page.waitForTimeout(3000);
    await page.getByPlaceholder("mm/dd/yyyy").nth(2).click();
    await page.getByRole("gridcell", { name: "26" }).click();
    await page.getByRole("combobox").nth(1).click();
    await page.getByRole("heading", { name: "kyro-Pm" }).click();
    await page.getByPlaceholder("Select").click();
    await page.getByRole("option", { name: "test", exact: true }).click();
    await page.getByRole("option", { name: "test1" }).click();
  });
});

test.describe("Check The contributor public project", () => {
  test.use({
    storageState: "contributor.json",
  });
  test("Contributor - Update the project details @project", async ({
    page,
  }) => {
    await projectDetailsRead(page);
  });
});

test.describe("Check The guest public project", () => {
  test.use({
    storageState: "guest.json",
  });
  test("Guest - Update the project details @project", async ({ page }) => {
    await projectDetailsRead(page);
  });
});

test.describe("Check The tsadmin public project", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("Tsadmin - Update the project details @project", async ({ page }) => {
    await projectDetailsRead(page);
  });
});

test.describe("Check The tsapprover public project", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("Tsapprover - Update the project details @project", async ({ page }) => {
    await projectDetailsRead(page);
  });
});

test("Delete all the project created before on this page @project", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#list").nth(1).click();
  await projectDelete(page, CLIENTCUSTOMFIELD);
});
