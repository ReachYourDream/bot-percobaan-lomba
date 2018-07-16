'use strict';
const express = require('express');
const line = require('@line/bot-sdk');// create LINE SDK config from env variables

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
  console.log(event);
	if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var echo = {type: 'text', text: 'coba'};
  const insert_text = String(event.message.text);
  if(insert_text.toLowerCase()=="Sakit"){
    echo.text = "Sabar ya";
  }
  console.log('woi');
  // echo.text = 'Coba test';
  return client.replyMessage(event.replyToken,echo);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});