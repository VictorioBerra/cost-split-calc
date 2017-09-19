import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CostSplitCalculatorProvider } from '../../providers/cost-split-calculator/cost-split-calculator';

import { SummaryPage } from '../summary/summary';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  taxRate: number = 7.5;

  //debug
  additA = 40;
  totalWithTax = 107.5;

  //ignoreTax: boolean = false;
  
  constructor(public navCtrl: NavController, public calcService: CostSplitCalculatorProvider) {}

  calculate = function() {

    var totalWithTax: number = + parseFloat(this.totalWithTax).toFixed(2);
    var taxRate: number = + parseFloat(this.taxRate).toFixed(2);
    var additA: number = parseInt(this.additA, 10) || 0;
    var additB: number = parseInt(this.additB, 10) || 0;

    this.navCtrl.push(SummaryPage, this.calcService.Calculate(totalWithTax, taxRate, additA, additB));
  }

}
