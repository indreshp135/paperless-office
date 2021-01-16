const {
	Gateway,
	Wallets,
	TxEventHandler,
	GatewayOptions,
	DefaultEventHandlerStrategies,
	TxEventHandlerFactory,
} = require("fabric-network");
const fs = require("fs");
const path = require("path");
const util = require("util");

const helper = require("./helper");

const invokeTransaction = async (
	channelName,
	chaincodeName,
	fcn,
	args,
	username,
	org_name,
	transientData
) => {
	try {
		const ccp = await helper.getCCP(org_name);

		const walletPath = await helper.getWalletPath(org_name);
		const wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Wallet path: ${walletPath}`);

		let identity = await wallet.get(username);
		if (!identity) {
			console.log(`New User reg`);
			await helper.getRegisteredUser(username, org_name, true);
			identity = await wallet.get(username);
			console.log("Run  registerUser.js application before retrying");
			return;
		}

		const connectOptions = {
			wallet,
			identity: username,
			discovery: { enabled: true, asLocalhost: true },
			eventHandlerOptions: {
				commitTimeout: 100,
				strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ALLFORTX,
			},
		};

		const gateway = new Gateway();
		await gateway.connect(ccp, connectOptions);

		const network = await gateway.getNetwork(channelName);

		const contract = network.getContract(chaincodeName);

		let result;
		let message;
		if (
			fcn === "createCar" ||
			fcn === "createPrivateCarImplicitForOrg1" ||
			fcn == "createPrivateCarImplicitForOrg2"
		) {
			result = await contract.submitTransaction(
				fcn,
				args[0],
				args[1],
				args[2],
				args[3],
				args[4]
			);
			message = `Successfully added the car asset with key ${args[0]}`;
		} else if (fcn === "changeCarOwner") {
			result = await contract.submitTransaction(fcn, args[0], args[1]);
			message = `Successfully changed car owner with key ${args[0]}`;
		} else if (fcn == "createPrivateCar" || fcn == "updatePrivateData") {
			console.log(`Transient data is : ${transientData}`);
			let carData = JSON.parse(transientData);
			console.log(`car data is : ${JSON.stringify(carData)}`);
			let key = Object.keys(carData)[0];
			const transientDataBuffer = {};
			transientDataBuffer[key] = Buffer.from(JSON.stringify(carData.car));
			result = await contract
				.createTransaction(fcn)
				.setTransient(transientDataBuffer)
				.submit();
			message = `Successfully submitted transient data`;
		} else {
			return `Invocation require either createCar or changeCarOwner as function but got ${fcn}`;
		}

		await gateway.disconnect();

		result = JSON.parse(result.toString());

		let response = {
			message: message,
			result,
		};

		return response;
	} catch (error) {
		console.log(`Getting error: ${error}`);
		return error.message;
	}
};

exports.invokeTransaction = invokeTransaction;
