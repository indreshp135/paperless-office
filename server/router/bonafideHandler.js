const router = require("express").Router();
const createBonafide = require("../helpers/createBonafide");
// const { sendEmail } = require("../helpers/sendEmail");
const crypto = require("crypto");
const addFileIPFS = require("../helpers/addFileIPFS");
const query = require("../app/query")
const { exec,execFile } = require('child_process');
const shelljs =require("shelljs")

router.post("/", async (req, res) => {
	const {  rollno, year, course, dept, purpose,username,name  } = req.body;
	console.log(req.body)
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
	console.log(`New PDF Generated: ${randomName} ${randomPath}`);
	//Waiting to Generate File
	await new Promise((r) => setTimeout(r, 3000));
	const hash = await addFileIPFS(randomName, randomPath);

	sendEmail(hash, "vsanirudh2001@gmail.com", "vsanirudh2001@gmail.com", true);

	const obj = {
		"function":"addFile","Args":[`${randomName}`,`${name}`,`${hash}`,"BONAFIDE"]
	}

	var yourscript = exec(`../"shell scripts"/addFile.sh '${JSON.stringify(obj)}'`,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
		});
	
	// args = [randomName,username,hash,"BONAFIDE"];
	// const output = await query.query(
	// 	"mychannel",
	// 	"mycc",
	// 	args,
	// 	"addFile",
	// 	username,
	// 	"Org1"
	// );
	
	res.json({ hash });
});

module.exports = router;
