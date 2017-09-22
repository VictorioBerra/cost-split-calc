import {
  ExpenseCard,
  Expense
} from './expensecard.model';
import _ from 'lodash';

export class Reciept {
  total: number;
  //items: RecieptItem;

  constructor(private recieptItems: RecieptItem[]) {
    this.total = _.sum(_.flatten(recieptItems.map(reciept => reciept.totalOwedWithTax)));
  }

}

export class RecieptItem {
  name: string;

  totalExpensesWithoutTax: number;
  expensesWithTax: number;
  totalPercentageBill: number;
  totalOwedWithTax: number;

  constructor(private card: ExpenseCard) {
    this.name = card.name;
    this.totalExpensesWithoutTax = _.sum(card.expenses.map(expense => expense.value * 1));
  }

}
