# ToDo Application Tests

The included [Playwright](https://playwright.dev/) smoke test will hit the ToDo app web endpoint, create, and delete an item.

## Run Tests

The endpoint it hits will be discovered in this order:

1. Value of `REACT_APP_WEB_BASE_URL` environment variable
1. Value of `REACT_APP_WEB_BASE_URL` found in default .azure environment
1. Defaults to `http://localhost:3000`

To run the test scripts, follow the lines below:
1. Go to the tests folder  
```bash
cd tests
```
2. For installing the playwright, run the below command 

```bash
npm i && npx playwright install
```

3. For running all the tests, run the below command 

```bash
npx playwright test
```

4. To run in the development environment, execute the following command 

```bash
KYRO_ENV=development npx playwright test
```

5. To run in the stage environment, execute the following command

```bash
KYRO_ENV=stage npx playwright test
```

6. To run in the prodution environment, execute the following command

```bash
KYRO_ENV=prod npx playwright test
```

You can use the `--headed` flag to open a browser when running the tests

To run the particular test file:

7. For running the particular file, execute the following command

```bash
npx playwright test e2e/{file name}
```

for example : `npx playwright test e2e/001.home_page.spec.ts`

8.  For running the multiple file, execute the following command

```bash
npx playwright test e2e/{file name1} e2e/{file name2}
```

for example : `npx playwright test e2e/001.home_page.spec.ts e2e/002.Profile_Page.spec.ts`

To run the particular feature:

9. For running the particular  feature (tags), execute the following command

```bash
npx playwright test --grep {tags name}
```

tags name:
@quicklink
@profile
@notification
@project
@task
@forms
@organization
@worklog
@timesheet
@client
@splitbutton

## For debugging test script excution , add the command:

```bash
npx playwright test --debug
```
Add the `--debug` flag to run with debugging enabled. You can find out more info here: <https://playwright.dev/docs/next/test-cli#reference>

## To record a trace video of the test script execution, add the command:

```bash
npx playwright test --trace on
```

for example : `npx playwright test --trace on` or `npx playwright test e2e/001.home_page.spec.ts --trace on`

## To opening the HTML report, add the below command:

```bash
npx playwright show-report
```
More debugging references: <https://playwright.dev/docs/debug> and <https://playwright.dev/docs/trace-viewer>
