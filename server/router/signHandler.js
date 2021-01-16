const router = require("express").Router();
const crypto = require("crypto");
const addFileIPFS = require("../helpers/addFileIPFS");
const fs = require("fs");

router.post("/:fileHash", async (req, res) => {
	const { fileHash } = req.params;
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
});
//QmeQgVkVPv3bGRFD3KLudAv6C5p2yxF7gNSRiKFpPn1GTw

module.exports = router;
