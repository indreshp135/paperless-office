const router = require("express").Router();
const crypto = require("crypto");
const addFileIPFS = require("../helpers/addFileIPFS");
const {sendEmail} = require("../helpers/sendEmail")
const fs = require("fs");

router.get("/:fileHash/:fileId", async (req, res) => {
	const { fileHash } = req.params;
	const {user} = req.body
	console.log(`File Hash recieved is: ${fileHash}`);

	const randomName = crypto.randomBytes(10).toString("hex");
	const randomPath = "signedPDFs/" + randomName + ".pdf";

	var spawn = require("child_process").spawn;
	var python = spawn("python3", [
		"../python-scripts/signpdf.py",
		fileHash,
		randomName,
	]);
	python.stdout.on("data", function (data) {
		dataToSend = data.toString();
		console.log(dataToSend);
	});
	python.on("error", function (err) {
		console.log(err);
	});
	//Waiting to Generate File
	await new Promise((r) => setTimeout(r, 3000));

	const hash = await addFileIPFS(randomName, randomPath);
	console.log(hash);
	fs.unlinkSync(randomPath);
	sendEmail(hash, "vsanirudh2001@gmail.com", "vsanirudh2001@gmail.com", false);
	const obj = {
		"function":"addFile","Args":[`${fileHash}`,`${hash}`]
	}

	exec(`../"shell scripts"/addFile.sh '${JSON.stringify(obj)}'`,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
		});
	
	const obj = {
		"function":"addFile","Args":[`${hash}`]
	}

	exec(`../"shell scripts"/addFile.sh '${JSON.stringify(obj)}'`,
		(error, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			if (error !== null) {
				console.log(`exec error: ${error}`);
			}
		});
	
	// args = [fileHash,hash];
	// const output = await query.query(
	// 	"mychannel",
	// 	"mycc",
	// 	args,
	// 	"changeFile",
	// 	username,
	// 	"Org1"
	// );

	// args = [hash];
	// const output = await query.query(
	// 	"mychannel",
	// 	"mycc",
	// 	args,
	// 	"returnFile",
	// 	username,
	// 	"Org1"
	// );
	res.json(hash);
});
//QmeQgVkVPv3bGRFD3KLudAv6C5p2yxF7gNSRiKFpPn1GTw // Test hash

module.exports = router;
