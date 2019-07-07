const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/carpediem', {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
