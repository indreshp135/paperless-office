const { Contract } = require('fabric-contract-api')

class fileContract extends Contract {

    async queryFile(ctx, fileId) {
        let detailsAsBytes = await ctx.stub.getState(fileId);
        if (!detailsAsBytes || detailsAsBytes.toString().length <= 0) {
            throw new Error('File with this Id does not exist: ');
        }
        let details = JSON.parse(detailsAsBytes.toString());
        return JSON.stringify(details);
    }

    async addFile(ctx, fileId, owner, hash, type) {
        let details = {
            owner,
            hash,
            with: 'Admin',
            type:type,
            verified:false
        };
        await ctx.stub.putState(fileId, Buffer.from(JSON.stringify(details)));
        console.log('File added To the ledger Succesfully..');
    }

    async changeFile(ctx, fileId, hash) {
        let detailsAsBytes = await ctx.stub.getState(fileId);
        if (!detailsAsBytes || detailsAsBytes.toString().length <= 0) {
            throw new Error('File with this Id does not exist: ');
        }
        let fileDetails = JSON.parse(detailsAsBytes.toString());
        let details = {
            ...fileDetails,
            hash: hash,
            verified:true
        };
        await ctx.stub.putState(fileId, Buffer.from(JSON.stringify(details)));
        console.log('File returned Succesfully..');
    }

    async returnFile(ctx, fileId) {
        let detailsAsBytes = await ctx.stub.getState(fileId);
        if (!detailsAsBytes || detailsAsBytes.toString().length <= 0) {
            throw new Error('File with this Id does not exist: ');
        }
        let fileDetails = JSON.parse(detailsAsBytes.toString());
        let details = {
            ...fileDetails,
            with: fileDetails.owner
        };
        await ctx.stub.putState(fileId, Buffer.from(JSON.stringify(details)));
        console.log('File returned Succesfully..');
    }

    async queryAllWithAdminVerified(ctx) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.with = 'Admin';
        queryString.selector.verified = true;

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.log(allResults)
                return allResults;
            }
        }
    }

    async queryAllWithAdminNotVerified(ctx) {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.with = 'Admin';
        queryString.selector.verified = false;

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.log(allResults)
                return allResults;
            }
        }
    }

    async queryAllWithUserVerified(ctx,user='student') {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.with = user;
        queryString.selector.verified = true;

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.log(allResults)
                return allResults;
            }
        }
    }
    
    async queryAllWithUserNotVerified(ctx,user='student') {
        let queryString = {};
        queryString.selector = {};
        queryString.selector.with = user;
        queryString.selector.verified = false;

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                jsonRes.Key = res.value.key;
                try {
                    jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.log(allResults)
                return allResults;
            }
        }
    }
}

module.exports = fileContract