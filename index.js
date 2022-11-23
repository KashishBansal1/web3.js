// Create global userWalletAddress variable
window.userWalletAddress = null;

// when the browser is ready
window.onload = async (event) => {
  // check if ethereum extension is installed
  if (window.ethereum) {
    // create web3 instance
    window.web3 = new Web3(window.ethereum);
  } else {
    // prompt user to install Metamask
    alert("Please install MetaMask or any Ethereum Extension Wallet");
  }

  // check if user is already logged in and update the global userWalletAddress variable
  window.userWalletAddress = window.localStorage.getItem("userWalletAddress");
  showUserDashboard();
};

// Web3 login function
const loginWithEth = async () => {
  // check if there is global window.web3 instance
  if (window.web3) {
    try {
      // get the user's ethereum account - prompts metamask to login
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          // if the user cancels the login prompt
          throw Error("Please select an account");
        });

      // set the global userWalletAddress variable to selected account
      window.userWalletAddress = selectedAccount;

      // store the user's wallet address in local storage
      window.localStorage.setItem("userWalletAddress", selectedAccount);
      showUserDashboard();
    } catch (error) {
      alert(error);
    }
  } else {
    alert("wallet not found");
  }
};

// function to show the user dashboard
const showUserDashboard = async () => {
  // if the user is not logged in - userWalletAddress is null
  if (!window.userWalletAddress) {
    document.title = "Web3 Login";
    document.querySelector(".login-section").style.display = "flex";
    document.querySelector(".dashboard-section").style.display = "none";
    return false;
  }

  document.title = "Web3 Dashboard  🤝";
  document.querySelector(".login-section").style.display = "none";
  document.querySelector(".dashboard-section").style.display = "flex";
  showUserWalletAddress();
  getWalletBalance();
};

const showUserWalletAddress = () => {
  const walletAddressEl = document.querySelector(".wallet-address");
  walletAddressEl.innerHTML = window.userWalletAddress;
};

// get the user's wallet balance
const getWalletBalance = async () => {
  // check if there is global userWalletAddress variable
  if (!window.userWalletAddress) {
    return false;
  }

  // get the user's wallet balance
  const balance = await window.web3.eth.getBalance(window.userWalletAddress);

  // convert the balance to ether
  document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
    balance,
    "ether"
  );
};

// web3 logout function
const logout = () => {
  window.userWalletAddress = null;
  window.localStorage.removeItem("userWalletAddress");
  showUserDashboard();
};

document.querySelector(".login-btn").addEventListener("click", loginWithEth);

document.querySelector(".logout-btn").addEventListener("click", logout);
