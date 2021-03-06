var RealEstateMarket = artifacts.require('RealEstateMarket');

contract('TestRealEstateMarket', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        before(async function () { 
            this.contract = await RealEstateMarket.new({from: account_one});
            
            await this.contract.mint(account_two, 1, { from: account_one });
            await this.contract.mint(account_two, 2, { from: account_one });
            await this.contract.mint(account_three, 3, { from: account_one });
        })

        it('should return total supply', async function () { 
            var totalSupply = await this.contract.totalSupply.call();

            assert.equal(totalSupply, 3);
        })

        it('should get token balance', async function () { 
            var balance = await this.contract.balanceOf.call(account_two);

            assert.equal(balance, 2);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var tokenURI = await this.contract.tokenURI.call(1);

            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1")
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_three, 1, { from: account_two });

            var tokenOwner = await this.contract.ownerOf.call(1);

            assert.equal(tokenOwner, account_three);
        })
    });

    describe('have ownership properties', function () {
        before(async function () { 
            this.contract = await RealEstateMarket.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            var reverted = false;
            try {
                await this.contract.mint(account_two, 1, { from: account_two });
            } catch (error) {
                reverted = true;
            }
            
            assert.equal(reverted, true); 
        })

        it('should return contract owner', async function () { 
            var owner = await this.contract.getOwner.call();

            assert.equal(owner, account_one);
        })

    });
})