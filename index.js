const core = require('@actions/core');
const github = require('@actions/github');
const buildVersionSuffix = require('./buildVersionSuffix');

async function run() {
  try {
    core.info('github context: ' + JSON.stringify(github.context, null, 2));
    const releaseType = core.getInput('releaseType', { required: true });
    core.info('releaseType: ' + releaseType);
    const versionSuffix = await buildVersionSuffix(releaseType, github.context);
    core.setOutput('versionSuffix', versionSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();