const core = require('@actions/core');
const github = require('@actions/github');
const buildVersionSuffix = require('./buildVersionSuffix');

async function run() {
  try {
    core.log('github.context:');
    core.log(github.context);
    const versionSuffix = await buildVersionSuffix(github.context);
    core.setOutput('versionSuffix', versionSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();