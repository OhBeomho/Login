import express from "express";
import session from "express-session";
import accountRouter from "./src/routes/accountRouter";
import { renderFile } from "ejs";

// Custom session data
declare module "express-session" {
	interface SessionData {
		user?: string;
	}
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: "Enter Your Secret Here",
	resave: false,
	saveUninitialized: true
}));
app.use("/account", accountRouter);

app.set("view engine", "ejs");
app.set("views", "views");

app.engine("html", renderFile);

app.get("/", (req, res) => {
	if (!req.session.user) {
		res.redirect("/account/login");
		return;
	}

	res.render("index", { user: req.session.user });
});

app.listen(8080, () => console.log("Server is running on port 8080."));
