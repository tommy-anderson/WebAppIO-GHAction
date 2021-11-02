const core = require("@actions/core");
const fetch = require("node-fetch");

try {
  const apiKey = core.getInput("apiKey");
  const repoName = core.getInput("repoName");
  const apiExtra = core.getInput("apiExtra");
  const buttons = core.getInput("buttons");
  const branch = core.getInput("branch");
  const ref = core.getInput("ref");

  const url = `https://webapp.io/api/v1/run/${repoName}?token=${apiKey}`;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      branch: branch,
      ref: ref,
      accept_buttons: buttons,
      extra: apiExtra,
    }),
  };

  fetch(url, payload).then((response) => {
    // Response object https://developer.mozilla.org/en-US/docs/Web/API/Response
    if (!response.ok) {
      console.log({response})
      core.setFailed("POST returned something unexpected");
    }
  });
} catch (error) {
  core.setFailed(`Action failed with error ${error}`);
}
