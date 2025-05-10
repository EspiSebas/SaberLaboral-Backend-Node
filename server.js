const express = require('express');
const app = express();
const PORT = 5000;
const router = require('./routes/enrutamiento')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', router())


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});