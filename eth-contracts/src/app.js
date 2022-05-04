App = {
    contracts: {},
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    correctProof: 
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
    },

    init: async function () {
        await App.initWeb3();
    },
    initWeb3: async function () {
        console.log(window.ethereum);
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            App.metamaskAccountID = accounts[0];

            console.log(App.metamaskAccountID);

            window.web3 = new Web3(window.ethereum);
        }
    },
    loadContract: async function() {
        var contractFile = $('#contractFile').prop('files')[0];
        var contractAddress = $('#contractAddress').val();

        let reader = new FileReader();

        reader.readAsText(contractFile);
      
        reader.onload = function() {
            var contractFileJson = JSON.parse(reader.result);
            App.contracts.SolnSquareVerifier = 
                new web3.eth.Contract(contractFileJson.abi, contractAddress);
            console.log(App.contracts.SolnSquareVerifier);
        };
    },
    getOwner: async function() {
        var result = await App.contracts.SolnSquareVerifier.methods.getOwner().call({from: App.metamaskAccountID});
        $('#owner').html(result);
    },
    addSolution: async function() {
        const solutionId = $('#solutionId').val();

        App.log("Add solution "+ solutionId);

        await App.contracts.SolnSquareVerifier.methods.addSolution(solutionId)
            .send({ from: App.metamaskAccountID });

        await App.logSolution(solutionId);
    },
    verifySolution: async function() {
        const solutionId = $('#solutionId').val();

        App.log("Verify solution "+ solutionId);

        await App.contracts.SolnSquareVerifier.methods.verifySolution(
            solutionId,
            App.correctProof.proof.a,
            App.correctProof.proof.b,
            App.correctProof.proof.c,
            App.correctProof.inputs)
            .send({from: App.metamaskAccountID});

        await App.logSolution(solutionId);
    },
    mintToken: async function() {
        const solutionId = $('#solutionId').val();
        const tokenId = $('#tokenId').val();

        App.log("Mint token "+ tokenId);

        await App.contracts.SolnSquareVerifier.methods.mintNFT(solutionId, tokenId)
            .send({ from: App.metamaskAccountID });
        
        await App.logSolution(solutionId);
    },
    solutionStatus: async function() {
        const solutionId = $('#solutionId').val();
        await App.logSolution(solutionId);
    },
    log: function(text) {
        $('#debug').append(text + "\n");
    },
    logSolution: async function(solutionId) {
        var solutionState = await App.contracts.SolnSquareVerifier.methods
            .getSolutionState(solutionId, App.metamaskAccountID)
            .call({from: App.metamaskAccountID });
            console.log(solutionState);
        App.log(`Solution ${solutionId} with state ${solutionState}`);
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});