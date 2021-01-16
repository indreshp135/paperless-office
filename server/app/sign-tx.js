const certPem = "<PEM encoded certificate content>";
const mspId = "Org1MSP"; // the msp Id for this org

const transactionProposal = {
	fcn: "move",
	args: ["a", "b", "100"],
	chaincodeId: "mychaincodeId",
	channelId: "mychannel",
};
const { proposal, txId } = channel.generateUnsignedProposal(
	transactionProposal,
	mspId,
	certPem
);

const proposalBytes = proposal.toBuffer();

const hashFunction = xxxx;

const digest = hashFunction(proposalBytes);

const elliptic = require("elliptic");
const { KEYUTIL } = require("jsrsasign");

const privateKeyPEM = "<The PEM encoded private key>";
const { prvKeyHex } = KEYUTIL.getKey(privateKeyPEM);

const EC = elliptic.ec;
const ecdsaCurve = elliptic.curves["p256"];

const ecdsa = new EC(ecdsaCurve);
const signKey = ecdsa.keyFromPrivate(prvKeyHex, "hex");
const sig = ecdsa.sign(Buffer.from(digest, "hex"), signKey);

const signature = Buffer.from(sig.toDER());
const signedProposal = {
	signature,
	proposal_bytes: proposalBytes,
};

const sendSignedProposalReq = { signedProposal, targets };
const proposalResponses = await channel.sendSignedProposal(
	sendSignedProposalReq
);
