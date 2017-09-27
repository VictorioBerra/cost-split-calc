import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  SocialSharing
} from '@ionic-native/social-sharing'
import {
  Reciept 
 } from '../../models/reciepts.model';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  reciept: Reciept;

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialShareing: SocialSharing) {
    this.reciept = this.navParams.get('reciept');
  }

  shareClick = function () {
    var shareSubject: string = 'Cost Split Calculator';
    this.socialShareing.share(getSubject(this.reciept), shareSubject);
  }

  // shareVenmoClick = function () {
  //   this.socialShareing.shareVia('venmo', this.personATotal, this.getSubject());
  // }

  // sharePaypalClick = function () {
  //   this.socialShareing.shareVia('paypal', this.personATotal, this.getSubject());
  // }
  
  // shareGoogleClick = function () {
  //   this.socialShareing.shareVia('com.google.android.gms.wallet', this.personATotal, this.getSubject());
  // }

  // shareAmazonClick = function () {
  //   this.socialShareing.shareVia('amazon', this.personATotal, this.getSubject());
  // }

}

function getSubject(reciept: Reciept): string {
  let result: string = `The total cost was $${reciept.total}. `;
  let resultItems: string[] = [];
  reciept.recieptItems.forEach(recieptItem => {
    resultItems.push(`${recieptItem.name} owes $${recieptItem.totalOwedWithTax}`);
  });
  result += resultItems.join(', ') + '.';
  return result;
}
