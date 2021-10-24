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
      reserve: {
        selected: true
      },
      pre_sale: {
        selected: false,
        attributes: {
          listedWallets: [],
          maxItemsPerWallet: 10,
          startDateTime: "",
          endDateTime: ""
        }
      },
      raffle: {
        selected: false,
        raffleDateTime: ""
      },
      public: {
        selected: true
      }
    },
    twitterUrl: "",
    discordUrl: "",
    team: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(oEvent: any): void {
    if (typeof oEvent === "string") {
      this.showRaffelTime = oEvent === "raffle";
    } else {
      this.showForPublicPreSale = oEvent.value === "ps" && oEvent.checked;
    }
  }

  onSubmit() {
    this.validateForm = "was-validated";
    console.log();
  }

}
