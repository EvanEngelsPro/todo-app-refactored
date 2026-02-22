import express from 'express';
import db from './persistence';

import getGreeting from './routes/getGreeting';
import getItems from './routes/getItems';
import addItem from './routes/addItem';
import updateItem from './routes/updateItem';
import deleteItem from './routes/deleteItem';

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/api/greeting', getGreeting);
app.get('/api/items', getItems);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);

export default app;