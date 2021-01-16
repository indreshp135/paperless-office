const express = require("express");
const bonafideHandler = require("./router/bonafideHandler");

const signHandler = require("./router/signHandler");

const TCHandler = require("./router/TCHandler");

const app = new express();

const PORT = 8000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bonafide", bonafideHandler);
app.use("/tc", TCHandler);

app.use("/signpdf", signHandler);

app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});
