"use strict";
var { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const FabricCAServices = require("fabric-ca-client");
const fs = require("fs");

const util = require("util");

const getCCP = async (org) => {
	let ccpPath;
	if (org == "Students") {
		ccpPath = path.resolve(
			__dirname,
			"../../blockchain/organizations/peerOrganizations/students.scheisse.edu/connection-students.json"
		);
	} else if (org == "Administration") {
		ccpPath = path.resolve(
			__dirname,
			"../../blockchain/organizations/peerOrganizations/administration.scheisse.edu/connection-administration.json"
		);
	} else return null;
	const ccpJSON = fs.readFileSync(ccpPath, "utf8");
	const ccp = JSON.parse(ccpJSON);
	return ccp;
};

const getCaUrl = async (org, ccp) => {
	let caURL;
	caURL = ccp.certificateAuthorities['ca.students.scheisse.edu'].url;
	return caURL;
};

const getWalletPath = async (org) => {
	let walletPath;
	if (org == "Students") {
		walletPath = path.join(process.cwd(), "wallet");
	} else if (org == "Administration") {
		walletPath = path.join(process.cwd(), "wallet");
	} else return null;
	return walletPath;
};

const getRegisteredUser = async (username, userOrg = "Students", isJson) => {
	let ccp = await getCCP(userOrg);

	const caURL = await getCaUrl(userOrg, ccp);
	const ca = new FabricCAServices(caURL);

	const walletPath = await getWalletPath(userOrg);
	const wallet = await Wallets.newFileSystemWallet(walletPath);
	console.log(`Wallet path: ${walletPath}`);

	const userIdentity = await wallet.get(username);
	if (userIdentity) {
		var response = {
			success: true,
			message: username + " enrolled Successfully",
		};
		return response;
	}

	let adminIdentity = await wallet.get("admin");
	if (!adminIdentity) {
		await enrollAdmin(userOrg, ccp);
		adminIdentity = await wallet.get("admin");
		console.log("Admin Enrolled Successfully");
	}

	const provider = wallet
		.getProviderRegistry()
		.getProvider(adminIdentity.type);
	const adminUser = await provider.getUserContext(adminIdentity, "admin");
	let secret;
	try {
		secret = await ca.register(
			{
				enrollmentID: username,
				role: "client",
			},
			adminUser
		);
	} catch (error) {
		return error.message;
	}

	const enrollment = await ca.enroll({
		enrollmentID: username,
		enrollmentSecret: secret,
	});

	let x509Identity;
	if (userOrg == "Students") {
		x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: "StudentsMSP",
			type: "X.509",
		};
	}
	await wallet.put(username, x509Identity);
	var response = {
		success: true,
		message: username + " enrolled Successfully",
	};
	return response;
};

const isUserRegistered = async (username, userOrg = "Students") => {
	const walletPath = await getWalletPath(userOrg);
	const wallet = await Wallets.newFileSystemWallet(walletPath);
	console.log(`Wallet path: ${walletPath}`);

	const userIdentity = await wallet.get(username);
	if (userIdentity) {
		return true;
	}
	return false;
};

const getCaInfo = async (org, ccp) => {
	let caInfo;
	if (org == "Students") {
		caInfo = ccp.certificateAuthorities["ca.students.scheisse.edu"];
	} else return null;
	return caInfo;
};

const enrollAdmin = async (org, ccp) => {

	try {
		const caInfo = await getCaInfo(org, ccp);
		const caTLSCACerts = caInfo.tlsCACerts.pem;
		const ca = new FabricCAServices(
			caInfo.url,
			{ trustedRoots: caTLSCACerts, verify: false },
			caInfo.caName
		);

		const walletPath = await getWalletPath(org);
		const wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Wallet path: ${walletPath}`);

		const identity = await wallet.get("admin");
		if (identity) {
			return;
		}

		const enrollment = await ca.enroll({
			enrollmentID: "admin",
			enrollmentSecret: "adminpw",
		});
		let x509Identity;
		if (org == "Students") {
			x509Identity = {
				credentials: {
					certificate: enrollment.certificate,
					privateKey: enrollment.key.toBytes(),
				},
				mspId: "StudentsMSP",
				type: "X.509",
			};
		} else if (org == "Administration") {
			x509Identity = {
				credentials: {
					certificate: enrollment.certificate,
					privateKey: enrollment.key.toBytes(),
				},
				mspId: "AdministrationMSP",
				type: "X.509",
			};
		}

		await wallet.put("admin", x509Identity);
		console.log(
			'Successfully enrolled admin user "admin" and imported it into the wallet'
		);
		return;
	} catch (error) {
		console.error(`Failed to enroll admin user "admin": ${error}`);
	}
};

const registerAndGetSecret = async (username, userOrg) => {
	let ccp = await getCCP(userOrg);

	const caURL = await getCaUrl(userOrg, ccp);
	const ca = new FabricCAServices(caURL);

	const walletPath = await getWalletPath(userOrg);
	const wallet = await Wallets.newFileSystemWallet(walletPath);
	console.log(`Wallet path: ${walletPath}`);

	const userIdentity = await wallet.get(username);
	if (userIdentity) {
		var response = {
			success: true,
			message: username + " enrolled Successfully",
		};
		return response;
	}

	let adminIdentity = await wallet.get("admin");
	if (!adminIdentity) {
		await enrollAdmin(userOrg, ccp);
		adminIdentity = await wallet.get("admin");
		console.log("Admin Enrolled Successfully");
	}

	const provider = wallet
		.getProviderRegistry()
		.getProvider(adminIdentity.type);
	const adminUser = await provider.getUserContext(adminIdentity, "admin");
	let secret;
	try {
		secret = await ca.register(
			{
				enrollmentID: username,
				role: "client",
			},
			adminUser
		);
	} catch (error) {
		return error.message;
	}

	var response = {
		success: true,
		message: username + " enrolled Successfully",
		secret: secret,
	};
	return response;
};

exports.getRegisteredUser = getRegisteredUser;

module.exports = {
	getCCP: getCCP,
	getWalletPath: getWalletPath,
	getRegisteredUser: getRegisteredUser,
	isUserRegistered: isUserRegistered,
	registerAndGetSecret: registerAndGetSecret,
};
