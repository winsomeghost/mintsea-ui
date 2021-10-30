import { Component, OnInit } from '@angular/core';
import { ethers } from "ethers";

@Component({
  selector: 'mint-sea-launch-new-collection',
  templateUrl: './launch-new-collection.component.html',
  styleUrls: ['./launch-new-collection.component.css']
})
export class LaunchNewCollectionComponent implements OnInit {
  readonly currentTime = new Date().toJSON().split(".")[0];
  showRaffelTime: boolean = false;
  showForPublicPreSale: boolean = false;
  placeHolderImg: string = "assets/img/placeholder.png";
  validateForm: string = "";
  showStep1: string = "show"; showStep2: string = "hide"; showStep3: string = "hide"; showStep4: string = "hide"; showStep5: string = "hide";
  classType2: any; classType3: any; classType4: any; classType5: any;
  widthValue: string = "20";
  isMetaMaskEnabled: Boolean = false;
  readonly ethereum: any;

  formModel: any = {
    collectionName: "",
    collectionImageUrl: "",
    description: "",
    noOfItemsInCollection: "",
    type: {
      noOfItemsInCollection: "",
      csvContract: "",
      reserve: {
        selected: true
      },
      pre_sale: {
        selected: false,
        listedWallets: [],
        maxItemsPerWallet: 10,
        startDateTime: this.currentTime,
        endDateTime: this.currentTime
      },
      raffle: {
        selected: false,
        raffleDateTime: this.currentTime
      },
      public: {
        selected: true
      }
    },
    twitterUrl: "https://twitter.com/",
    discordUrl: "https://discord.com/",
    team: "",
    progressSteps: {}
  }

  constructor() {
    const { ethereum }: any = window;
    this.ethereum = ethereum;
  }

  ngOnInit(): void {
    this.isMetaMaskEnabled = this.isMetaMaskInstalled();
    this.ethereum.on('accountsChanged', this.updateCurrentAccount.bind(this));
    this.ethereum.on('disconnect', () => this.CURRENT_ETH_ADDRESS = "");
    this.ethereum.on('chainChanged', (chainId: any) => {
      window.location.reload();
    });
  }

  selectionChange(selction: any): void {
    if (typeof selction === "string") {
      this.showRaffelTime = selction === "raffle";
    } else if (selction.value === "ps") {
      this.showForPublicPreSale = selction.checked;
    }
  }

  onSubmit() {
    // show error message in UI
    this.validateForm = "was-validated";
    this.connectEtheriumWallet();
  }

  selectTab(oEvent: any) {
    switch (oEvent.textContent) {
      case "Step 1":
        this.showStep1 = "show";
        this.widthValue = "20";
        this.showStep2 = this.showStep3 = this.showStep4 = this.showStep5 = "hide";
        break;
      case "Step 2":
        this.showStep2 = "show";
        this.classType2 = "active";
        this.widthValue = "40";
        this.showStep1 = this.showStep3 = this.showStep4 = this.showStep5 = "hide";
        break;
      case "Step 3":
        this.showStep3 = "show";
        this.classType3 = "active";
        this.widthValue = "60";
        this.showStep2 = this.showStep1 = this.showStep4 = this.showStep5 = "hide";
        break;
      case "Step 4":
        this.showStep4 = "show";
        this.classType4 = "active";
        this.widthValue = "80";
        this.showStep2 = this.showStep3 = this.showStep1 = this.showStep5 = "hide";
        break;
      case "Step 5":
        this.showStep5 = "show";
        this.classType5 = "active";
        this.widthValue = "100";
        this.showStep2 = this.showStep3 = this.showStep4 = this.showStep1 = "hide";
        break;
      default:
        break;
    }
  }



  connectEtheriumWallet() {
    if (this.isMetaMaskEnabled && !this.ethereum.isConnected()) {
      this.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      }).then((permissions: any[]) => {
        if (permissions.find((permission) => permission.parentCapability === 'eth_accounts')) {
          console.log('eth_accounts permission successfully requested!');
          this.requestAccountList();
        } else {
          alert("Please grant permission for at least one account.")
        }
      }).catch((ex: any) => {
        console.log('Permissions needed to continue.', ex.message);
        alert("Permissions needed to continue.")
      });
    } else {
      this.requestAccountList();
    }
  }

  CURRENT_ETH_ADDRESS: string = "";
  requestAccountList() {
    this.ethereum.request({ method: 'eth_accounts' }).then(this.updateCurrentAccount.bind(this));
  }

  updateCurrentAccount(accounts: any) {
    console.log("connected account: ", accounts);
    this.CURRENT_ETH_ADDRESS = accounts[0];
    this.getBalance(accounts[0]);
    this.getGasPrice();
    this.sendMoney(accounts[0]);
  }

  isMetaMaskInstalled(): Boolean {
    return Boolean(this.ethereum && this.ethereum.isMetaMask);
  };

  sendMoney(fromAddress: any) {
    let params: any = [
      {
        from: fromAddress,
        to: '0x18C25C87bD4A6cBdB49Ae8CF3CfAC61ffE364b14',
        value: '0x29a2241af62c0000',
        gasPrice: '0x09184e72a000',
        gas: '0x2710',
      },
    ];

    this.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result: any) => {
        console.log(result);
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error: any) => {
        console.log(error)
        // If the request fails, the Promise will reject with an error.
      });
  }

  getBalance(address: string) {
    this.ethereum
      .request({
        "method": "eth_getBalance",
        "params": [
          address
        ]
      }).then((balanceResponse: any) => {
        console.log("banace response", balanceResponse);
        console.log("Balance in ether", this.convertToEtherValue(balanceResponse));
      }).catch((error: any) => { console.log("error", error) });

  }

  getGasPrice() {
    this.ethereum
      .request({
        "method": "eth_gasPrice",
        "params": []
      }).then((gasPrice: any) => {
        console.log("banace response", gasPrice);
        console.log("Gas cost..", this.convertToEtherValue(gasPrice));
      }).catch((error: any) => { console.log("error", error) });
  }

  convertToEtherValue(hexadecimalPrice: string) {
    return ethers.utils.formatEther(hexadecimalPrice);
  }
}
