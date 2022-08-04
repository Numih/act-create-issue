const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

    const token = core.getInput('token');
    core.info('token: ' + token);

    const octokit = github.getOctokit(token);
    const context = github.context;

    const owner = context.repo.owner;
    const repo = core.getInput('repo', { required: true });
    const title = core.getInput('title', { required: true });
    const body = core.getInput('body', { required: true });
    const labels = core.getInput('labels', { required: true });

    core.info('owner: ' + owner);
    core.info('repo: ' + repo);
    core.info('title: ' + title);
    core.info('body: ' + body);
    core.info('labels: ' + labels);

    await octokit.rest.issues.create({
        owner: owner,
        repo: repo,
        title: title,
        body: body,
        labels: labels.split(',')
    })
}

run();