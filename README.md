# Build Version Suffix Action

## Code in Master

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  √ release - master (3 ms)
  √ release - branch
  √ push - master (1 ms)
  √ push - branch
  √ pull_request - branch
  √ workflow_dispatch - master - stable (7 ms)
  √ workflow_dispatch - master - rc
  √ workflow_dispatch - master - beta (1 ms)
  √ workflow_dispatch - master - alpha
  √ workflow_dispatch - branch - stable (1 ms)
  √ workflow_dispatch - branch - rc
  √ workflow_dispatch - branch - beta
  √ workflow_dispatch - branch - alpha (1 ms)
...
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: actions/javascript-action@v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
