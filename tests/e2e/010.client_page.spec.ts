import { test, expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";
import {
  add_textfield_customfield_steps,
  add_number_customfield_steps,
  add_select_customfield_steps,
  add_people_customfield_steps,
  add_date_customfield_steps,
  add_textfield1_customfield_steps,
  add_number1_customfield_steps,
  TEXTFIELD,
  NUMBER,
  DATE,
  PEOPLE,
  SELECT,
  TEXTFIELD1,
} from "../common/add_customfileds";
import { projectmanager } from "../common/user_details";
import {
  projectDelete,
  projectSearchAndClick,
} from "../common/ProjectAndTaskCraetion ";

async function customFields(page, entityName: string) {
  const { listMenu } = initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  await listMenu.customFields().click();
  await page.getByRole("tab", { name: "Clients" }).click();
  await page.locator("#client-dropdown").click();
  await page.getByRole("heading", { name: CLIENTNAME }).click();
  await page.locator("#entity-filter").click();
  await page.getByRole("option", { name: entityName }).click();
  await add_textfield_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_number_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_people_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_date_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_select_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_textfield1_customfield_steps(page, expect);
  await page.waitForTimeout(3000);
  await add_number1_customfield_steps(page, expect);
}

let NUM = Math.floor(Math.random() * 100000) + 1;
const CLIENTNAME = `kyroclient${NUM}`;
const CLIENTEMAIL = `tps${NUM}@kyro.us`;
const CLIENTUSERNAME = `dinesh${NUM}`;
const CLIENTUSEREMAIL = `test+${NUM}@kyro.us`;
const inputPhone = "(989) 899-8111";
const inputAddress = "jawahar street, cuddalore-607890";
const inputPOC = "testing";
const inputJobTitle = "sde";

const locator = `#${CLIENTUSERNAME}_id`;
const CLIENTCUSTOMFIELD = `custom-field${NUM}`;
test.describe.configure({ mode: "serial" });
test("client-page end to end testing @client", async ({ page }) => {
  const { listMenu, clientPage } = initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  await listMenu.clients().click();

  // Step 2: Add a Client
  await clientPage.addClient(
    CLIENTNAME,
    inputPOC,
    CLIENTEMAIL,
    inputPhone,
    inputAddress,
  );

  // Step 3: Verify Client Added Successfully
  await clientPage.verifyClientAddedSuccessfully();

  // Step 4: Invite a Client User
  await clientPage.inviteClientUser(
    CLIENTUSERNAME,
    CLIENTUSEREMAIL,
    inputPhone,
    inputJobTitle,
  );

  // Step 5: Verify User Invited Successfully
  await clientPage.verifyUserInvitedSuccessfully();

  // Step 6: Delete the Client User
  // await clientPage.deleteClientUser(CLIENTUSEREMAIL );
});

test("custom fields adding on client level for project @custom-fields", async ({
  page,
}) => {
  await customFields(page, "Project");
});

test("custom fields adding on client level for task @custom-fields", async ({
  page,
}) => {
  await customFields(page, "Task");
});

test("custom fields adding on client level for worklog @custom-fields", async ({
  page,
}) => {
  await customFields(page, "Worklog");
});

test("Create the project with client level custom field to check @custom-fields", async ({
  page,
}) => {
  const { listMenu, projectCreation } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  // await listMenu.users().click();
  // const responseforuser = page.waitForResponse(
  //   `${process.env.API_URL}/users?is_kyro_user=true&name=&offset=0&limit=25`,
  // );
  // await listMenu.adminMenu().click();
  // const response2 = await (await responseforuser).json();
  // let userid = "";
  // userid = userid = response2.users.find(
  //   (user: { display_name: string }) => user.display_name === "kyro-Pm",
  // ).id;
  // console.log(userid);
  await projectCreation.createProject();
  const Textfield = `${TEXTFIELD} *`;
  const text = page.getByLabel(Textfield);
  const num = `${NUMBER} *`;
  const number = page.getByLabel(num);
  const datecustom = `${DATE} *`;
  const date = page.getByLabel(datecustom);
  const peoplecustom = `${PEOPLE} *`;
  const people = page.getByLabel(peoplecustom);
  const selectcustom = `${SELECT} *`;
  const select = page.getByLabel(selectcustom);
  const textfield1 = `${TEXTFIELD1} *`;
  const text1 = page.getByLabel(textfield1);
  await projectCreation.client().click();
  const inputclient = CLIENTNAME;
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
  await number.click();
  const outputtext = await text.getAttribute("value");
  expect(inputtext).toBe(outputtext);
  const inputnumber = "345";
  await number.fill(inputnumber);
  await people.click();
  const outputnumber = await number.getAttribute("value");
  expect(inputnumber).toBe(outputnumber);
  await page.getByRole("heading", { name: "kyro-Pm" }).click();
  await date.click();
  const outputpeople = await people.getAttribute("value");
  expect("kyro-Pm").toBe(outputpeople);
  await page.getByRole("gridcell", { name: "5", exact: true }).click();
  await select.click();
  await page.getByRole("option", { name: "test", exact: true }).click();
  await text1.click();
  const inputtext1 = "12345";
  await text1.fill(inputtext1);
  await projectCreation.description().click();
  const outputtext1 = await text1.getAttribute("value");
  expect(outputtext1).toBe(inputtext1);
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

test("Create the task with client level custom field to check @custom-fields", async ({
  page,
}) => {
  const { projectDetails, taskcreation } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  await projectSearchAndClick(page, CLIENTCUSTOMFIELD);
  await projectDetails.taskTab().click();
  await taskcreation.createTask();
  await taskcreation.summary().click();
  await taskcreation.summary().fill("custom field");
  await taskcreation.description().click();
  await taskcreation
    .description()
    .fill("testing the custom field on task level");
  const Textfield = `${TEXTFIELD} *`;
  const text = page.getByLabel(Textfield);
  const num = `${NUMBER} *`;
  const number = page.getByLabel(num);
  const datecustom = `${DATE} *`;
  const date = page.getByLabel(datecustom);
  const peoplecustom = `${PEOPLE} *`;
  const people = page.getByLabel(peoplecustom);
  const selectcustom = `${SELECT} *`;
  const select = page.getByLabel(selectcustom);
  const textfield1 = `${TEXTFIELD1} *`;
  const text1 = page.getByLabel(textfield1);

  // check the custom fields for the particular project
  await text.click();
  const inputtext = "testing";
  await text.fill(inputtext);
  await number.click();
  const outputtext = await text.getAttribute("value");
  expect(inputtext).toBe(outputtext);
  const inputnumber = "345";
  await number.fill(inputnumber);
  await people.click();
  const outputnumber = await number.getAttribute("value");
  expect(inputnumber).toBe(outputnumber);
  await page.getByRole("heading", { name: "kyro-Pm" }).click();
  await date.click();
  const outputpeople = await people.getAttribute("value");
  expect("kyro-Pm").toBe(outputpeople);
  await page.getByRole("gridcell", { name: "5", exact: true }).click();
  await select.click();
  await page.getByRole("option", { name: "test", exact: true }).click();
  await text1.click();
  const inputtext1 = "12345";
  await text1.fill(inputtext1);
  const outputtext1 = await text1.getAttribute("value");
  expect(outputtext1).toBe(inputtext1);
  await taskcreation.submitTask();
  await expect(
    page.getByRole("heading", { name: "custom field" }),
  ).toBeVisible();
});

test("Create the worklog with client level custom field to check @custom-fields", async ({
  page,
}) => {
  const { projectDetails, logtime } = initPageManager(page);

  const responseforsettings = page.waitForResponse(
    `${process.env.API_URL}/projects?offset=0&limit=25`,
  );
  await page.goto("/");
  const responseforname = await responseforsettings;
  await projectSearchAndClick(page, CLIENTCUSTOMFIELD);
  await projectDetails.logTime().click();
  await logtime.duration().click();
  await logtime.duration().fill("06:00");
  const Textfield = `input[name="${TEXTFIELD}"]`;
  const text = page.locator(Textfield);
  const number = page.getByRole("spinbutton");
  const date = page.getByRole("textbox", { name: "mm/dd/yyyy" });
  const peoplecustom = `#${PEOPLE}`;
  const people = page.locator(peoplecustom);
  const selectcustom = `#${SELECT}`;
  const select = page.locator(selectcustom);
  const textfield1 = `input[name="${TEXTFIELD1}"]`;
  const text1 = page.locator(textfield1);

  // check the custom fields for the particular project
  await text.click();
  const inputtext = "testing";
  await text.fill(inputtext);
  await number.click();
  const outputtext = await text.getAttribute("value");
  expect(inputtext).toBe(outputtext);
  const inputnumber = "345";
  await number.fill(inputnumber);
  await people.click();
  const outputnumber = await number.getAttribute("value");
  expect(inputnumber).toBe(outputnumber);
  await page.getByRole("heading", { name: "kyro-Pm" }).click();
  await date.click();
  const outputpeople = await people.getAttribute("value");
  expect("kyro-Pm").toBe(outputpeople);
  await page.getByRole("gridcell", { name: "5", exact: true }).click();
  await select.click();
  await page.getByRole("option", { name: "test", exact: true }).click();
  await text1.click();
  const inputtext1 = "12345";
  await text1.fill(inputtext1);
  const outputtext1 = await text1.getAttribute("value");
  expect(outputtext1).toBe(inputtext1);
  await logtime.message().click();
  await logtime.message().fill("testing the application");
  await logtime.saveButton().click();
  await expect(page.getByText("Worklog saved successfully")).toBeVisible();
});

test("Delete all the project created before on custom fied @custom-fields", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#list").nth(1).click();
  await projectDelete(page, CLIENTCUSTOMFIELD);
});
