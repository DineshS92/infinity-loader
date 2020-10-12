const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  const {query, count} = JSON.parse(event.body);
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.unsplash.com/photos/random/?query=${query}&count=${count}&client_id=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
