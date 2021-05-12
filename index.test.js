const bvs = require('./buildVersionSuffix');

test('release - master', async () => {
  const github = {
    event_name: 'release',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2'
  };
  expect(await bvs(github)).toBe('');
});

test('release - branch', async () => {
  const github = {
    event_name: 'release',
    ref: 'fix/some-bug',
    head_ref: '',
    run_id: '1',
    run_number: '2'
  };
  expect(await bvs(github)).toBe('rc.1.2');
});

test('push - master', async () => {
  const github = {
    event_name: 'push',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2'
  };
  expect(await bvs(github)).toBe('beta.1.2');
});

test('push - branch', async () => {
  const github = {
    event_name: 'push',
    ref: 'version/x',
    head_ref: '',
    run_id: '1',
    run_number: '2'
  };
  expect(await bvs(github)).toBe('beta-version-x.1.2');
});

test('pull_request - branch', async () => {
  const github = {
    event_name: 'pull_request',
    ref: 'refs/pull/1/merge',
    head_ref: 'fix/some-bug',
    run_id: '1',
    run_number: '2'
  };
  expect(await bvs(github)).toBe('alpha-fix-some-bug.1.2');
});

test('workflow_dispatch - master - stable', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: ''
      }
    }
  };
  await expect(bvs(github)).rejects.toThrow('A stable version can only be created via a github release');
});

test('workflow_dispatch - master - rc', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'rc'
      }
    }
  };
  expect(await bvs(github)).toBe('rc.1.2');
});

test('workflow_dispatch - master - beta', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'beta'
      }
    }
  };
  expect(await bvs(github)).toBe('beta.1.2');
});

test('workflow_dispatch - master - alpha', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/heads/master',
    head_ref: '',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'alpha'
      }
    }
  };
  expect(await bvs(github)).toBe('alpha.1.2');
});

test('workflow_dispatch - branch - stable', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    head_ref: 'fix/some-bug',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: ''
      }
    }
  };
  await expect(bvs(github)).rejects.toThrow('A stable version can only be created via a github release');
});

test('workflow_dispatch - branch - rc', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    head_ref: 'fix/some-bug',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'rc'
      }
    }
  };
  expect(await bvs(github)).toBe('rc-fix-some-bug.1.2');
});

test('workflow_dispatch - branch - beta', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    head_ref: 'fix/some-bug',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'beta'
      }
    }
  };
  expect(await bvs(github)).toBe('beta-fix-some-bug.1.2');
});

test('workflow_dispatch - branch - alpha', async () => {
  const github = {
    event_name: 'workflow_dispatch',
    ref: 'refs/pull/1/merge',
    head_ref: 'fix/some-bug',
    run_id: '1',
    run_number: '2',
    event: {
      inputs: {
        releaseType: 'alpha'
      }
    }
  };
  expect(await bvs(github)).toBe('alpha-fix-some-bug.1.2');
});
