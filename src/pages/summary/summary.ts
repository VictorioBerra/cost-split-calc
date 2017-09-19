import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  personATotal: number;
  personBTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.personATotal = this.navParams.get('personATotal');
    this.personATotal = this.navParams.get('personBTotal');
  }

}
