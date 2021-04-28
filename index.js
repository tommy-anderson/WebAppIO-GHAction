const core = require('@actions/core');
const fetch = require("node-fetch");

try {
  const apiKey = core.getInput('apiKey')
  const repoName = core.getInput('apiKey')
  const apiExtra = core.getInput('apiExtra')
  const buttons = core.getInput('buttons')
  const branch = core.getInput('branch')
  const ref = core.getInput('ref')
  
  fetch(
    `https://layerci.com/api/v1/run/${repoName}?layertoken=${apiKey}`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'branch': branch,
            'ref': ref,
            'accept_buttons': buttons,
            'extra': apiExtra,
        }),
    }
).then(res => res.json()).then(json => console.log(json))


} catch (error) {
  core.setFailed(`Action failed with error ${error}`);
}






