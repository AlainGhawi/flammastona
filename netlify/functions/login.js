exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = process.env.SESSION_TOKEN;

  if (!adminPassword || !sessionToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ADMIN_PASSWORD or SESSION_TOKEN not set in environment variables." }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);

    if (password === adminPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, token: sessionToken }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ ok: false }),
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Bad request" }),
    };
  }
};