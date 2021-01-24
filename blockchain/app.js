const { execSync } = require('child_process');
const express = require("express");
const app = new express();
const expressWs = require('express-ws')(app);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.ws('/console', (ws, req) => {
    process.stdout.on('data', (data) => ws.send(data.toString()));
});

const execScript = (script, args = "") => {
    console.log(`scripts/${script}.sh ${args}`);
    try {
        let result = execSync(`scripts/${script}.sh ${args}`, {
            shell: '/bin/sh'
        });
        console.log(result.toString());
        return (result.toString());
    } catch (e) {
        console.log(e.toString())
        return (e.stdout.toString() + e.toString());
    }
}

const setEnv = () => {
    execScript('setenv');
}

const cleanup = () => {
    execScript('cleanup');
}

const checkPrereqs = () => {
    execScript('prereqs');
}

const cleanupOrgs = () => {
    execScript('cleanupOrgs');
}

const createPeerOrg = (name, subdomain, domain, p0Port, caPort) => {
    execScript('createPeerOrg', [name, subdomain, domain, p0Port, caPort].join(' '));
}

const createOrdererOrg = (domain) => {
    execScript('createOrdererOrg', domain);
}

const createConsortium = (profile) => {
    execScript('createConsortium', profile);
}

const createChannel = (channelName, name, subdomain, domain, peerNo, port, profile) => {
    execScript('createChannel', [channelName, name, subdomain, domain, peerNo, port, profile].join(' '));
}

const joinChannel = (channelName, name, subdomain, domain, peerNo, port) => {
    execScript('joinChannel', [channelName, name, subdomain, domain, peerNo, port].join(' '));
}

const setAnchorPeer = (channelName, name, subdomain, domain, peerNo, port) => {
    execScript('setAnchorPeer', [channelName, name, subdomain, domain, peerNo, port].join(' '))
}

const deployChainCode = (channelName, name, subdomain, domain, peerNo, port, chainCodeName, chainCodeSrc) => {
    execScript('deployChainCode', [channelName, name, subdomain, domain, peerNo, port, chainCodeName, chainCodeSrc].join(' '));
}

const checkChainCodeCommitReadiness = (channelName, name, subdomain, domain, peerNo, port, chainCodeName) => {
    execScript('checkChainCodeCommitReadiness', [channelName, name, subdomain, domain, peerNo, port, chainCodeName].join(' '));
}

const approveChainCode = (channelName, name, subdomain, domain, peerNo, port, chainCodeName, packageId) => {
    execScript('approveChainCode', [channelName, name, subdomain, domain, peerNo, port, chainCodeName, packageId].join(' '));
}

const commitChainCode = (channelName, name, subdomain, domain, peerNo, port, chainCodeName, initFn) => {
    execScript('commitChainCode', [channelName, name, subdomain, domain, peerNo, port, chainCodeName, initFn].join(' '));
}

const queryCommitted = (channelName, name, subdomain, domain, peerNo, port, chainCodeName) => {
    execScript('queryCommitted', [channelName, name, subdomain, domain, peerNo, port, chainCodeName].join(' '));
}

const networkUp = () => {
    execScript('networkUp');
}

const networkDown = () => {
    execScript('networkDown');
}

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/node_modules/xterm/css/xterm.css', async (req, res) => {
    res.sendFile(__dirname + '/node_modules/xterm/css/xterm.css');
})

app.get('/node_modules/xterm/lib/xterm.js', async (req, res) => {
    res.sendFile(__dirname + '/node_modules/xterm/lib/xterm.js');
})

const args = {
    setenv: [],
    cleanup: [],
    checkPrereqs: [],
    cleanupOrgs: [],
    createPeerOrg_Admin: ['Administration', 'administration', 'scheisse.edu', 7051, 7054],
    createPeerOrg_Students: ['Students', 'students', 'scheisse.edu', 9051, 8054],
    createOrdererOrg: ['scheisse.edu'],
    createConsortium: ['TwoOrgsOrdererGenesis'],
    networkUp: [],
    createChannel: ['documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, "TwoOrgsChannel"],
    joinChannel_Admin: ['documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051],
    joinChannel_Students: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051],
    setAnchorPeer_Admin: ['documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051],
    setAnchorPeer_Students: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051],
    deployChainCode_Admin: ['documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, 'records', '../chaincode/records'],
    deployChainCode_Students: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records', '../chaincode/records'],
    checkChainCodeCommitReadiness: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records'],
    approveChainCode_Admin: ['documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, 'records', 'records_1.0:4dcd3828f89524ae793b9f50e9dc3bb3dfa7bc118d0f8585dcd0d486b5db6f98'],
    approveChainCode_Students: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records', 'records_1.0:4dcd3828f89524ae793b9f50e9dc3bb3dfa7bc118d0f8585dcd0d486b5db6f98'],
    commitChainCode: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records'],
    queryCommitted: ['documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records'],
    networkDown: []
}

app.get('/scripts/:script', (req, res) => {
    var script = req.params.script;
    console.log(script.split('_')[0]);
    let result = execScript(script.split('_')[0], args[script]?.join(' ') ?? '');
    res.send(result);
})

app.listen(3000, () => {
	console.log(`App running on port: 3000`);
});
