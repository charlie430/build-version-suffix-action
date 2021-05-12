const core = require('@actions/core');
const github = require('@actions/github');
const buildVersionSuffix = require('./buildVersionSuffix');

async function run() {
  try {
    core.info('github.context:');
    core.info(github.context);
    const versionSuffix = await buildVersionSuffix(github.context);
    core.setOutput('versionSuffix', versionSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();