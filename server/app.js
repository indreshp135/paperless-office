const express = require("express");
const bonafideHandler = require("./router/bonafideHandler");
const signHandler = require("./router/signHandler");
const TCHandler = require("./router/TCHandler");
const cors = require('cors')
const app = new express();

const PORT = 8000;

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

app.use("/bonafide", bonafideHandler);
app.use("/tc", TCHandler);
app.use("/signpdf", signHandler);

app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});
