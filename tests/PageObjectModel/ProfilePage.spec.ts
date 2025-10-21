import { Page, expect } from "@playwright/test";

export class ProfilePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  bannerIcon = () => this.page.getByRole("banner").getByTestId("PersonIcon");
  profileLink = () => this.page.getByText("Profile", { exact: true });
  resetButton = () => this.page.getByRole("button", { name: "Reset" });
  saveChangesButton = () =>
    this.page.getByRole("button", { name: "Save Changes" });
  firstNameInput = () => this.page.getByLabel("First name *");
  lastNameInput = () => this.page.getByLabel("Last name *");
  displayNameInput = () => this.page.getByLabel("Display name");
  jobTitleInput = () => this.page.getByLabel("Job title");
  phoneInput = () => this.page.getByPlaceholder("1 (702) 123-");
  addressInput = () => this.page.getByLabel("Communication address");
  emailField = () => this.page.getByLabel("Email");
  reportingManagerField = () => this.page.getByLabel("Reporting manager");

  // Navigate to Profile Page
  async navigateToProfile() {
    await this.page.goto("/");
    await this.bannerIcon().click();
    await this.profileLink().click();
  }

  // Fill Profile Form
  async fillProfile(
    firstname: string,
    lastname: string,
    displayname: string,
    jobtitle: string,
    address1: string,
    phoneno: string,
  ) {
    await this.firstNameInput().fill(firstname);
    await this.lastNameInput().click();
    const outputFirstName = await this.firstNameInput().getAttribute("value");
    expect(firstname).toBe(outputFirstName);

    await this.lastNameInput().fill(lastname);
    await this.displayNameInput().click();
    const outputLastName = await this.lastNameInput().getAttribute("value");
    expect(lastname).toBe(outputLastName);

    await this.displayNameInput().fill(displayname);
    await this.jobTitleInput().click();
    const outputDisplayName =
      await this.displayNameInput().getAttribute("value");
    expect(displayname).toBe(outputDisplayName);

    await this.jobTitleInput().fill(jobtitle);
    await this.addressInput().click();
    const outputJobTitle = await this.jobTitleInput().getAttribute("value");
    expect(jobtitle).toBe(outputJobTitle);

    await this.addressInput().fill(address1);
    await this.phoneInput().click();
    const outputAddress = await this.addressInput().getAttribute("value");
    expect(address1).toBe(outputAddress);

    await this.phoneInput().clear();
    await this.phoneInput().fill(phoneno);
    await this.firstNameInput().click();
    const outputPhone = await this.phoneInput().getAttribute("value");
    expect(phoneno).toBe(outputPhone);
  }

  // Verify Buttons and Fields
  async verifyInitialState() {
    await expect(this.resetButton()).toBeDisabled();
    await expect(this.saveChangesButton()).toBeDisabled();
    await expect(this.emailField()).not.toBeEditable();
    await expect(this.reportingManagerField()).not.toBeEditable();
  }

  // Save Changes
  async saveChanges() {
    await this.saveChangesButton().click();
    await expect(this.page.getByText("Updated Successfully")).toBeVisible();
  }

  // Verify Profile Data After Save
  async verifyProfileData(
    firstname: string,
    lastname: string,
    displayname: string,
    jobtitle: string,
    address1: string,
    phoneno: string,
  ) {
    expect(await this.firstNameInput().getAttribute("value")).toBe(firstname);
    expect(await this.lastNameInput().getAttribute("value")).toBe(lastname);
    expect(await this.displayNameInput().getAttribute("value")).toBe(
      displayname,
    );
    expect(await this.jobTitleInput().getAttribute("value")).toBe(jobtitle);
    expect(await this.addressInput().getAttribute("value")).toBe(address1);
    expect(await this.phoneInput().getAttribute("value")).toBe(phoneno);
  }
}
