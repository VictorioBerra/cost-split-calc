import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  ExpenseCard
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

    if (expenseCards.length < 2) {
      throw new Error(`You need to have at least 2 people to split a bill with.`);
    }

    // Angular returns ngModel bound items as strings.
    expenseCards.forEach(card => card.expenses = card.expenses.filter(expense => {
      if(!_.isNull(expense.value)) {
        return expense.value;
      }
    }));
    expenseCards.forEach(card => card.expenses.forEach(expense => {
      expense.value = Number(expense.value);
    }));

    // extract tax
    let decTaxRate: number = (taxRate / 100);
    let totalWithoutTax: number = totalWithTax / (1 + decTaxRate);
    let totalIndividualExpenses: number = this.getTotalAllExpenses(expenseCards);
    let totalLessAllExpenses: number = totalWithoutTax - totalIndividualExpenses;

    // Somone entered too many expenses
    if (totalLessAllExpenses < 0) {
      throw new Error(`All individual expenses of $${totalIndividualExpenses} exceeded the before tax total: $${totalWithoutTax}.`);
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
      newRecieptItem.totalPercentageBill = (newRecieptItem.totalOwedWithTax / totalWithTax) * 100;
      newRecieptItem.expenses = card.expenses;

      return newRecieptItem;
    });

    let reciept = new Reciept(recieptItems);
    reciept.total = _.round(_.sum(_.flatten(recieptItems.map(reciept => reciept.totalOwedWithTax))), 2);

    if(reciept.total !== totalWithTax) {
      let overFlow = _.round((totalWithTax - reciept.total), 2);
      let recieptItem = recieptItems[0];
      recieptItem.totalOwedWithTax = _.round(recieptItem.totalOwedWithTax + overFlow, 2);
      reciept.total = _.round(reciept.total + overFlow, 2);
      recieptItem.extraRounded = true;
    }

    return reciept;

  }

  private getTotalAllExpenses(expenseCards: ExpenseCard[]): number {
    return _.sum(_.flatten(expenseCards.map(card => card.expenses.map(expense => expense.value))));
  }


}
