const express = require("express");
const app = new express();
// const config = require("config");
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const shelljs = require("shelljs")

//Routes for signing and ipfs
const bonafideHandler = require("./router/bonafideHandler");
const signHandler = require("./router/signHandler");
const TCHandler = require("./router/TCHandler");

const PORT =   8000;

const helper = require("./app/helper");
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
app.use(
	expressJWT({
		algorithms:["HS256"],
		secret: "Schisse",
	}).unless({
		path: ["/users", "/users/login", "/register"],
	})
);
app.use(bearerToken());

app.use((req, res, next) => {
	if (
		req.originalUrl.indexOf("/users") >= 0 ||
		req.originalUrl.indexOf("/users/login") >= 0 ||
		req.originalUrl.indexOf("/register") >= 0
	) {
		return next();
	}
	var token = req.token;
	jwt.verify(token, app.get("secret"), (err, decoded) => {
		if (err) {
			console.log(err)
			res.send({
				success: false,
				message:
					"Failed to authenticate token. Make sure to include the " +
					"token returned from /users call in the authorization header " +
					" as a Bearer token",
			});

			return;
		} else {
			req.username = decoded.username;
			req.orgname = decoded.orgName;
			return next();
		}
	});
});

// Register and enroll user
app.post("/users", async function (req, res) {
	var username = req.body.name||"Admin";
	var orgName = req.body.password||"Org1";
	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +
				18000,
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);
	let response = await helper.getRegisteredUser(username, orgName, true);
	if (response && typeof response !== "string") {
		response.token = token;
		response.user = username;
		res.json(response);
	} else {
		res.json({ success: false, message: response });
	}
});

// Register and enroll user
app.post("/register", async function (req, res) {
	var username = req.body.name||"Admin";
	var orgName = req.body.password||"Admin";
	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +
				186400,
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);
	console.log(token);

	let response = await helper.registerAndGetSecret(username, "Students");

	if (response && typeof response !== "string") {
		response.token = token;
		response.user = username;
		res.json(response);
	} else {

		res.json({ success: false, message: response });
	}
});

app.post("/users/login", async function (req, res) {
	console.log(req.body)
	var username = req.body.name;
	var orgName = req.body.password;
	var token = jwt.sign(
		{
			exp:
				Math.floor(Date.now() / 1000) +180000,
			username: username,
			orgName: orgName,
		},
		app.get("secret")
	);

	let isUserRegistered = await helper.isUserRegistered(
		username,
		(orgName = "Students")
	);

	if (isUserRegistered) {
		res.json({ success: true, message: { token: token,user:username } });
	} else {
		res.json({
			success: false,
			message: `User with username ${username} is not registered with ORG1, Please register first.`,
		});
	}
});

app.post("/admin/toverify", async(req, res) => {
	args = [];
	username = req.body.user ;
	console.log(username)
	let output = await query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithAdminNotVerified",
		username,
		"Students"
	);
	
	const p = await output.toString()
	console.log(1,JSON.parse(p))
	const finalArray = [];
	JSON.parse(p).forEach(o => {
		const key = o.Key;
		const rec = o.Record;
		finalArray.push({key, ...rec} );
		console.log( {key, ...rec} );	
	});
	
	res.send(finalArray);
});

app.post("/admin/signed", async (req, res) => {
	args = [];
	username = req.body.user ;
	const output = await query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithAdminVerified",
		username,
		"Students"
	);
	const p = await output.toString()
	console.log(1,JSON.parse(p))
	const finalArray = [];
	JSON.parse(p).forEach(o => {
		const key = o.Key;
		const rec = o.Record;
		finalArray.push({key, ...rec} );
		console.log( {key, ...rec} );	
	});
	
	res.send(finalArray);
});

app.post("/userall/sent", async (req, res) => {
	username = req.body.user ;
	console.log(typeof username)
	args = [username];
	const output = await query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithUserNotVerified",
		username,
		"Org1"
	);
	console.log(1,output)
	const p = output.toString()
	console.log(1,JSON.parse(p))
	const finalArray = [];
	JSON.parse(p).forEach(o => {
		const key = o.Key;
		const rec = o.Record;
		finalArray.push({key, ...rec} );
		console.log( {key, ...rec} );	
	});
	res.send(finalArray);
});

app.post("/userall/recieved", async (req, res) => {
	username = req.body.user ;
	args = [username];
	const output = await query.query(
		"mychannel",
		"mycc",
		args,
		"queryAllWithUserVerified",
		username,
		"Org1"
	);
	const p = await output.toString()
	console.log(1,JSON.parse(p))
	const finalArray = [];
	JSON.parse(p).forEach(o => {
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
