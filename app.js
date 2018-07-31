const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'library secret ha ha ha' }));

require('./src/config/passport')(app);

app.use((req, res, next) => {
  debug('my middleware');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './src/views/');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const bookRouter = require('./src/routes/bookRoutes')();
const adminRouter = require('./src/routes/adminRoutes')();
const authRouter = require('./src/routes/authRoutes')();

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, 'views', 'index.html'));
  response.render('index',
    {
      nav: require('./src/common/nav')(request),
      title: 'Library',
    });
});

app.listen(3001, () => {
  debug(`Listening on port ${chalk.blue('3001')}.`);
});
