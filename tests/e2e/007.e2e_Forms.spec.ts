import { test, expect } from "@playwright/test";
import {
  formSubmissionSteps,
  saveAsDraftSteps,
  submittingForm_Project,
  exporting_Excel,
  report_approvering_steps,
} from "../common/form_submission";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test.describe.configure({ mode: "serial" });
test.describe("Verifing the Form Submission and Save as Draft ", () => {
  test.use({
    storageState: "notifyorgAdmin.json",
  });

  test("Verifying the submission & draft experience by OrgAdmin @forms", async ({
    page,
  }) => {
    const { listMenu } = initPageManager(page);
    test.setTimeout(240000);
    await page.goto("/");
    await listMenu.manageMenu().click();
    await listMenu.forms().click();
    const assignButton = await page
      .getByRole("row", { name: "form features 2.0" })
      .getByRole("button", { name: "Assign" });
    if (assignButton) {
      await expect(assignButton).toBeVisible();
      console.log("Code is broken - Bug");
    }
    await formSubmissionSteps(page, expect);
    await saveAsDraftSteps(page, expect);
    await exporting_Excel(page, expect);
    await submittingForm_Project(page, expect);
  });
  test.describe("Verifing the submission & draft experience by PM", () => {
    test.use({
      storageState: "formPM.json",
    });

    test("Verifying the submission & draft experience by PM @forms", async ({
      page,
    }) => {
      const { listMenu } = initPageManager(page);
      test.setTimeout(240000);
      await page.goto("/");
      await listMenu.manageMenu().click();
      await listMenu.forms().click();
      const assignButton = await page
        .getByRole("row", { name: "form features 2.0" })
        .getByRole("button", { name: "Assign" });
      if (assignButton) {
        await expect(assignButton).not.toBeVisible();
        console.log("PM role dont had the permission");
      }
      await formSubmissionSteps(page, expect);
      await saveAsDraftSteps(page, expect);
      await exporting_Excel(page, expect);
      await submittingForm_Project(page, expect);
    });
  });
  test.describe("Verifing the submission & draft experience by Contributor", () => {
    test.use({
      storageState: "formContributor.json",
    });

    test("Verifying the submitted form Contributor @forms", async ({
      page,
    }) => {
      const { listMenu } = initPageManager(page);
      test.setTimeout(240000);
      await page.goto("/");
      await listMenu.manageMenu().click();
      await listMenu.forms().click();
      const assignButton = await page
        .getByRole("row", { name: "form features 2.0" })
        .getByRole("button", { name: "Assign" });
      if (assignButton) {
        await expect(assignButton).not.toBeVisible();
        console.log("Contributor role dont had the permission");
      }
      await formSubmissionSteps(page, expect);
      await saveAsDraftSteps(page, expect);
      await submittingForm_Project(page, expect);
    });
    test.describe("Verifing the Form Submission Approve Work-flow ", () => {
      test.use({
        storageState: "formReportApprover.json",
      });

      test("Verifying the Approvering process by Report Approver @forms", async ({
        page,
      }) => {
        const { listMenu } = initPageManager(page);
        test.setTimeout(240000);
        await page.goto("/");
        await listMenu.manageMenu().click();
        await listMenu.reports().click();
        await report_approvering_steps(page, expect);
      });
    });
  });
});
