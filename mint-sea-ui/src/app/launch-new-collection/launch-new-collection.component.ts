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

}
