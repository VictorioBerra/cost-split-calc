import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  ExpenseCard,
  Expense
} from '../../models/expensecard.model';

/*
  Generated class for the CostSplitCalculatorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CostSplitCalculatorProvider {

  constructor() {}

  public Calculate(totalWithTax: number, taxRate: number, expenseCards: ExpenseCard[]): any {

    // extract tax
    var totalWithoutTax: number = totalWithTax / (1 + (taxRate / 100));
    var totalTaxCollected: number = totalWithTax - totalWithoutTax;

    // Calc totals
    var totalIndividualEsxpenses: number = this.getTotalAllExpenses(expenseCards);

    var totalLessAdditional: number = totalWithoutTax - totalIndividualEsxpenses;

    if(totalWithTax - totalIndividualEsxpenses < 0)
    {
        // TODO: how to handle errors??
        throw Error("All individual expenses exceeded the total.");
    }

    console.log(totalLessAdditional);
    //var totalLessAdditional: number = totalWithoutTax - additA - additB;

    // var splitDifference: number = totalLessAdditional / 2;

    // var totalPersonAWithoutTax: number = additA + splitDifference;
    // var totalPersonBWithoutTax: number = additB + splitDifference;

    // // Add tax
    // var personATotalPercentage = (totalPersonAWithoutTax / totalWithoutTax);
    // var totalPersonA = (personATotalPercentage * totalTaxCollected) + totalPersonAWithoutTax;

    // var personBTotalPercentage = (totalPersonBWithoutTax / totalWithoutTax );
    // var totalPersonB = (personBTotalPercentage * totalTaxCollected) + totalPersonBWithoutTax;

    // return {
    //   personATotal: totalPersonA,
    //   personBTotal: totalPersonB,
    //   total: (totalPersonA + totalPersonB).toFixed(2)
    // };

  }

  private getTotalAllExpenses(expenseCards: ExpenseCard[]): number {
    return this.getexpenseCardsWithReducedExpenses(expenseCards).reduce((p, c) => {
      p += c.expenses[0].value;
      return p;
    }, 0);
  }

  private getexpenseCardsWithReducedExpenses(expenseCards: ExpenseCard[]): ExpenseCard[] {
    let newExpenseCards: ExpenseCard[] = [];
    for(var i = 0; i < expenseCards.length; i++) {
      let currentCard = expenseCards[i];

      let newCard: ExpenseCard = new ExpenseCard;
      newCard.name = currentCard.name;
      newCard.expenses = this.reduceExpenseCardExpenses(currentCard.expenses);

      newExpenseCards.push(newCard);
    }
    return newExpenseCards;
  }

  private reduceExpenseCardExpenses(expenses: Expense[]): Expense[] {
    let total: number = 0;
    for(var i = 0; i < expenses.length; i++) {
      total += (expenses[i].value * 1);
    }
    return [{
      value: total
    }];
  }


}
