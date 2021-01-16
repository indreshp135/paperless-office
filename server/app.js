const express = require("express");
const bonafideHandler = require("./router/bonafideHandler");
const app = new express();

const PORT = 8001;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/bonafide", bonafideHandler);

app.listen(PORT, () => {
	console.log(`App running on port: ${PORT}`);
});
