import { expect } from "@playwright/test";

// Constants for messages
const SUCCESS_MESSAGE = "Form submitted successfully";
const DRAFT_MESSAGE = "Form saved as draft";
const UPDATE_MESSAGE = "Form updated successfully";
const DELETE_MESSAGE = "Draft deleted successfully";
const EXPORT_MESSAGE = "Report Generated successfully";
const Reportapprove_Message = "Report Approved successfully";
const Reportreject_Message = "Report Rejected successfully";

async function clickAndFill(page, selector, text) {
  await page.getByLabel(selector).click();
  await page.getByLabel(selector).fill(text);
}
async function clickAndFill1(page, selector, text) {
  await page.getByPlaceholder(selector).click();
  await page.getByPlaceholder(selector).fill(text);
}

async function formSubmissionSteps(page, expect) {
  await page.getByRole("link", { name: "Forms", exact: true }).click();
  await clickAndFill1(page, "Search Forms", "Testing Forms");
  await page.getByPlaceholder("Search Forms").press("Enter");
  const mess_orgadmin = await page.locator('//span[text()="No Forms"]');
  const mess_other = await page.locator(
    '//span[text()="No Forms Assigned. Please contact your Administrator"]',
  );

  if (mess_orgadmin !== null && (await mess_orgadmin.isVisible())) {
    await expect(mess_orgadmin).toBeVisible();
    console.log("Searched by the OrgAdmin Role");
  } else if (mess_other !== null && (await mess_other.isVisible())) {
    await expect(mess_other).toBeVisible();
    console.log("Searched by the Other Role");
  } else {
    console.log("Neither message found for OrgAdmin nor Other Role");
  }
  await page.getByPlaceholder("Search Forms").clear();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Fill Form" })
    .click();

  // Form filling steps using clickAndFill function
  await page.waitForTimeout(5000);
  await page
    .getByRole("heading", { name: "form features" })
    .getByRole("button")
    .click();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Fill Form" })
    .click();
  await page.getByLabel("Total Structures , numeric").click();
  await page.getByLabel("Total Structures , numeric").fill("35");
  await page.getByLabel("Completed Structures ,").click();
  await page.getByLabel("Completed Structures ,").fill("23");
  await clickAndFill(page, "Issue Name", "Testing");

  // Scroll up by 100 pixels (adjust the value as needed)
  await expect(page.getByLabel("Issue Name")).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, -400));
  await page.locator('//div[@data-type="select-one"]').click();
  await page.getByRole("option", { name: "Yes" }).click();
  await page.locator('//div[@data-type="select-multiple"]').click();
  await page.getByRole("option", { name: "BackEnd" }).click();
  await page.getByRole("option", { name: "WebSite" }).click();
  await page.getByRole("option", { name: "MobileApp" }).click();
  await page.getByRole("option", { name: "FrontEnd" }).click();
  await page.getByRole("textbox", { name: "false" }).click();
  await page.getByLabel("MobileApp", { exact: true }).check();
  await page.getByLabel("BackEnd", { exact: true }).check();
  await page.getByLabel("FrontEnd", { exact: true }).check();
  await page.getByLabel("Contractor").check();
  await page.getByLabel("Visitors").check();

  await page.getByLabel("Number of Issues , numeric").click();
  await page.getByLabel("Number of Issues , numeric").fill("86686");
  await page.evaluate(() => window.scrollBy(0, -450));
  await clickAndFill1(page, "(___) ___-____", "(900) 042-2035_");
  await clickAndFill1(page, "Enter a location", "chennai");
  await clickAndFill(page, "Email", "forms.testing@kyro.us");
  await page.evaluate(() => window.scrollBy(0, -250));
  await clickAndFill(page, "Caption", "one");
  await page
    .locator('(//button[@class="btn btn-primary formio-button-add-row"])[2]')
    .click();
  await clickAndFill1(page, "(___) ___-____", "(900) 042-2035_");
  await page.evaluate(() => window.scrollBy(0, -250));
  await page
    .getByRole("cell", { name: "Phone Number , numeric only" })
    .getByLabel("Email")
    .click();
  await page
    .getByRole("cell", { name: "Phone Number , numeric only" })
    .getByLabel("Email")
    .fill("test+987685@kyro.us");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByText(SUCCESS_MESSAGE)).toBeVisible();
}
async function saveAsDraftSteps(page, expect) {
  await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Fill Form" })
    .click();
  await expect(page.getByRole("button", { name: "save" })).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText(DRAFT_MESSAGE)).toBeVisible();

  // Submitting the forms from draft page
  await page.getByRole("link", { name: "Reports", exact: true }).click();
  await page.getByRole("tab", { name: "Drafts", exact: true }).click();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Resume", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await clickAndFill1(page, "(___) ___-____", "(900) 042-2035_");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("test+987685@kyro.us");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByText(UPDATE_MESSAGE)).toBeVisible();
  await page.getByRole("tab", { name: "My Reports" }).click();
  const Allreports = page.getByRole("tab", { name: "All Reports" });
  if (await Allreports.isVisible()) {
    await Allreports.click();
  } else {
    console.log("All Reports tab is not visible");
  }
  // Submitted report saving as draft and deleting
  await page.getByRole("tab", { name: "My Reports" }).click();
  await expect(
    page
      .getByRole("row", { name: "form features 2.0" })
      .locator('//p[text()="form features 2.0"]'),
  ).toBeVisible();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .locator('//p[text()="form features 2.0"]')
    .click();
  await clickAndFill1(page, "Search Reports", "Testing Forms");
  await page.getByPlaceholder("Search Reports").press("Enter");
  await expect(page.locator('//span[text()="No Reports"]')).toBeVisible();
  await page.getByPlaceholder("Search Reports").clear();
  const elementHandle2 = await page
    .getByRole("row", { name: "form features 2.0" })
    .locator('(//button[@id="edit-button"])[1]');
  // Scroll the element into view
  await elementHandle2.evaluate((element) => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
  await elementHandle2.click();
  await expect(page.getByLabel("Issue Name")).toBeVisible();
  await expect(page.getByLabel("MobileApp", { exact: true })).toBeVisible();
  await page.getByLabel("MobileApp", { exact: true }).check();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await expect(page.getByRole("button", { name: "save" })).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Draft updated")).toBeVisible();
  await page.getByRole("tab", { name: "Drafts" }).click();
  // Locate the element using getByRole
  const elementHandle = await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Resume", exact: true });

  // Scroll the element into view
  await elementHandle.evaluate((element) => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
  await page.getByLabel("Drafts").getByLabel("svg-button").click();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText(DELETE_MESSAGE)).toBeVisible();

  // Testing the filter on All report page

  const Allreports2 = page.getByRole("tab", { name: "All Reports" });
  if (await Allreports2.isVisible()) {
    await Allreports2.click();
    await page
      .getByRole("row", { name: "form features 2.0" })
      .locator('//p[text()="form features 2.0"]')
      .click();
    await clickAndFill1(page, "Search Reports", "Testing Forms");
    await page.getByPlaceholder("Search Reports").press("Enter");
    await expect(page.locator('//span[text()="No Reports"]')).toBeVisible();
    await page.getByPlaceholder("Search Reports").clear();
    await page.getByRole("button", { name: "Open" }).first().click();
    await page.getByRole("heading", { name: "Kyro_Admin" }).click();
    await page.getByRole("button", { name: "Open" }).first().click();
    await page.getByRole("heading", { name: "Project-Manager-" }).click();
    await page.getByRole("button", { name: "Open" }).first().click();
    await page.getByRole("heading", { name: "kyro-Contributor-2" }).click();
    await page.getByLabel("Projects").click();
    await page.locator('//input[@id="project-list-id"]').fill("Testing Forms");
    await page.getByRole("tab", { name: "My Reports" }).click();
    await clickAndFill1(page, "Search Reports", "form features");
    await page.getByPlaceholder("Search Reports").press("Enter");
    await expect(
      page.locator('(//p[text()="form features 2.0"])[1]'),
    ).toBeVisible();
  } else {
    console.log("All Reports tab is not visible");
  }
}

async function submittingForm_Project(page, expect) {
  await page.getByRole("button", { name: "Home" }).click();
  await page.getByRole("link", { name: "Projects" }).click();
  await page.getByLabel("svg-button").nth(4).click();
  await clickAndFill1(page, "Search Projects", "Testing Forms");
  await page.getByPlaceholder("Search Projects").press("Enter");
  await page.getByRole("heading", { name: "Testing Forms" }).click();
  await page.getByText("Daily Logs", { exact: true }).click();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .getByRole("button", { name: "Fill Form" })
    .click();
  await page.getByLabel("Total Structures , numeric").click();
  await page.getByLabel("Total Structures , numeric").fill("35");
  await page.getByLabel("Completed Structures ,").click();
  await page.getByLabel("Completed Structures ,").fill("23");
  await clickAndFill(page, "Issue Name", "Testing");

  // Scroll up by 100 pixels (adjust the value as needed)
  await expect(page.getByLabel("Issue Name")).toBeVisible();
  await page.evaluate(() => window.scrollBy(0, -400));
  await page.locator('//div[@data-type="select-one"]').click();
  await page.getByRole("option", { name: "Yes" }).click();
  await page.locator('//div[@data-type="select-multiple"]').click();
  await page.getByRole("option", { name: "BackEnd" }).click();
  await page.getByRole("option", { name: "WebSite" }).click();
  await page.getByRole("option", { name: "MobileApp" }).click();
  await page.getByRole("option", { name: "FrontEnd" }).click();
  await page.getByRole("textbox", { name: "false" }).click();
  await page.getByLabel("MobileApp", { exact: true }).check();
  await page.getByLabel("BackEnd", { exact: true }).check();
  await page.getByLabel("FrontEnd", { exact: true }).check();
  await page.getByLabel("Contractor").check();
  await page.getByLabel("Visitors").check();

  await page.getByLabel("Number of Issues , numeric").click();
  await page.getByLabel("Number of Issues , numeric").fill("86686");
  await page.evaluate(() => window.scrollBy(0, -450));
  await clickAndFill1(page, "(___) ___-____", "(900) 042-2035_");
  await clickAndFill1(page, "Enter a location", "chennai");
  await clickAndFill(page, "Email", "forms.testing@kyro.us");
  await page.evaluate(() => window.scrollBy(0, -250));
  await clickAndFill(page, "Caption", "one");
  await page
    .locator('(//button[@class="btn btn-primary formio-button-add-row"])[2]')
    .click();
  await clickAndFill1(page, "(___) ___-____", "(900) 042-2035_");
  await page.evaluate(() => window.scrollBy(0, -250));
  await page
    .getByRole("cell", { name: "Phone Number , numeric only" })
    .getByLabel("Email")
    .click();
  await page
    .getByRole("cell", { name: "Phone Number , numeric only" })
    .getByLabel("Email")
    .fill("test+987685@kyro.us");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByText(SUCCESS_MESSAGE)).toBeVisible();
}
async function exporting_Excel(page, expect) {
  await page.getByRole("tab", { name: "My Exports" }).click();
  await page.getByRole("button", { name: "Export Data" }).click();
  await page.locator("#client").click();
  await page
    .getByRole("option", { name: "form features 2.0" })
    .locator("div")
    .first()
    .click();
  await page.locator('//input[@name="startDate"]').fill("07/10/2023");
  await page.locator('//input[@name="endDate"]').fill("09/27/2023");
  await page.getByRole("button", { name: "Last modified date" }).click();
  await page.getByRole("option", { name: "Last modified date" }).click();

  await page.getByRole("button", { name: "Newest first" }).click();
  await page.getByRole("option", { name: "Newest first" }).click();
  await page.getByRole("button", { name: "Next" }).click();

  await expect(
    page.getByRole("button", { name: "Export to Excel" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Export to Excel" }).click();
  await expect(page.getByText(EXPORT_MESSAGE)).toBeVisible();
  await page.getByPlaceholder("Search Exports").click();
  await page.getByPlaceholder("Search Exports").fill("form");
}
async function report_approvering_steps(page, expect) {
  await page.getByRole("tab", { name: "All Reports" }).click();
  await expect(
    page
      .getByRole("row", { name: "form features 2.0" })
      .locator('//p[text()="form features 2.0"]'),
  ).toBeVisible();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .locator('//p[text()="form features 2.0"]')
    .click();
  await page.getByRole("button", { name: "Open" }).first().click();
  await page
    .getByRole("option", { name: "Kyro_Admin" })
    .locator("div")
    .filter({ hasText: "Kyro_Admin" })
    .click();
  await page.getByRole("button", { name: "Open" }).first().click();
  //Approving the report for the orgadmin
  const approval = await page.locator(
    '(//button[@id="approve_submission"])[1]',
  );
  await approval.evaluate((element) => {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
  await approval.click();
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: "Approved" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Good work");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText(Reportapprove_Message)).toBeVisible();
  await page.waitForTimeout(5000);
  //Updating the report and Approving it for the PM
  await page.getByRole("button", { name: "Open" }).first().click();
  await page
    .getByRole("option", { name: "Project-Manager-1" })
    .locator("div")
    .filter({ hasText: "Project-Manager" })
    .click();
  await page
    .getByRole("row", { name: "form features 2.0" })
    .locator('(//button[@id="edit-button"])[1]')
    .click();
  await expect(page.getByRole("button", { name: "save" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await page.locator('(//button[@id="approve_submission"])[1]').click();
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: "Approved" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Greate work");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText(Reportapprove_Message)).toBeVisible();
  //Rejecting the report for the contributor
  await page.getByRole("button", { name: "Open" }).first().click();
  await page.getByRole("heading", { name: "kyro-Contributor-2" }).click();
  await page.locator('(//button[@id="approve_submission"])[1]').click();
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: "Rejected" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Update the report with valid data");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText(Reportreject_Message)).toBeVisible();
  await expect(
    page
      .getByRole("row", { name: "form features 2.0" })
      .locator('(//button[@id="edit-button"])[1]'),
  ).toBeVisible();
  await page.locator('(//button[@id="approve_submission"])[1]').click();
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: "Approved" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Update the report with valid data");
  await page.getByRole("button", { name: "Submit" }).click();
}
export {
  formSubmissionSteps,
  saveAsDraftSteps,
  submittingForm_Project,
  exporting_Excel,
  report_approvering_steps,
};
