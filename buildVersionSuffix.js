let buildVersionSuffix = function (github) {
  return new Promise((resolve) => {
    if (!github) throw 'github context is required';

    const eventName = github.eventName;
    const ref = github.ref;
    const headRef = github.head ? github.head.ref : '';
    const runId = github.runId;
    const runNumber = github.runNumber;
    const releaseTypeInput = github.eventName === 'workflow_dispatch' ? github.event.inputs.releaseType : '';

    let branchName = !headRef || headRef == '' ? ref : headRef;
    branchName = branchName.replace('refs/heads/', '').replace(/[^a-zA-Z0-9-]/g, '-');

    let releaseType = null;
    let includeBranchName = false;
    let includeBuildNumber = false;

    // set release type
    switch (eventName) {
      case 'release': // always stable for releases
        releaseType = branchName === 'master' ? '' : 'rc';
        includeBuildNumber = branchName !== 'master';
        break;
      case 'push': // always a beta for pushes
        releaseType = 'beta';
        includeBranchName = branchName !== 'master';
        includeBuildNumber = true;
        break;
      case 'pull_request': // always an alpha for pull requests
        releaseType = 'alpha';
        includeBranchName = true;
        includeBuildNumber = true;
        break;
      case 'workflow_dispatch':
        releaseType = releaseTypeInput;
        if (releaseType === '') {
          throw new Error(`A stable version can only be created via a github release`);
        }
        includeBranchName = branchName !== 'master';
        includeBuildNumber = true;
        break;
      default:
        throw new Error(`Unsupported event name '${eventName}'`);
    }

    // sanitize release type
    switch (releaseType) {
      case 'alpha':   // alpha release
      case 'beta':    // beta release
      case 'rc':      // release candidate
      case '':        // stable release
        break;
      default:
        throw new Error(`Unsupported release type '${releaseType}'`);
    }

    let vs = releaseType;

    if (includeBranchName) {
      vs += `-${branchName}`;
    }
    
    if (includeBuildNumber) {
      vs += `.${runId}.${runNumber}`;
    }

    resolve(vs);
  });
};

module.exports = buildVersionSuffix;
