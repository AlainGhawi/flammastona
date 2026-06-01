exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const token = event.headers["x-session-token"];
  if (!token || token !== process.env.SESSION_TOKEN) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO; // e.g. "username/flammastona"

  if (!githubToken || !githubRepo) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "GITHUB_TOKEN or GITHUB_REPO not set." }),
    };
  }

  try {
    const { config } = JSON.parse(event.body);
    if (!config) {
      return { statusCode: 400, body: JSON.stringify({ error: "No config provided" }) };
    }

    const content = Buffer.from(JSON.stringify(config, null, 2)).toString("base64");
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/config.json`;

    // Get current file SHA (needed to update an existing file)
    let sha = null;
    const getResp = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json",
      },
    });
    if (getResp.ok) {
      const data = await getResp.json();
      sha = data.sha;
    }

    // Commit the new config.json
    const putResp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update config.json via admin panel",
        content,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putResp.ok) {
      const err = await putResp.text();
      throw new Error(`GitHub API error: ${putResp.status} — ${err}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};