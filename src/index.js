const express = require('express')
var morgan = require('morgan')
var cors = require('cors');

const app = express();

require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const port = 3000 || process.env.PORT

require('./app/routes/authRoutes')(app);
require('./app/routes/productRoutes')(app);
require('./app/routes/restaurantRoutes')(app);
require('./app/routes/userRoutes')(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})