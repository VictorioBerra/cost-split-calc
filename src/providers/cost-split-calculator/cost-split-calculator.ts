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

      let newRecieptItem: RecieptItem = new RecieptItem();
      newRecieptItem.name = card.name;
      newRecieptItem.totalExpensesWithoutTax = _.sum(card.expenses.map(expense => expense.value * 1));
      newRecieptItem.expensesWithTax = newRecieptItem.totalExpensesWithoutTax * (1 + decTaxRate);
      newRecieptItem.totalOwedWithTax = _.round((splitDifferenceWithTax + newRecieptItem.expensesWithTax), 2);
      newRecieptItem.totalPercentageBill = newRecieptItem.totalOwedWithTax / expenseCards.length;
      newRecieptItem.expenses = card.expenses;

      return newRecieptItem;
    });

    let reciept = new Reciept(recieptItems);
    reciept.total = _.round(_.sum(_.flatten(recieptItems.map(reciept => reciept.totalOwedWithTax))), 2);

    if(reciept.total > totalWithTax) {
      reciept.total -= .01;
      // Pick lottery winner
      var recieptItem = recieptItems[Math.floor(Math.random()*recieptItems.length)];
      recieptItem.totalOwedWithTax += .01;
    }

    return reciept;

  }

  private getTotalAllExpenses(expenseCards: ExpenseCard[]): number {
    return _.sum(_.flatten(expenseCards.map(card => card.expenses.map(expense => expense.value))));
  }


}
