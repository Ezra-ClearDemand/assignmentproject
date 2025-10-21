import { Page, expect } from "@playwright/test";

export class UserManagementPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  //locators
  inviteUserButton = () =>
    this.page.getByRole("button", { name: "Invite User" });
  firstNameInput = () => this.page.getByRole("textbox", { name: "First Name" });
  lastNameInput = () => this.page.getByRole("textbox", { name: "Last Name" });
  emailInput = () => this.page.getByRole("textbox", { name: "Email" });
  roles = () => this.page.getByRole("button", { name: "Role ​" });
  sendInvite = () => this.page.getByRole("button", { name: "Send Invite" });
  searchUser = () => this.page.getByPlaceholder("Search Users");

  async navigateToUsers() {
    await this.page.getByRole("link", { name: "Users" }).click();
  }

  async inviteUser(firstName: string, lastName: string, email: string) {
    await this.inviteUserButton().click();

    await this.firstNameInput().fill(firstName);
    expect(await this.firstNameInput().getAttribute("value")).toBe(firstName);

    await this.lastNameInput().fill(lastName);
    expect(await this.lastNameInput().getAttribute("value")).toBe(lastName);

    await this.emailInput().fill(email);
    expect(await this.emailInput().getAttribute("value")).toBe(email);

    await this.roles().click();
    await this.page.getByRole("option", { name: "Contributor" }).click();
    await this.sendInvite().click();
    await expect(
      this.page.getByText("User invited successfully"),
    ).toBeVisible();
  }

  async deleteUser(name: string) {
    await this.searchUser().fill(name);
    const userLocator = `[id="${name}\\_id"]`;
    await this.page.locator(userLocator).click();
    await this.page.getByRole("button", { name: "Yes" }).click();
    await expect(
      this.page.getByText("User Deleted Successfully"),
    ).toBeVisible();
  }
}
