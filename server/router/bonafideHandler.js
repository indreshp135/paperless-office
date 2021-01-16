const router = require("express").Router();
const createBonafide = require("../helpers/createBonafide");
const { sendEmail } = require("../helpers/sendEmail");
const crypto = require("crypto");
const addFileIPFS = require("../helpers/addFileIPFS");
const { send } = require("process");
const fs = require("fs");

router.post("/", async (req, res) => {
	const { name, rollno, year, course, dept, purpose } = req.body;
	console.log(`Request to get bonafide ${JSON.stringify(req.body)}`);
	const dateNow = new Date();
	const date =
		dateNow.getDate().toString() +
		"/" +
		(dateNow.getMonth() + 1).toString() +
		"/" +
		dateNow.getFullYear().toString();
	const randomName = crypto.randomBytes(10).toString("hex");
	const randomPath = "generatedPDFs/" + randomName + ".pdf";
	await createBonafide(randomPath, {
		name: name.toUpperCase(),
		rollno,
		year,
		course,
		dept,
		purpose,
		date,
	});
	console.log(`New PDF Generated: ${randomName}`);
	//Waiiting to Generate File
	while (!fs.existsSync(randomPath));

	const hash = await addFileIPFS(randomName, randomPath);

	sendEmail(hash, "vsanirudh2001@gmail.com", "vsanirudh2001@gmail.com");

	res.json({ hash });
});

module.exports = router;
