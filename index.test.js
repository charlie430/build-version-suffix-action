const bvs = require('./buildVersionSuffix');

test('release - master', async () => {
  const github = {
    eventName: 'release',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  expect(await bvs(github, releaseType)).toBe('');
});

test('release - branch', async () => {
  const github = {
    eventName: 'release',
    ref: 'fix/some-bug',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  expect(await bvs(github, releaseType)).toBe('rc.1.2');
});

test('push - master', async () => {
  const github = {
    eventName: 'push',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  expect(await bvs(github, releaseType)).toBe('beta.1.2');
});

test('push - branch', async () => {
  const github = {
    eventName: 'push',
    ref: 'version/x',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  expect(await bvs(github, releaseType)).toBe('beta-version-x.1.2');
});

test('pull_request - branch', async () => {
  const github = {
    eventName: 'pull_request',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  expect(await bvs(github, releaseType)).toBe('alpha-fix-some-bug.1.2');
});

test('workflow_dispatch - master - stable', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = '';
  await expect(bvs(github, releaseType)).rejects.toThrow('A stable version can only be created via a github release');
});

test('workflow_dispatch - master - rc', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'rc';
  expect(await bvs(github, releaseType)).toBe('rc.1.2');
});

test('workflow_dispatch - master - beta', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'beta';
  expect(await bvs(github, releaseType)).toBe('beta.1.2');
});

test('workflow_dispatch - master - alpha', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'alpha';
  expect(await bvs(github, releaseType)).toBe('alpha.1.2');
});

test('workflow_dispatch - branch - unsupported', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'foobar';
  await expect(bvs(github, releaseType)).rejects.toThrow(`Unsupported release type '${releaseType}'`);
});

test('workflow_dispatch - branch - rc', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'rc';
  expect(await bvs(github, releaseType)).toBe('rc-fix-some-bug.1.2');
});

test('workflow_dispatch - branch - beta', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'beta';
  expect(await bvs(github, releaseType)).toBe('beta-fix-some-bug.1.2');
});

test('workflow_dispatch - branch - alpha', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1',
    runNumber: '2'
  };
  const releaseType = 'alpha';
  expect(await bvs(github, releaseType)).toBe('alpha-fix-some-bug.1.2');
});