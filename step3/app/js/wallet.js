
async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts){ return}

    // Load in Localstore key
    window.userAddress = window.localStorage.getItem("userAddress");
    showAddress();
    
    window.userWalletAddress = accounts[0];
      
    document.getElementById("userAddress").value=window.userWalletAddress;
    console.log("Checking the sender address in loginWithMetaMask()",window.userWalletAddress);
    loginButton.innerText = `Sign out of MetaMask`;
    //document.getElementById("loginButton").classList.add("hidden");
    //document.getElementById("signOutButton").classList.remove("hidden");
    
    loginButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
      signOutButton.addEventListener('click', signOutOfMetaMask)

      //location.reload(true);
    }, 200)

}

function showAddress() {
    if (!window.userAddress) {
      document.getElementById("userAddress").innerText = "";
      //document.getElementById("logoutButton").classList.add("hidden");
      return false;
    }

    document.getElementById(
      "userAddress"
    ).innerText = `ETH Address: ${window.userAddress}`;
    //document.getElementById("logoutButton").classList.remove("hidden");
  }