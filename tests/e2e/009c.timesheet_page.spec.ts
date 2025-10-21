import { test, expect } from "@playwright/test";
import initPageManager from "../PageObjectModel/InitPageManager.spec";

function secondsToHHMM(seconds: number): string {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);

  const formattedTime: string = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  return formattedTime;
}

test("check the timesheet value @timesheet", async ({ page }) => {
  const { listMenu } = initPageManager(page);
  await page.goto("/");
  await listMenu.adminMenu().click();
  const responseforuser = page.waitForResponse(
    `${process.env.API_URL}/users?is_kyro_user=true&name=&user_type=Internal%2CClient&offset=0&limit=25`,
  );
  await listMenu.users().click();
  const response2 = await (await responseforuser).json();
  let userid = "";
  userid = response2.users.find(
    (user: { display_name: string }) => user.display_name === "kyro-orgadmin",
  ).id;
  console.log(userid);
  await listMenu.manageMenu().click();
  const combinedValue = `${process.env.API_URL}/timesheets?user_id=${userid}&status=Open%2CApproved%2CIn%20Review%2CChanges%20Required&keyword=&offset=0&limit=25`;
  const responsetimesheet = page.waitForResponse(combinedValue);
  await listMenu.timesheets().click();
  const responseforname = await (await responsetimesheet).json();
  let timeperiod = "";
  timeperiod = responseforname["timesheets"][0].name;
  console.log(timeperiod);
  const [startDate, endDate] = timeperiod.split(" to ");
  console.log(startDate);
  console.log(endDate);
  const [startDay, startMonth, year] = startDate.split("-");
  const trimmedYear = year.slice(2);
  const formattedStartDate = `${startDay} ${startMonth} ${trimmedYear}`;
  const [endDay, endMonth] = endDate.split("-");
  const formattedEndDate = `${endDay} ${endMonth} ${trimmedYear}`;

  // Create the new formatted value
  const formattedValue = `${formattedStartDate} - ${formattedEndDate}`;
  console.log(formattedValue); // Output: 26 Jun 23 - 02 Jul 23
  const timesheetid = responseforname["timesheets"][0].id;
  const responseforworklog = page.waitForResponse(
    `${process.env.API_URL}/worklogs?timesheet_id=${timesheetid}&status=Complete&limit=1000`,
  );
  await page.getByText(formattedValue).click();
  const response4 = await (await responseforworklog).json();
  const worklogs = response4.worklogs;

  // Conversion factor from meters to miles
  const metersToMilesConversionFactor: number = 0.000621371;

  // Extracting data from each worklog
  const durations: number[] = worklogs.map(
    (worklog) => worklog.duration_in_secs || 0,
  );
  const miles: number[] = worklogs.map(
    (worklog) =>
      (worklog.mileage?.distance_in_mts || 0) * metersToMilesConversionFactor,
  );
  const perdiem: number[] = worklogs.map(
    (worklog) => worklog.per_diem?.amount || 0,
  );
  const expenses: number[] = worklogs.map(
    (worklog) => worklog.expense?.amount || 0,
  );

  // Adding up all the values in the array
  const totalDuration: number = durations.reduce(
    (sum, duration) => sum + duration,
    0,
  );
  const totalMiles: number = miles.reduce((sum, miles) => sum + miles, 0);
  const totalPerdiem: number = perdiem.reduce(
    (sum, perdiem) => sum + perdiem,
    0,
  );
  const totalExpenses: number = expenses.reduce(
    (sum, expenses) => sum + expenses,
    0,
  );

  // Divide totalPerdiem,totalExpenses by 100
  const totalPerdiemInUSD: number = totalPerdiem / 100;
  const totalExpensesInUSD: number = totalExpenses / 100;

  console.log(totalMiles);
  console.log(totalPerdiemInUSD);
  console.log(totalExpensesInUSD);

  // Round off the decimal value
  const roundToDecimalPlaces = (
    value: number,
    decimalPlaces: number,
  ): number => {
    const multiplier = 10 ** decimalPlaces;
    return Math.round(value * multiplier) / multiplier;
  };

  const roundedValue = roundToDecimalPlaces(totalMiles, 2);
  console.log(roundedValue);

  // convert the number into string format
  const stringMiles: string = roundedValue.toString();
  const stringPerdiem: string = `$ ${totalPerdiemInUSD.toString()}`;
  const stringExpenses: string = `$ ${totalExpensesInUSD.toString()}`;
  const formattedDuration: string = secondsToHHMM(totalDuration);

  const durat = page.locator("h4").filter({ hasText: formattedDuration });
  const miles2 = page.getByRole("heading", { name: stringMiles, exact: true });
  const perdiem2 = page.locator("h4").filter({ hasText: stringPerdiem });
  const expenses2 = page.locator("h4").filter({ hasText: stringExpenses });

  await Promise.all([
    durat.waitFor(),
    miles2.waitFor(),
    perdiem2.waitFor(),
    expenses2.waitFor(),
  ]);

  // Validate the text content of the elements
  await expect(durat).toHaveText(formattedDuration);
  await expect(miles2).toHaveText(stringMiles);
  await expect(perdiem2).toHaveText(stringPerdiem);
  await expect(expenses2).toHaveText(stringExpenses);
});
