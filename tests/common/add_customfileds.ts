import { expect } from "@playwright/test";

async function customfieldsadding(page, name: string, type: string) {
  await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByPlaceholder("Enter the name of the custom field").click();
  await page.getByPlaceholder("Enter the name of the custom field").fill(name);
  await page
    .getByPlaceholder("Enter the name of the custom field")
    .press("Enter");
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: type }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .check();
  await expect(page.getByRole("button", { name: "Reset" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Custom Field added successfully")).toBeVisible();
}

async function customfieldstype(page, name: string, type: string) {
  await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByPlaceholder("Enter the name of the custom field").click();
  await page.getByPlaceholder("Enter the name of the custom field").fill(name);
  await page
    .getByPlaceholder("Enter the name of the custom field")
    .press("Enter");
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: type }).click();
}

const NUM = Math.floor(Math.random() * 100000) + 1;
export const TEXTFIELD = `textfield${NUM}`;
export const TEXTFIELD1 = `textfield1${NUM}`;
export const NUMBER = `number${NUM}`;
export const PEOPLE = `people${NUM}`;
export const SELECT = `select${NUM}`;
export const DATE = `date${NUM}`;

async function add_textfield_customfield_steps(page, expect) {
  await customfieldsadding(page, TEXTFIELD, "Text Field");
}
async function add_number_customfield_steps(page, expect) {
  await customfieldsadding(page, NUMBER, "Number");
}
async function add_people_customfield_steps(page, expect) {
  await customfieldsadding(page, PEOPLE, "People");
}
async function add_date_customfield_steps(page, expect) {
  await customfieldsadding(page, DATE, "Date Time");
}
async function add_select_customfield_steps(page, expect) {
  await customfieldstype(page, SELECT, "Select");
  await page.getByLabel("Option 1").click();
  await page.getByLabel("Option 1").fill("test");
  await page.getByLabel("Option 2").click();
  await page.getByLabel("Option 2").fill("test");
  await expect(
    page.getByText("Duplicate options are not allowed"),
  ).toBeVisible();
  await page.getByLabel("Option 2").click();
  await page.getByLabel("Option 2").fill("test2");
  await page.getByText("+ Add Item").click();
  await page.getByLabel("Option 3").click();
  await page.getByLabel("Option 3").fill("test3");
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .check();
  await expect(page.getByRole("button", { name: "Reset" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Custom Field added successfully")).toBeVisible();
}

async function add_textfield1_customfield_steps(page, expect) {
  await customfieldstype(page, TEXTFIELD, "Text Field");
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .check();
  await page.getByRole("button", { name: "Add" }).click();
  const alreadycustomfield = `Field with Title ${TEXTFIELD} already exists.`;
  await expect(page.getByText(alreadycustomfield)).toBeVisible();
  await page.getByPlaceholder("Enter the name of the custom field").click();
  await page
    .getByPlaceholder("Enter the name of the custom field")
    .fill(TEXTFIELD1);
  await page
    .getByPlaceholder("Enter the name of the custom field")
    .press("Enter");
  await page.locator('//div[@aria-haspopup="listbox"]').click();
  await page.getByRole("option", { name: "Text Field" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .check();
  await expect(page.getByRole("button", { name: "Reset" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Custom Field added successfully")).toBeVisible();
}
async function add_number1_customfield_steps(page, expect) {
  await customfieldstype(page, TEXTFIELD, "Number");
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .check();
  await expect(page.getByRole("button", { name: "Reset" })).toBeEnabled();
  await page.getByRole("button", { name: "Add" }).click();
  await expect(
    page.getByText("Custom Field already exists with a different data type"),
  ).toBeVisible();
  await page
    .locator('//iconify-icon[@icon="material-symbols:close-rounded"]')
    .click();
}
async function update_delete_customfields(page, expect) {
  await expect(
    page.locator('(//iconify-icon[@icon="ic:outline-edit"])[1]'),
  ).toBeVisible();
  await page.locator('(//iconify-icon[@icon="ic:outline-edit"])[1]').click();
  await expect(page.getByText("Edit Custom Field")).toBeVisible();
  await expect(
    page.locator('//iconify-icon[@icon="material-symbols:close-rounded"]'),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Update" })).toBeDisabled();
  await page
    .locator("div")
    .filter({ hasText: /^Make this a mandatory field$/ })
    .getByRole("checkbox")
    .uncheck();
  await expect(page.getByRole("button", { name: "Update" })).toBeVisible();
  await page.getByRole("button", { name: "Update" }).click();
  await expect(
    page.getByText("Custom Field Updated successfully"),
  ).toBeVisible();
  //Deleting steps
  await page
    .locator('(//iconify-icon[@icon="ic:baseline-delete-outline"])[1]')
    .click();
  await expect(page.getByText("Delete Custom Field")).toBeVisible();
  await expect(
    page.locator('//iconify-icon[@icon="material-symbols:close-rounded"]'),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "No" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Yes" })).toBeEnabled();
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(
    page.getByText("Custom Field deleted successfully"),
  ).toBeVisible();
}

export {
  add_textfield_customfield_steps,
  add_number_customfield_steps,
  add_select_customfield_steps,
  add_people_customfield_steps,
  add_date_customfield_steps,
  add_textfield1_customfield_steps,
  add_number1_customfield_steps,
  update_delete_customfields,
};
