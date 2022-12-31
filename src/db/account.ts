import { db } from "./database";

export class Account {
	static async login(id: string, password: string) {
		return new Promise<void>((resolve, reject) => {
			db.get("SELECT password FROM account WHERE id = ?;", id, (err, row) => {
				if (err) reject(err);
				else if (!row) reject(new Error(`Account '${id}' does not exists.`));
				else if (row.password !== password) reject(new Error("Password is incorrect."));
				else resolve();
			});
		});
	}

	static async signUp(id: string, password: string) {
		return new Promise<void>((resolve, reject) => {
			db.run("INSERT INTO account VALUES(?, ?);", [id, password], (err) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}

	static async checkID(id: string) {
		return new Promise<boolean>((resolve, reject) => {
			db.get("SELECT EXISTS(SELECT * FROM account WHERE id = ?);", id, (err, row) => {
				if (err) reject(err);
				else resolve(!row.exists);
			});
		});
	}

	static async deleteAccount(id: string) {
		return new Promise<void>((resolve, reject) => {
			db.run("DELETE FROM account WHERE id = ?;", id, (err) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}
}
