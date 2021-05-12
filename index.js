const core = require('@actions/core');
const github = require('@actions/github');
const buildVersionSuffix = require('./buildVersionSuffix');

async function run() {
  try {
    core.debug('github context: ' + JSON.stringify(github.context, null, 2));
    const releaseType = core.getInput('releaseType', { required: false, trimWhitespace: true  });
    core.debug('releaseType: ' + releaseType);
    const versionSuffix = await buildVersionSuffix(github.context, releaseType);
    core.setOutput('versionSuffix', versionSuffix);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();