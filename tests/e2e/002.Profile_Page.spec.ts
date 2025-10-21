import { test } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test.describe.configure({ mode: "serial" });

let NUM = Math.floor(Math.random() * 10000000);
const FirstName = `kyro${NUM}`;
const LastName = `Test${NUM}`;
const JobTitle = `SDTE${NUM}`;
const Address = `${NUM} jawahar street, madurai`;
while (NUM.toString().startsWith("0") || NUM.toString().startsWith("1")) {
  NUM = Math.floor(Math.random() * 10000000);
}

const formattedNum = NUM.toString().padStart(7, "0");
const dynamicPhoneNumber = `+1 (231) ${formattedNum.slice(0, 3)}-${formattedNum.slice(3)}`;

test.describe("Update org admin profile page", () => {
  test.use({
    storageState: "orgadmin.json",
  });

  test("Updating The Profile For Org Admin @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-orgadmin",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-orgadmin",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});

test.describe("Update contributor profile page", () => {
  test.use({
    storageState: "contributor.json",
  });

  test("Updating The Profile For Contributor @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-contributor",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-contributor",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});

test.describe("Update pm  profile page", () => {
  test.use({
    storageState: "pm.json",
  });
  test("PM-Updating The Profile @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-Pm",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-Pm",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});

test.describe("Update guest profile page", () => {
  test.use({
    storageState: "guest.json",
  });
  test("guest-Updating The Profile @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-guest",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-guest",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});
test.describe("Update tsadmin profile page", () => {
  test.use({
    storageState: "tsadmin.json",
  });
  test("tsadmin-Updating The Profile @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-tsadmin",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-tsadmin",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});
test.describe("Update tsapprover profile page", () => {
  test.use({
    storageState: "tsapprover.json",
  });
  test("tsapprover-Updating The Profile @profile", async ({ page }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "kyro-tsapprover",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "kyro-tsapprover",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});

test.describe("Update report approver profile page", () => {
  test.use({
    storageState: "formReportApprover.json",
  });
  test("Updating The Profile For Report Approver @profile", async ({
    page,
  }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "Report Approver",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "Report Approver",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});

test.describe("Update dashboard viewer profile page", () => {
  test.use({
    storageState: "dashboardViewer.json",
  });
  test("Updating The Profile For Dashborad Viewer @profile", async ({
    page,
  }) => {
    const { profilePage } = initPageManager(page);

    await profilePage.navigateToProfile();
    await profilePage.verifyInitialState();
    await profilePage.fillProfile(
      FirstName,
      LastName,
      "test dashboardviewer",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
    await profilePage.saveChanges();
    await profilePage.verifyProfileData(
      FirstName,
      LastName,
      "test dashboardviewer",
      JobTitle,
      Address,
      dynamicPhoneNumber,
    );
  });
});
