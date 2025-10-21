import { expect, Page } from "@playwright/test";

export class NotificationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to home page
  async navigateToHomePage() {
    await this.page.goto("/");
  }

  // Click on Bell Icon
  async clickBellIcon() {
    await this.page.getByTestId("BellOutlineIcon").click();
  }

  // Verify user preference cog is visible
  async verifyUserPreferenceCogIsVisible() {
    await expect(
      this.page.locator('[data-test-id="user-preference-cog"]'),
    ).toBeVisible();
  }

  // Click on user preference cog
  async clickUserPreferenceCog() {
    await this.page.locator('[data-test-id="user-preference-cog"]').click();
  }

  // Click on notification button by name
  async clickNotificationButton(name: string) {
    await this.page.getByRole("button", { name }).click();
  }

  // Click on the first label inside a region
  async clickFirstLabelInRegion(regionName: string) {
    await this.page
      .getByRole("region", { name: regionName })
      .locator("label")
      .first()
      .click();
  }

  // Click on the nth label inside a region
  async clickNthLabelInRegion(regionName: string, index: number) {
    await this.page
      .getByRole("region", { name: regionName })
      .locator("label")
      .nth(index)
      .click();
  }

  // Click on the next series of notifications
  async handleNotifications() {
    // Projects Section
    await this.clickNotificationButton("Projects In App, Push");
    await this.clickFirstLabelInRegion("Projects In App, Push");
    await this.clickFirstLabelInRegion("Projects Push");
    await this.clickNthLabelInRegion("Projects In App, Push", 1);
    await this.clickNthLabelInRegion("Projects In App", 1);

    // Tasks Section
    await this.clickNotificationButton("Tasks In App, Push");
    await this.clickFirstLabelInRegion("Tasks In App, Push");
    await this.clickFirstLabelInRegion("Tasks Push");
    await this.clickNthLabelInRegion("Tasks In App, Push", 1);
    await this.clickNthLabelInRegion("Tasks In App", 1);

    // Timesheets Section
    await this.clickNotificationButton("Timesheets In App, Push");
    await this.clickFirstLabelInRegion("Timesheets In App, Push");
    await this.clickFirstLabelInRegion("Timesheets Push");
    await this.clickNthLabelInRegion("Timesheets In App, Push", 1);
    await this.clickNthLabelInRegion("Timesheets In App", 1);
  }
}
