var Docker = require('dockerode');
const { execSync } = require('child_process');

var docker = new Docker()

const execScript = (script, args = "") => {
    try {
        let result = execSync(`scripts/${script}.sh ${args}`, {
            shell: '/bin/sh'
        });
        console.log(result.toString());
    } catch (e) {
        console.log(e.stdout.toString());
        console.log(e.stderr.toString());
        console.log(e.toString());
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

setEnv();
// cleanup();
// checkPrereqs();
// cleanupOrgs();
// createPeerOrg('Administration', 'administration', 'scheisse.edu', 7051, 7054);
// createPeerOrg('Students', 'students', 'scheisse.edu', 9051, 8054);
// createOrdererOrg('scheisse.edu');
// createConsortium('TwoOrgsOrdererGenesis');
// networkUp();
// createChannel('documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, "TwoOrgsChannel");
// joinChannel('documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051);
// joinChannel('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051);
// setAnchorPeer('documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051);
// setAnchorPeer('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051);
// deployChainCode('documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, 'records', '../chaincode/records')
// deployChainCode('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records', '../chaincode/records')
// checkChainCodeCommitReadiness('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records')
// approveChainCode('documentchannel', 'Administration', 'administration', 'scheisse.edu', 0, 7051, 'records', 'records_1.0:bae2d7a41eb9a86e6265e1fb07dcc095978b12b9f4b1f1f392810ce2995b664b');
// approveChainCode('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records', 'records_1.0:bae2d7a41eb9a86e6265e1fb07dcc095978b12b9f4b1f1f392810ce2995b664b');
// commitChainCode('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records');
// queryCommitted('documentchannel', 'Students', 'students', 'scheisse.edu', 0, 9051, 'records');
// networkDown();
// cleanupOrgs();
// cleanup();

// networkUp();