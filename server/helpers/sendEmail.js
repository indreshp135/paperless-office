const nodemailer = require("nodemailer");
const config = require("config");
const sendEmail = (fileHash, adminEmail, studentEmail) => {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: config.get("gmail.email"),
			pass: config.get("gmail.password"),
		},
	});
	const toAdmin = {
		from: "onsitetask@gmail.com", // sender address
		to: adminEmail, // list of receivers
		subject: "Request for Document", // Subject line
		html: `<p>A student has requested a document, please verify it. Link to application: http://localhost:9090/ipfs/${fileHash}</p>`, // plain text body
	};
	const toStudent = {
		from: "onsitetask@gmail.com", // sender address
		to: studentEmail, // list of receivers
		subject: "Your Request has been Recieved", // Subject line
		html: `<p>We have recieved your request to document. Your application is http://localhost:9090/ipfs/${fileHash}</p>`, // plain text body
	};
	transporter.sendMail(toAdmin, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
	transporter.sendMail(toStudent, function (err, info) {
		if (err) console.log(err);
		else console.log(info);
	});
};

module.exports = { sendEmail };
