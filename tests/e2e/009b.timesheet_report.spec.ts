import { test, expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

let tsadminuserid = "";
async function payrollreport(
  page,
  billingtype: String,
  startdate: String,
  enddate: String,
) {
  const { timesheets, listMenu } = initPageManager(page);
  await listMenu.manageMenu().click();
  await listMenu.timesheets().click();
  await timesheets.timesheetReports().click();
  await timesheets.generateReport().click();
  await page.getByRole("button", { name: "Both" }).click();
  await page.getByRole("option", { name: billingtype }).click();
  await timesheets.startDate().click();
  await timesheets.startDate().fill(startdate);
  await page.getByRole("gridcell", { name: "3" }).first().click();
  await timesheets.endDate().click();
  await timesheets.endDate().fill(enddate);
}

async function clientreport(
  page,
  client: String,
  project: String,
  startdate: String,
  enddate: String,
) {
  const { timesheets } = initPageManager(page);
  await timesheets.payroll().click();
  await page.getByRole("option", { name: "For Clients" }).click();
  await timesheets.generateReport().click();
  await timesheets.client().click();
  await page.waitForTimeout(5000);
  await timesheets.client().fill(client);
  await page.getByRole("option", { name: client }).click();
  await timesheets.project().click();
  await page.getByRole("option", { name: project }).click();
  await timesheets.startDate().click();
  await timesheets.startDate().fill(startdate);
  await timesheets.endDate().click();
  await timesheets.endDate().fill(enddate);
}

async function expensereport(
  page,
  client: String,
  project: String,
  user: String,
  startdate: String,
  enddate: String,
) {
  const { timesheets } = initPageManager(page);
  await timesheets.clientReport().click();
  await page.getByRole("option", { name: "For Expense" }).click();
  await timesheets.generateReport().click();
  await timesheets.client().click();
  await page.getByRole("option", { name: client }).click();
  await timesheets.project().click();
  await page.getByRole("option", { name: project }).click();
  await timesheets.user().click();
  await page.getByRole("option", { name: user }).click();
  await timesheets.startDate().click();
  await timesheets.startDate().fill(startdate);
  await timesheets.endDate().click();
  await timesheets.endDate().fill(enddate);
  await timesheets.generateReport().click();
  await expect(
    page.getByRole("heading", {
      name: "Expense Report Generated Successfully",
    }),
  ).toBeVisible();
}

test("create the report For Org Admin @timesheet", async ({ page }) => {
  const { timesheets, listMenu } = initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  const responseforuser = page.waitForResponse(
    `${process.env.API_URL}/users?is_kyro_user=true&name=&user_type=Internal%2CClient&offset=0&limit=25`,
  );
  await listMenu.users().click();
  const response2 = await (await responseforuser).json();
  let orguserid = "";
  orguserid = response2.users.find(
    (user: { display_name: string }) => user.display_name === "kyro-orgadmin",
  ).id;
  tsadminuserid = response2.users.find(
    (user: { display_name: string }) => user.display_name === "kyro-tsadmin",
  ).id;
  console.log(orguserid);
  console.log(tsadminuserid);
  await payrollreport(page, "Both", "08/03/2024", "08/06/2024");
  const responsefordocument = page.waitForResponse(
    (response) =>
      response.url() ===
        `${process.env.API_URL}/documents?created_by=${orguserid}&kyro_tags=worklog-report&sort_by=created_at&order=desc&offset=0&limit=15` &&
      response.status() === 200,
  );
  await timesheets.generateReport().click();
  const response = await responsefordocument;
  await expect(
    page.getByRole("heading", {
      name: "Payroll Report Generated Successfully",
    }),
  ).toBeVisible();
  await clientreport(
    page,
    "Test Client 123",
    "All",
    "08/03/2024",
    "08/06/2024",
  );
  const responsefordocument2 = page.waitForResponse(
    (response) =>
      response.url() ===
        `${process.env.API_URL}/documents?created_by=${orguserid}&kyro_tags=client-project-report&sort_by=created_at&order=desc&offset=0&limit=15` &&
      response.status() === 200,
  );
  await timesheets.generateReport().click();
  const response3 = await responsefordocument2;
  await expect(
    page.getByRole("heading", { name: "Client Report Generated Successfully" }),
  ).toBeVisible();
  await expensereport(page, "All", "All", "All", "08/03/2024", "08/06/2024");
});

test.describe("Create Timesheet report", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("create the report For ts-admin @timesheet", async ({ page }) => {
    const { timesheets } = initPageManager(page);
    await page.goto("/");
    await payrollreport(page, "Both", "08/03/2024", "08/06/2024");
    const responsefordocument = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/documents?created_by=${tsadminuserid}&kyro_tags=worklog-report&sort_by=created_at&order=desc&offset=0&limit=15` &&
        response.status() === 200,
    );
    await timesheets.generateReport().click();
    const response = await responsefordocument;
    await expect(
      page.getByRole("heading", {
        name: "Payroll Report Generated Successfully",
      }),
    ).toBeVisible();
    await clientreport(
      page,
      "Test Client 123",
      "All",
      "08/03/2024",
      "08/06/2024",
    );
    const responsefordocument2 = page.waitForResponse(
      (response) =>
        response.url() ===
          `${process.env.API_URL}/documents?created_by=${tsadminuserid}&kyro_tags=client-project-report&sort_by=created_at&order=desc&offset=0&limit=15` &&
        response.status() === 200,
    );
    await timesheets.generateReport().click();
    const response3 = await responsefordocument2;
    await expect(
      page.getByRole("heading", {
        name: "Client Report Generated Successfully",
      }),
    ).toBeVisible();
    await expensereport(page, "All", "All", "All", "08/03/2024", "08/06/2024");
  });
});
