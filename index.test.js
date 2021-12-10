const bvs = require('./buildVersionSuffix');

test('release', async () => {
  const github = {
    eventName: 'release',
    ref: 'refs/heads/master',
    payload: { release: { prerelease: false } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('');
});

test('prerelease', async () => {
  const github = {
    eventName: 'release',
    ref: 'fix/some-bug',
    payload: { release: { prerelease: true } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('rc-1');
});

test('push - master', async () => {
  const github = {
    eventName: 'push',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('beta-1');
});

test('push - branch', async () => {
  const github = {
    eventName: 'push',
    ref: 'version/x',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('beta-version-x-1');
});

test('pull_request - branch', async () => {
  const github = {
    eventName: 'pull_request',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('alpha-fix-some-bug-1');
});

test('workflow_dispatch - master - alpha', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/heads/master',
    payload: { pull_request: { head: { ref: '' } } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('alpha-1');
});

test('workflow_dispatch - branch - alpha', async () => {
  const github = {
    eventName: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    payload: { pull_request: { head: { ref: 'fix/some-bug' } } },
    runId: '1'
  };
  expect(await bvs(github)).toBe('alpha-fix-some-bug-1');
});