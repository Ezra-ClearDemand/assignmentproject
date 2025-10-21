import { test, expect } from "@playwright/test";
import { projectDelete } from "../common/ProjectAndTaskCraetion ";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

const NUM = Math.floor(Math.random() * 100000) + 1;
const SCANWORK = `Testing${NUM}`;
const CLIENTCUSTOMFIELD = `custom-field${NUM}`;

test.describe.configure({ mode: "serial" });
test("Create a project with already existing name @project", async ({
  page,
}) => {
  const { projectCreation } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforsetting = await responseforsettings;
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
  await projectCreation.projectType().click();
  await page.getByRole("option", { name: "electrical" }).click();
  await projectCreation.markAsPublic().check();
  await projectCreation.nextButton().click();
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill("china");
  const responseforsubmit = page.waitForResponse(
    `${process.env.API_URL}/projects`,
  );
  await projectCreation.submitProject();
  const responseforname = await responseforsubmit;
  await expect(page.getByText("Project Name already exists")).toBeVisible(); //check the user not able to create the project with same name
});

test("Create the project with scan work-order @project", async ({ page }) => {
  const { projectCreation } = initPageManager(page);

  // Navigate to the page
  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;

  // Click 'Create Project' button
  await projectCreation.createProject();

  // Fill in client details
  await page.waitForTimeout(5000);
  await projectCreation.client().click();
  const inputclient = "Test Client 123";
  await projectCreation.client().fill(inputclient);
  await page
    .getByRole("option", { name: inputclient })
    .locator("div")
    .filter({ hasText: inputclient })
    .click();

  // Select project type
  await projectCreation.projectType().click();
  await page.getByRole("option", { name: "electrical" }).click();

  // Click 'Next'
  await projectCreation.nextButton().click();

  // Upload scan work order
  const responsePromise = page.waitForResponse(
    `${process.env.API_URL}/documents/upload/project?override=true`,
  );
  await page
    .getByRole("button", { name: "Scan Work Order" })
    .setInputFiles("./e2e/images/scan work order.jpg");
  const response = await (await responsePromise).json();
  const documentid = response["id"];

  // Wait for document analysis
  await page.waitForResponse(
    `${process.env.API_URL}/analyze/document?document_id=${documentid}&required_fields=Project%20Name,Billing%20Code,Description`,
  );

  // Assertion on project details
  const inputprojectname = "Testing";
  const outputprojectname = await projectCreation
    .projectName()
    .getAttribute("value");
  expect(inputprojectname).toBe(outputprojectname);
  await expect(projectCreation.description()).toHaveText(
    "Testing the scan work",
  );

  // Change project name
  await projectCreation.projectName().click();
  await projectCreation.projectName().fill(SCANWORK);

  // Assertion on billing code
  const inputbillingcode = "WO-1234";
  const outputbillingcode = await projectCreation
    .billingCode()
    .getAttribute("value");
  expect(outputbillingcode).toBe(inputbillingcode);

  // Submit the form
  await projectCreation.submitProject();

  // Assertion on project creation
  await expect(page.getByRole("heading", { name: SCANWORK })).toBeVisible();
});

test("Delete all the project created before @project", async ({ page }) => {
  await page.goto("/");
  await page.locator("#list").nth(1).click();
  await projectDelete(page, SCANWORK);
});
