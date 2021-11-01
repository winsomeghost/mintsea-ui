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
  isMetaMaskEnabled: Boolean = false;
  readonly ethereum: any;


  progressSteps: any[] = [{
    title: "Roadmap-1",
    name: "",
    placeholder: "Title for step-1 *",
    description: "",
    weight: 10
  }];

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
        listedWallets: "",
        maxItemsPerWallet: 10,
        startDateTime: this.currentTime,
        endDateTime: this.currentTime
      },
      raffle: {
        selected: false,
        raffleStartDateTime: this.currentTime,
        raffleEndDateTime: this.currentTime
      },
      public: {
        selected: true
      }
    },
    twitterUrl: "https://twitter.com/",
    discordUrl: "https://discord.com/",
    team: "",
    progressSteps: this.progressSteps
  }

  widthValue: string = (this.formModel.progressSteps[0].weight * 10).toString();

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
      this.formModel.type.raffle.selected = selction === "raffle";
      this.showRaffelTime = this.formModel.type.raffle.selected;
      this.formModel.type.public.selected = !this.formModel.type.raffle.selected;
    } else if (selction.value === "ps") {
      this.showForPublicPreSale = selction.checked;
      this.formModel.type.pre_sale.selected = selction.checked;
    }
  }

  onContractUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFileContent(file, "csvContract")
    }
  }

  readFileContent(file: File, attributeToUpdate: any) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (event: any) => {
      if (attributeToUpdate === "csvContract") {
        this.formModel.type.csvContract = event.target.result;
      } else {
        this.formModel.type.pre_sale.listedWallets = event.target.result;
      }
    }
  }

  onWalletDetailsUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFileContent(file, "listedWallets")
    }
  }

  onSubmit() {
    // show error message in UI
    this.validateForm = "was-validated";
    console.log(this.formModel);
    //this.connectEtheriumWallet();
  }

  addNewStep(oEvent: any) {
    const newStepPlace = this.progressSteps.length + 1;
    let newStep = {
      title: "Roadmap-" + newStepPlace,
      name: "",
      placeholder: "Title for step-" + newStepPlace + " *",
      description: "",
      weight: 4
    }
    this.progressSteps.push(newStep)
    let totalWeight = 0;
    this.progressSteps.forEach((step: any) => { totalWeight = totalWeight + step.weight; });
    this.widthValue = (totalWeight * 10).toString();
  }

  stepWeightChange(oEvent: any) {
    let totalWeight = 0;
    this.progressSteps.forEach((step: any) => { totalWeight = totalWeight + step.weight; });
    this.widthValue = (totalWeight * 10).toString();
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
