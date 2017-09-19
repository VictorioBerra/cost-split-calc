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

    var totalWithoutTax = this.totalWithTax / (1 + (this.taxRate / 100));
    var totalTaxCollected = this.totalWithTax - totalWithoutTax;

    var totalLessAdditional = totalWithoutTax - (this.additA || 0) - (this.additB || 0);

    var splitDifference = totalWithoutTax / 2;

    // TODO divide tax

    var totalPersonA = (this.additA || 0) + splitDifference;
    var totalPersonB = (this.additB || 0) + splitDifference;
    
    this.navCtrl.push(SummaryPage, {
      personATotal: totalPersonA,
      personBTotal: totalPersonB
    });
  }

}
