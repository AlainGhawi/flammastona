exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;

  if (!githubToken || !githubRepo) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GITHUB_TOKEN or GITHUB_REPO not set." }),
    };
  }

  try {
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/config.json`;

    const resp = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json",
      },
    });

    if (!resp.ok) {
      return { statusCode: 404, body: JSON.stringify({ error: "config.json not found in repo" }) };
    }

    const data = await resp.json();
    const config = JSON.parse(Buffer.from(data.content, "base64").toString("utf8"));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(config),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};