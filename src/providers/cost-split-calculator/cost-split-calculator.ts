import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CostSplitCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CostSplitCalculatorProvider {

  constructor() { }

  Calculate = function(totalWithTax: number, taxRate: number, additA: number, additB: number,){

    // extract tax
    var totalWithoutTax: number = totalWithTax / (1 + (taxRate / 100));
    var totalTaxCollected: number = totalWithTax - totalWithoutTax;

    // Calc totals
    var totalLessAdditional: number = totalWithoutTax - additA - additB;

    var splitDifference: number = totalLessAdditional / 2;

    var totalPersonAWithoutTax: number = additA + splitDifference;
    var totalPersonBWithoutTax: number = additB + splitDifference;
    
    // Add tax
    var personATotalPercentage = (totalPersonAWithoutTax / totalWithoutTax);
    var totalPersonA = (personATotalPercentage * totalTaxCollected) + totalPersonAWithoutTax;
    
    var personBTotalPercentage = (totalPersonBWithoutTax / totalWithoutTax );
    var totalPersonB = (personBTotalPercentage * totalTaxCollected) + totalPersonBWithoutTax;

    return {
      personATotal: totalPersonA,
      personBTotal: totalPersonB,
      total: (totalPersonA + totalPersonB).toFixed(2)
    };

  }

}
