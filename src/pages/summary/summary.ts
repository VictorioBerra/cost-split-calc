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


@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  personATotal: number;
  personBTotal: number;
  total: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialShareing: SocialSharing) {
    this.personATotal = this.navParams.get('personATotal');
    this.personBTotal = this.navParams.get('personBTotal');
    this.total = this.navParams.get('total');
  }

  private getSubject = function (): string {
    return `Person A owes: ${this.personATotal}$ and person B owes: ${this.personBTotal}$ for a total of: ${this.total}$`;
  }

  shareClick = function () {
    var shareSubject: string = 'Cost Split Calculator';

    this.socialShareing.share(this.getSubject(), shareSubject);
  }

  shareVenmoClick = function () {
    this.socialShareing.shareVia('venmo', this.personATotal, this.getSubject());
  }

  sharePaypalClick = function () {
    this.socialShareing.shareVia('paypal', this.personATotal, this.getSubject());
  }
  
  shareGoogleClick = function () {
    this.socialShareing.shareVia('com.google.android.gms.wallet', this.personATotal, this.getSubject());
  }

  shareAmazonClick = function () {
    this.socialShareing.shareVia('amazon', this.personATotal, this.getSubject());
  }

}
