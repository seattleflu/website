const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');
const compression = require('compression');

const app = express();
app.use(compression()); // send files using compression (if possible)
app.set('port', process.env.PORT || 5000);
app.use(sslRedirect()); // redirect HTTP to HTTPS
app.use(require('express-naked-redirect')({reverse: true})); // redirect www.seattleflu.org to seattleflu.org
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/**', (req, res) => {
  res.redirect(302, "/");
});



const server = app.listen(app.get('port'), () => {
  console.log("-----------------------------------");
  console.log(`  Seattle Flu Study Server listening on port ${server.address().port}`);
  console.log(`  Accessible at http://localhost:${server.address().port}`)
  console.log("-----------------------------------\n\n");
});
