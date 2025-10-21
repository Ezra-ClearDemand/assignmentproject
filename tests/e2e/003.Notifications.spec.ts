import { test } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

test("Notification is checked on button level only @notification", async ({
  page,
}) => {
  const { notificationPage } = initPageManager(page);

  // Perform actions from NotificationPage class
  await notificationPage.navigateToHomePage();
  await notificationPage.clickBellIcon();
  await notificationPage.verifyUserPreferenceCogIsVisible();
  await notificationPage.clickUserPreferenceCog();

  // Perform notification actions
  await notificationPage.handleNotifications();
});
