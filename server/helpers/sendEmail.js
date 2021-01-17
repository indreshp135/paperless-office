const nodemailer = require("nodemailer");
const config = require("config");
const sendEmail = (fileHash, adminEmail, studentEmail, isRequest) => {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: config.get("gmail.email"),
			pass: config.get("gmail.password"),
		},
	});
	let toAdmin, toStudent;
	if(isRequest){
		toAdmin = {
			from: "onsitetask@gmail.com", 
			to: adminEmail, 
			subject: "Request for Document",
			html: `<p>A student has requested a document, please verify it. Link to application: http://localhost:9090/ipfs/${fileHash}</p>`,
		};
		toStudent = {
			from: "onsitetask@gmail.com", 
			to: studentEmail, 
			subject: "Your Request has been Recieved",
			html: `<p>We have recieved your request to document. Your application is http://localhost:9090/ipfs/${fileHash}</p>`, 
		};

		transporter.sendMail(toAdmin, function (err, info) {
			if (err) console.log(err);
			else console.log(info);
		});
	}
	else {
		toStudent = {
			from: "onsitetask@gmail.com", // sender address
			to: studentEmail, // list of receivers
			subject: "Your Document has been issued", // Subject line
			html: `<p>Your document has been issued. You can download it at http://localhost:9090/ipfs/${fileHash}</p>`, 
		};
	}


	transporter.sendMail(toStudent, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
};

module.exports = { sendEmail };
