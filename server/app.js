const http = require("http");
const util = require("util");

const express = require("express");
const app = new express();
const config = require("config");
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const bearerToken = require("express-bearer-token");
const cors = require("cors");

//Routes for signing and ipfs
const bonafideHandler = require("./router/bonafideHandler");
const signHandler = require("./router/signHandler");
const TCHandler = require("./router/TCHandler");

const PORT = config.get("PORT") || 8000;

const helper = require("./app/helper");
const invoke = require("./app/invoke");
const qscc = require("./app/qscc");
const query = require("./app/query");

//CORS
app.options("*", cors());
app.use(cors());

//CORS

app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set secret variable
app.set("secret", "Schisse");
// app.use(
// 	expressJWT({
// 		algorithms:["SHA256"],
// 		secret: "Schisse",
// 	}).unless({
// 		path: ["/users", "/users/login", "/register"],
// 	})
// );
// app.use(bearerToken());

// app.use((req, res, next) => {
// 	if (
// 		req.originalUrl.indexOf("/users") >= 0 ||
// 		req.originalUrl.indexOf("/users/login") >= 0 ||
// 		req.originalUrl.indexOf("/register") >= 0
// 	) {
// 		return next();
// 	}
// 	var token = req.token;
// 	jwt.verify(token, app.get("secret"), (err, decoded) => {
// 		if (err) {
// 			res.send({
// 				success: false,
// 				message:
// 					"Failed to authenticate token. Make sure to include the " +
// 					"token returned from /users call in the authorization header " +
// 					" as a Bearer token",
// 			});

// 			return;
// 		} else {
// 			req.username = decoded.username;
// 			req.orgname = decoded.orgName;
// 			return next();
// 		}
// 	});
// });

// Register and enroll user
app.post("/users", async function (req, res) {
	var username = req.body.username;
	var orgName = req.body.orgName;
	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +
				parseInt(constants.jwt_expiretime),
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);
	let response = await helper.getRegisteredUser(username, "Org1", true);
	if (response && typeof response !== "string") {
		response.token = token;
		res.json(response);
	} else {
		res.json({ success: false, message: response });
	}
});

// Register and enroll user
app.post("/register", async function (req, res) {
	var username = req.body.username;
	var orgName = req.body.orgName;
	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +
				parseInt(constants.jwt_expiretime),
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);

	console.log(token);

	let response = await helper.registerAndGerSecret(username, "Org1");

	if (response && typeof response !== "string") {
		response.token = token;
		res.json(response);
	} else {
		res.json({ success: false, message: response });
	}
});

// Login and get jwt
app.post("/users/login", async function (req, res) {
	var username = req.body.username;
	var orgName = req.body.orgName;

	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +
				parseInt(constants.jwt_expiretime),
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);

	let isUserRegistered = await helper.isUserRegistered(
		username,
		(orgName = "Org1")
	);

	if (isUserRegistered) {
		res.json({ success: true, message: { token: token } });
	} else {
		res.json({
			success: false,
			message: `User with username ${username} is not registered with ${orgName}, Please register first.`,
		});
	}
});

app.get("/admin/toverify", (req, res) => {
	args = [];
	username = req.user || "student";
	const output = query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithAdminNotVerified",
		username,
		"Org1"
	);
	console.log(output);
	res.send([output]);
});

app.get("/admin/signed", async (req, res) => {
	args = [];
	username = req.user || "student";
	const output = await query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithAdminVerified",
		username,
		"Org1"
	);
	const finalArray = [];
	output.forEach(o => {
		const key = o.Key;
		const rec = o.Record;
		finalArray.push({key, ...rec} );
		console.log( {key, ...rec} );	
	});
	
	res.send(finalArray);
});


//Routes to handle PDF
app.use("/bonafide", bonafideHandler);
app.use("/tc", TCHandler);
app.use("/signpdf", signHandler);

app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});
