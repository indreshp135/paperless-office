const router = require("express").Router();
const createTC = require("../helpers/createTC");
const { sendEmail } = require("../helpers/sendEmail");
const crypto = require("crypto");
const addFileIPFS = require("../helpers/addFileIPFS");

router.post("/", async (req, res) => {
	const {
		name,
		dob,
		rollno,
		course,
		fatherName,
		sex,
		nationality,
		dept,
		pass,
		address,
	} = req.body;
	console.log(`Request to get TC ${JSON.stringify(req.body)}`);
	const dateNow = new Date();
	const date =
		dateNow.getDate().toString() +
		"/" +
		(dateNow.getMonth() + 1).toString() +
		"/" +
		dateNow.getFullYear().toString();
	const randomName = crypto.randomBytes(10).toString("hex");
	const randomPath = "generatedPDFs/" + randomName + ".pdf";
	await createTC(randomPath, {
		name: name.toUpperCase(),
		dob,
		rollno,
		course,
		fatherName,
		sex,
		nationality,
		dept,
		pass,
		address,
	});
	console.log(`New PDF Generated: ${randomName} ${randomPath}`);
	//Waiiting to Generate File
	await new Promise((r) => setTimeout(r, 3000));
	const hash = await addFileIPFS(randomName, randomPath);

	sendEmail(hash, "vsanirudh2001@gmail.com", "vsanirudh2001@gmail.com", true);

	// const obj = {
	// 	"function":"addFile","Args":[`${randomName}`,`${name}`,`${hash}`,"TC"]
	// }

	// exec(`../"shell scripts"/addFile.sh '${JSON.stringify(obj)}'`,
    //     (error, stdout, stderr) => {
    //         console.log(stdout);
    //         console.log(stderr);
    //         if (error !== null) {
    //             console.log(`exec error: ${error}`);
    //         }
	// 	});
	
	args = [randomName,username,hash,"TC"];
	const output = await query.query(
		"documentchannel",
		"records",
		args,
		"changeFile",
		username,
		"Administration"
	);
	res.json({ hash });
});

module.exports = router;
