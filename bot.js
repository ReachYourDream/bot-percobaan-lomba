'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var echo = { type: 'text', text: 'Untuk sementara fitur yang bisa digunakan hanya: \n\
  dosen(spasi)nama dosen\n\
  Contoh: Dosen Rudi' };
  var echo_carousel = {"type": "template",
  "altText": "this is a carousel template",
  "template": {
    "type": "carousel",
    "actions": [],
    "columns": [
      {
        "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
        "title": "Title",
        "text": "Text",
        "actions": [
          {
            "type": "message",
            "label": "Action 1",
            "text": "Action 1"
          },
          {
            "type": "message",
            "label": "Action 2",
            "text": "Action 2"
          }
        ]
      },
      {
        "thumbnailImageUrl": "SPECIFY_YOUR_IMAGE_URL",
        "title": "Title",
        "text": "Text",
        "actions": [
          {
            "type": "message",
            "label": "Action 1",
            "text": "Action 1"
          },
          {
            "type": "message",
            "label": "Action 2",
            "text": "Action 2"
          }
        ]
      }
    ]
  }};
// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.post('/callback', line.middleware(config), (req, res) => {

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  console.log('woi');
  const insert_text = String(event.message.text);
  echo.text = 'Coba test';
  return client.replyMessage(event.replyToken,echo);
}