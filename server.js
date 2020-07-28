const express = require('express');

const app = express();

app.use(express.static('./dist/recipe-course'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/recipe-course'}
  );
  });
app.listen(process.env.PORT || 8080);