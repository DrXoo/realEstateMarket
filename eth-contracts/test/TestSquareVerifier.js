var squareVerifier = artifacts.require('verifier');

contract('TestVerifier', accounts => {

    const account_one = accounts[0];

    const correctProof = 
    {
        proof: {
            a: ["0x0d8291efd78e95fa6243ca94be4616983d00cea25c234189fed0e3c662e13536", "0x20916ad9a4f6d1c159f6353d78d4219dba69f0eb020d8031f29120f969f031ed"],
            b: [
                    [
                        "0x24694e9cfc1d780f4624e6938f37270e624e736d7f041a4b4af4027d5a261860", 
                        "0x2a52ed104a0b23905fd508b711bb717ce308016dccb22c4884bbe6ae5145cda2"
                    ], 
                    [
                        "0x1ec506cc477b90cfb87460c796533e8fc7cfc6240897f77b42e98e58b3ad9965", 
                        "0x1eba29e2f22570b5dd213c3e8d115f68d47f399059e9d810f8181b6f83c7921d"
                    ]
                ],
            c: ["0x17245738bf1c083497a634d92d4514185c0435ce1e6a4de12be121b9c9cd1bb0", "0x23457ba78949c5279512f4d387b3fb39f10a234c537c33d1b7daadc5584eeafa"]
        },
        inputs: ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }

    describe('Test verification with correct proof', function () {
        beforeEach(async function () { 
            this.contract = await squareVerifier.new({from: account_one});
        })

        it('Should pass verification with correct proof', async function () { 
            var result = await this.contract.verifyTx.call(
                correctProof.proof.a,
                correctProof.proof.b,
                correctProof.proof.c,
                correctProof.inputs);

            assert.equal(result, true);
        })
    });

    describe('Test verification with incorrect proof', function () {
        beforeEach(async function () { 
            this.contract = await squareVerifier.new({from: account_one});
        })

        it('Should not pass verification with incorrect proof', async function () { 

            var result = await this.contract.verifyTx.call(
                correctProof.proof.a,
                correctProof.proof.b,
                correctProof.proof.c,
                ["0x0000000000000000000000000000000000000000000000000000000000000609", "0x0000000000000000000000000000000000000000020000000000000000000001"]);

            assert.equal(result, false);
        })
    });
})