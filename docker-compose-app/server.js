const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis-server:6379'
})

const connect = async () => {
  if (!client.isOpen) {
    await client.connect()
    await client.set('number', 0);

  }
}

const disconnect = async () => {
  if (client.isOpen) {
    await client.disconnect();
  }
}

const app = express();
connect();

app.get('/', async (req, res) => {
  await connect();

  let number = await client.get('number');
  if (number === null) {
    number = 0;
  }

  res.send('숫자가 1씩 올라갑니다. 숫자: ' + number);

  await client.set('number', parseInt(number) + 1);
});

app.get('/disconnect', async (req, res) => {
  await disconnect();
  res.send('연결이 종료되었습니다.');
});

app.listen(8080);

console.log('Server is running');