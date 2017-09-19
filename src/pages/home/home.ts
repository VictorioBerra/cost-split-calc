import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SummaryPage } from '../summary/summary';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  taxRate: number = 7.5;
  //ignoreTax: boolean = false;
  
  constructor(public navCtrl: NavController) {}

  calculate = function() {

    var totalWithTax =  parseInt(this.totalWithTax, 10);
    var taxRate = parseInt(this.taxRate, 10);
    var additA = parseInt(this.additA, 10) || 0;
    var additB = parseInt(this.additB, 10) || 0;

    var totalWithoutTax = totalWithTax / (1 + (taxRate / 100));
    var totalTaxCollected = totalWithTax - totalWithoutTax;

    var totalLessAdditional = totalWithoutTax - additA - additB;

    var splitDifference = totalLessAdditional / 2;

    // TODO divide tax

    var totalPersonA = additA + splitDifference;
    var totalPersonB = additB + splitDifference;
    
    console.log(additA, splitDifference, totalPersonA);

    this.navCtrl.push(SummaryPage, {
      personATotal: totalPersonA,
      personBTotal: totalPersonB
    });
  }

}
