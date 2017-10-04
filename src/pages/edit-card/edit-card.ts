import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

import {
  ExpenseCard
} from '../../models/expensecard.model';

/**
 * Generated class for the EditCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {

  card: ExpenseCard;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.card = this.navParams.get('card');
  }

  addExpense = function (card) {
    card.expenses.push({
      value: null
    });
  }

  removeExpense = function (card, expenses) {
    expenses.splice(expenses.indexOf(card), 1);
  }

  save = function(){
    this.navCtrl.pop();
  }

}
