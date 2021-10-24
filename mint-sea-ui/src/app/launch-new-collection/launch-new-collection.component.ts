import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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
    console.log(this.formModel);
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

}
