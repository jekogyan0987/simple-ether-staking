const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  "function stake() public payable",
  "function withdraw() public",
  "function getBalance() public view returns (uint256)"
];

let provider, signer, contract;

document.getElementById('connectBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        
        document.getElementById('connectBtn').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        updateBalance();
    } else {
        alert("Please install MetaMask!");
    }
});

document.getElementById('stakeBtn').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const tx = await contract.stake({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    updateBalance();
});

document.getElementById('withdrawBtn').addEventListener('click', async () => {
    const tx = await contract.withdraw();
    await tx.wait();
    updateBalance();
});

async function updateBalance() {
    const balance = await contract.getBalance();
    document.getElementById('balance').innerText = ethers.utils.formatEther(balance);
}
