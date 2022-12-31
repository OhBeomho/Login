import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
export const db = new sqlite.Database("db/accdb.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
	if (err) {
		console.log(err.message);
		process.exit(1);
	}

	console.log("Connected to database.");

	db.exec("CREATE TABLE IF NOT EXISTS account(id TEXT PRIMARY KEY, password TEXT NOT NULL);", (err) => {
		if (err) {
			console.log(err.message);
			db.close();
			process.exit(1);
		}
	});
});
