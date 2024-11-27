const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

app.post('/webhook', async (req, res) => {
  try {
    await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
      {
        event_type: 'external-webhook-event',
        client_payload: req.body,
      },
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }
    );
    res.status(200).send('Webhook received and action triggered.');
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send('Error triggering action.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
