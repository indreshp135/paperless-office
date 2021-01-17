# Paperless Office
Paperless office is a project aimed to simplify the process of keeping track of approving documents.

### Problem
Most of the documents used by government and corporate organisations are issued on paper. These documents lead to huge amounts of deforestation and environmental pollution due to the chemicals used in paper production. Also paper documents can easily be spoofed. Verification of these documents is also a long process.  

Corporations also store huge amount of data stored in their server. Storing and retriving huge amount of data from the server increases server load and costs. More energy is wasted and optimising this can greatly save energy. Power saved is power produced. Most of the power is poduced from coal which has huge carbon footprint.


### Solution
One solution to this problem is using blockchain. We have digitalized the process of issuing and retriving certificates.  
Blockchain technology can hugely fasten the process of verification. But for an enterprise organisation a public blockchain is a bad idea since all the trade data will be available to the public. 


We have used a enterprise-grade permissioned distributed ledger technology, [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/latest/) which unlike Euthereum is private. Hyperledger is:
- permissioned
- tamper proof
- easily verfiable
- privacy and confidentiality of transactions
- low latency of transaction confirmation
- high transaction throughput performance

This helps to reduce paper wastage and related pollution. 

We have also used [Inter Planetary File System](https://ipfs.io) to store our data. This is a next-gen peer-to-peer hypermedia protocol. This helps to grately reduce server load by sharing the files between users who want the file and people who have the cache of the file. This can reduce electricity consumption and save a lot of power.

## Technologies Used
 - Hyperledger Fabric
 - Inter Planetary File System
 - Blockchain
 - CouchDB
 - endesive
 - NodeJS
 - Express
 - React

## Project Demo

This is used for approving and issuing documents by admin from student.  

![image](https://i.imgur.com/r59TlSU.png)

This portal is used by maintainer to create and work with channels.
![image](https://i.imgur.com/fJwmCsw.png)

This is the databse of all the transactions (CouchDB Admin Panel). 


![image](https://i.imgur.com/xxeqWo5.png)


This is transactions as seen from hyperledger interface. 
![image](https://i.imgur.com/NdkeoMx.png)

This is sample document that has been digitally verified. 

![image](https://i.imgur.com/IqhtqUq.png)
