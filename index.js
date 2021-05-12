const core = require('@actions/core');
const github = require('@actions/github');
const buildVersionSuffix = require('./buildVersionSuffix');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const versionSuffix = await buildVersionSuffix(github.context);
    core.setOutput('versionSuffix', versionSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();