const core = require('@actions/core');
const github = require('@actions/github');

async function run(){

    const token = core.getInput('token');
    core.info('token: ' + token);

    const octokit = github.getOctokit(token);
    const context = github.context;

    const owner = context.repo.owner.trim();
    const repo = core.getInput('repo', { required: true }).trim();
    const title = core.getInput('title', { required: true }).trim();
    const body = core.getInput('body', { required: true }).trim();
    const labels = core.getInput('labels', { required: true }).split(',').map(label => label.trim());

    core.info('owner: ' + owner);
    core.info('repo: ' + repo);
    core.info('title: ' + title);
    core.info('body: ' + body);
    core.info('labels: ' + labels);

    try {
        const response = await octokit.rest.issues.create({
            owner: owner,
            repo: repo,
            title: title,
            body: body,
            labels: labels
        })

        core.info(response.status);
        core.info(response.url);
    } catch(e) {
        console.log(e);
        core.error(e);
    }
}

run();