const sqlite3 = require('sqlite3').verbose();
exports.initilizeDB = async function(){
    let db = new sqlite3.Database("pollstatus.db", (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the sqlitedatabase.');
      });
      db.run('CREATE TABLE IF NOT EXISTS pollstat (id INTEGER PRIMARY KEY AUTOINCREMENT, ipaddr TEXT NOT NULL UNIQUE);');
      db.run('CREATE TABLE IF NOT EXISTS userrole (id INTEGER PRIMARY KEY AUTOINCREMENT, rolename TEXT NOT NULL UNIQUE);');
      return db
}