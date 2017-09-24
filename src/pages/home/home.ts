import {
  Component
} from '@angular/core';
import {
  NavController,
  AlertController 
} from 'ionic-angular';
import {
  CostSplitCalculatorProvider
} from '../../providers/cost-split-calculator/cost-split-calculator';

import {
  ExpenseCard
} from '../../models/expensecard.model';

import {
  SummaryPage
} from '../summary/summary';

import {
  Reciept
} from '../../models/reciepts.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  taxRate: number = 7.5;

  expenseCards: ExpenseCard[];

  totalWithTax = 107.5;

  constructor(public navCtrl: NavController, public calcService: CostSplitCalculatorProvider, public alertCtrl: AlertController) {
    this.expenseCards = [{
      name: 'Person 1',
      expenses: [{
        value: 8
      }]
    },
  
    {
      name: 'Person 2',
      expenses: []
    }
  
  ];
  };

  addNewCard = function () {
    let nextId = this.expenseCards.length + 1;
    this.expenseCards.push({
      name: `Person ${nextId}`,
      expenses: []
    });
  }

  addExpense = function (card) {
    card.expenses.push({
      value: null
    });
  }

  removeCard = function(card) {
    this.expenseCards.splice(this.expenseCards.indexOf(card), 1);
  }

  removeExpense = function (card, expenses) {
    expenses.splice(expenses.indexOf(card), 1);
  }

  calculate = function () {

    // normalize
    var totalWithTax: number = Number(this.totalWithTax);
    var taxRate: number = Number(this.taxRate);

    let reciept: Reciept;

    try {

      reciept = this.calcService.Calculate(totalWithTax, taxRate, this.expenseCards);

      this.navCtrl.push(SummaryPage, {
        reciept
      });

    }
    catch (exception) {
      this.alertCtrl.create({
        title: 'Ooops!',
        subTitle: exception,
        buttons: ['OK']
      }).present();
    }

  }

}
