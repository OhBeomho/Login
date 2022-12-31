import { Router } from "express";
import { Account } from "../db/account";

const router = Router();

router.route("/login")
	.get((_, res) => res.render("login.html"))
	.post((req, res) => {
		const { id, password } = req.body;

		Account.login(id, password)
			.then(() => {
				req.session.user = id;
				res.redirect("/");
			}).catch((err) => res.render("error", { err }));
	});

router.route("/signup")
	.get((_, res) => res.render("signup.html"))
	.post((req, res) => {
		const { id, password } = req.body;

		Account.signUp(id, password)
			.then(() => res.redirect("/account/login"))
			.catch((err) => res.render("error", { err }));
	});

router.get("/checkid/:id", (req, res) =>
	Account.checkID(req.params.id)
		.then((unique) => res.status(200).send({ unique }))
		.catch((err) => res.status(500).send(err))
);

router.get("/logout", (req, res) => {
	if (req.session.user)
		req.session.destroy((err) => {
			if (err) res.render("error", { err })
			else res.redirect("/account/login");
		});
	else res.redirect("/account/login");
});

router.get("/delete", (req, res) => {
	if (!req.session.user) {
		res.render("error", { err: "You are not logged in." });
		return;
	}

	Account.deleteAccount(req.session.user)
		.then(() => res.redirect("/account/logout"))
		.catch((err) => res.render("error", { err }));
});

export default router;
