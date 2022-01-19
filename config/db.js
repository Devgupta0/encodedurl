
var url = 'mongodb+srv://dev:12345@shorter.p4pcc.mongodb.net/shorter?retryWrites=true&w=majority';

const mongoose = require('mongoose');

module.exports = {
    connectToServer: function(callback ) {
        mongoose.connect(url,(err)=>{
            return callback(err);
        });
      }
}
