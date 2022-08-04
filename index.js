const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

    const octokit = github.getOctokit(core.getInput('token'));
    const context = github.context;
    core.info(context.repo.owner)

    await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: context.repo.owner,
        repo: core.getInput('repo', { required: true }),
        title: core.getInput('title', { required: true }),
        body: core.getInput('body', { required: true }),
        labels: core.getInput('labels').split(',')
    })
}

run();