import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CostSplitCalculatorProvider } from '../../providers/cost-split-calculator/cost-split-calculator';

import { ExpenseCard, Expense } from '../../models/expensecard.model';

import { SummaryPage } from '../summary/summary';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  taxRate: number = 7.5;

  expenseCards: ExpenseCard[];

  totalWithTax = 107.5;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public calcService: CostSplitCalculatorProvider) {
    this.expenseCards = [
      {
        name: 'Person 1',
        expenses: [
          {
            value: 8
          }
        ]
      }
      // DEBUG
      ,{
        name: 'Person 1',
        expenses: [
          {
            value: 8
          },
          {
            value: 43.5
          },
          {
            value: 0.5
          }
        ]
      },
      {
        name: 'Person 1',
        expenses: [
          {
            value: 1
          }
        ]
      }
      // DEBUG
    ];
  }

  addNewCard = function() {
    let nextId = this.expenseCards.length + 1;
    this.expenseCards.push({
      name: `Person ${nextId}`,
      expenses: [
        {
          value: 0
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

    // normalize
    var totalWithTax: number = + parseFloat(this.totalWithTax).toFixed(2);
    var taxRate: number = + parseFloat(this.taxRate).toFixed(2);

    var reciept = this.calcService.Calculate(totalWithTax, taxRate, this.expenseCards)

    //this.navCtrl.push(SummaryPage, reciept);
  }

}
