import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CostSplitCalculatorProvider } from '../../providers/cost-split-calculator/cost-split-calculator';

import { SummaryPage } from '../summary/summary';

// TODO, where to put these?
interface ExpenseCard {
  name: string;
  expenses: Expense[];
}

interface Expense {
  value: number
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  taxRate: number = 7.5;

  expenseCards: ExpenseCard[];

  //debug
  additA = 40;
  totalWithTax = 107.5;

  //ignoreTax: boolean = false;
  
  constructor(public navCtrl: NavController, public calcService: CostSplitCalculatorProvider) {
    this.expenseCards = [
      {
        name: 'Person 1',
        expenses: [
          {
            value: 40
          }
        ]
      }
    ];
  }

  addNewCard = function() {
    let nextId = this.expenseCards.length + 1;
    this.expenseCards.push({
      name: `Person ${nextId}`,
      expenses: [
        {
          value: 40
        }
      ]
    });
  }

  addExpense = function(card) {
    card.expenses.push({
      value: null
    });
  }

  removeExpense = function(card, expenses) {

    // TODO, ask to remove card?
    // if(expenses.length == 1) {
    //   this.expenseCards.splice(this.expenseCards.indexOf(card), 1);
    // }

    expenses.splice(expenses.indexOf(card), 1);
  }

  calculate = function() {

    var totalWithTax: number = + parseFloat(this.totalWithTax).toFixed(2);
    var taxRate: number = + parseFloat(this.taxRate).toFixed(2);
    var additA: number = parseInt(this.additA, 10) || 0;
    var additB: number = parseInt(this.additB, 10) || 0;

    this.navCtrl.push(SummaryPage, this.calcService.Calculate(totalWithTax, taxRate, additA, additB));
  }

}
