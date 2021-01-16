const ipfsClient = require("ipfs-http-client");
const fs = require("fs");

const ipfs = ipfsClient({
	host: "localhost",
	port: "5002",
	protocol: "http",
});

const addFileIPFS = async (fileName, filePath) => {
	const file = fs.readFileSync(filePath);
	const addedFile = await ipfs.add({ path: fileName, content: file });
	console.log(`FileHash: ${addedFile.cid.toString()}`);
	return addedFile.cid.toString();
};

module.exports = addFileIPFS;
