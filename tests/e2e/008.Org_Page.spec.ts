import { test } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

let NUM = Math.floor(Math.random() * 100000) + 1;
const USEREMAIL = `test+${NUM}@kyro.us`;
const PROJECTTYPE = `mech${NUM}`;
const FIRSTNAME = `testing${NUM}`;
const LASTNAME = `app${NUM}`;
const NAME = `${FIRSTNAME} ${LASTNAME}`;
let NUM2 = Math.floor(Math.random() * 10000000);
while (NUM2.toString().startsWith("0") || NUM2.toString().startsWith("1")) {
  NUM2 = Math.floor(Math.random() * 10000000);
}
const dynamicPhoneNumber = `+1 (231) ${NUM2.toString().slice(0, 3)}-${NUM2.toString().slice(3)}`;

test("Organization and User management", async ({ page }) => {
  const { organizationPage, userManagementPage } = initPageManager(page);
  await page.goto("/");

  // Navigate to organization and update details
  await organizationPage.navigateToOrganization();
  await organizationPage.uploadImage("./e2e/images/orgpic.jpeg");
  await organizationPage.updateOrganizationDetails(
    "amazon",
    "automation",
    "sm towner perungudi",
    dynamicPhoneNumber,
    "mech",
  );

  // Invite a user
  await userManagementPage.navigateToUsers();
  await userManagementPage.inviteUser(FIRSTNAME, LASTNAME, USEREMAIL);

  // Add and delete project type
  await organizationPage.addProjectType(
    PROJECTTYPE,
    "under ground electrical line",
  );
  await organizationPage.deleteProjectType(PROJECTTYPE);

  // Delete a user
  await userManagementPage.navigateToUsers();
  await userManagementPage.deleteUser(NAME);
});
