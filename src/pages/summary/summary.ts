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
    console.log(this.reciept);
  }

  // private getSubject = function (): string {
  //   return `Person A owes: ${this.personATotal}$ and person B owes: ${this.personBTotal}$ for a total of: ${this.total}$`;
  // }

  // shareClick = function () {
  //   var shareSubject: string = 'Cost Split Calculator';

  //   this.socialShareing.share(this.getSubject(), shareSubject);
  // }

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
