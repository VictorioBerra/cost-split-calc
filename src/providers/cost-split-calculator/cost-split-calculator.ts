import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  ExpenseCard,
  Expense
} from '../../models/expensecard.model';
import {
  Reciept,
  RecieptItem
} from '../../models/reciepts.model';
import _ from 'lodash';

@Injectable()
export class CostSplitCalculatorProvider {

  constructor() {}

  public Calculate(totalWithTax: number, taxRate: number, expenseCards: ExpenseCard[]): Reciept {

    // extract tax
    let decTaxRate: number = (taxRate / 100);
    let totalWithoutTax: number = totalWithTax / (1 + decTaxRate);
    let totalIndividualExpenses: number = this.getTotalAllExpenses(expenseCards);
    let totalLessAllExpenses: number = totalWithoutTax - totalIndividualExpenses;

    // Somone entered too many expenses
    if (totalLessAllExpenses < 0) {
      // TODO: how to handle errors?
      throw Error("All individual expenses exceeded the total.");
    }

    //let totalTaxCollected: number = totalWithTax - totalWithoutTax;
    let splitDifferenceWithoutTax: number = totalLessAllExpenses / expenseCards.length;
    let splitDifferenceWithTax: number = splitDifferenceWithoutTax * (1 + decTaxRate);

    // Start building the reciept
    let recieptItems: RecieptItem[] = expenseCards.map(card => {
      let newReciept: RecieptItem = new RecieptItem(card);

      newReciept.expensesWithTax = newReciept.totalExpensesWithoutTax * (1 + decTaxRate);
      newReciept.totalOwedWithTax = splitDifferenceWithTax + newReciept.expensesWithTax;
      newReciept.totalPercentageBill = newReciept.totalOwedWithTax / expenseCards.length;

      return newReciept;
    });

    var reciept = new Reciept(recieptItems);

    return reciept;

  }

  private getTotalAllExpenses(expenseCards: ExpenseCard[]): number {
    return _.sum(_.flatten(expenseCards.map(card => card.expenses.map(expense => expense.value))));
  }


}
