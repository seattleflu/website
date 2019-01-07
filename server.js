const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();
app.set('port', process.env.PORT || 5000);
// app.use(sslRedirect()); // redirect HTTP to HTTPS
app.use(require('express-naked-redirect')({reverse: true})); // redirect www.seattleflu.org to seattleflu.org
app.use(express.static(path.join(__dirname, 'build')));
app.use('/favicon.png', express.static(path.join(__dirname, "build", "favicon.png")));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const server = app.listen(app.get('port'), () => {
  console.log("-----------------------------------");
  console.log(`  Seattle Flu Study Server listening on port ${server.address().port}`);
  console.log(`  Accessible at http://localhost:${server.address().port}`)
  console.log("-----------------------------------\n\n");
});
