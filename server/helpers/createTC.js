const pdf = require("pdf-creator-node");
const fs = require("fs");

// var user = {
// 	name: "Anirudh",
// 	rollno: "1111",
// 	year: "2001",
// 	course: "btech",
// 	dept: "deptartment",
// 	date: "moment js date",
// 	purpose: "reason so and so",
// };

const createTC = async (randomPath, user) => {
	// Read HTML Template
	var html = fs.readFileSync("templates/TC.html", "utf8");
	var options = {
		format: "A4",
		orientation: "portrait",
		border: "10mm",
	};

	var document = {
		html: html,
		data: {
			user: user,
		},
		path: randomPath,
	};

	pdf.create(document, options)
		.then((res) => {
			return res.fileName;
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = createTC;
