// global-setup.ts
// TODO the no-extraneous-dependencies rule isn't being honored by lint-staged
import { chromium, expect, FullConfig } from "@playwright/test"; //eslint-disable-line
import {
  orgadmin,
  contributor,
  projectmanager,
  guest,
  notifyorgAdmin,
  notifyPM,
  notifyContributor,
  tsadmin,
  tsapprover,
  formPM,
  formContributor,
  formReportApprover,
  dashboardViewer,
} from "../common/user_details";

async function saveUserState(
  config: FullConfig,
  username: string,
  password: string,
  fileName: string,
) {
  try {
    console.log("Saving user state for " + username);
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(config.projects[0].use.baseURL + "/");

    // Login using the credentials provided
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.getByRole("button", { name: "Login", exact: true }).click();

    // Save signed-in state to fileName
    await page.getByRole("link").first().click();
    const automaticStop = page.locator("#automate-timer-stop");
    if (await automaticStop.isVisible()) {
      console.log("The element is visible.");
      await automaticStop.click();
      await page.getByRole("button", { name: "Skip" }).click();
      await page.getByRole("button", { name: "Yes" }).click();
      await expect(
        page.getByRole("heading", { name: "Worklog deleted successfully" }),
      ).toBeVisible({ timeout: 15000 });
    } else {
      console.log("The element is not visible.");
    }
    await page.context().storageState({ path: fileName });

    await browser.close();
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function globalSetup(config: FullConfig) {
  console.log(process.env.WEB_URL);
  console.log(process.env.API_URL);
  try {
    if (
      !(await saveUserState(
        config,
        orgadmin.username,
        orgadmin.password,
        orgadmin.fileName,
      ))
    ) {
      throw new Error("Failed to save orgadmin state");
    }
    if (
      !(await saveUserState(
        config,
        contributor.username,
        contributor.password,
        contributor.fileName,
      ))
    ) {
      throw new Error("Failed to save contributor state");
    }
    if (
      !(await saveUserState(
        config,
        projectmanager.username,
        projectmanager.password,
        projectmanager.fileName,
      ))
    ) {
      throw new Error("Failed to save pm state");
    }
    if (
      !(await saveUserState(
        config,
        guest.username,
        guest.password,
        guest.fileName,
      ))
    ) {
      throw new Error("Failed to save guest state");
    }
    if (
      !(await saveUserState(
        config,
        tsadmin.username,
        tsadmin.password,
        tsadmin.fileName,
      ))
    ) {
      throw new Error("Failed to save tsadmin state");
    }
    if (
      !(await saveUserState(
        config,
        tsapprover.username,
        tsapprover.password,
        tsapprover.fileName,
      ))
    ) {
      throw new Error("Failed to save tsapprover state");
    }
    if (
      !(await saveUserState(
        config,
        notifyorgAdmin.username,
        notifyorgAdmin.password,
        notifyorgAdmin.fileName,
      ))
    ) {
      throw new Error("Failed to save notifyorgAdmin state");
    }
    if (
      !(await saveUserState(
        config,
        notifyPM.username,
        notifyPM.password,
        notifyPM.fileName,
      ))
    ) {
      throw new Error("Failed to save notifyPM state");
    }
    if (
      !(await saveUserState(
        config,
        formPM.username,
        formPM.password,
        formPM.fileName,
      ))
    ) {
      throw new Error("Failed to save formPM state");
    }
    if (
      !(await saveUserState(
        config,
        notifyContributor.username,
        notifyContributor.password,
        notifyContributor.fileName,
      ))
    ) {
      throw new Error("Failed to save notifyContributor state");
    }
    if (
      !(await saveUserState(
        config,
        formContributor.username,
        formContributor.password,
        formContributor.fileName,
      ))
    ) {
      throw new Error("Failed to save formContributor state");
    }
    if (
      !(await saveUserState(
        config,
        formReportApprover.username,
        formReportApprover.password,
        formReportApprover.fileName,
      ))
    ) {
      throw new Error("Failed to save formReportApprover state");
    }
    if (
      !(await saveUserState(
        config,
        dashboardViewer.username,
        dashboardViewer.password,
        dashboardViewer.fileName,
      ))
    ) {
      throw new Error("Failed to save formReportApprover state");
    }
  } catch (error) {
    console.log(error);
  }
}

export default globalSetup;
