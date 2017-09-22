import {
  ExpenseCard,
  Expense
} from './expensecard.model';
import _ from 'lodash';

export class Reciept {
    
  total: number;

  constructor(public recieptItems: RecieptItem[]) {}

}

export class RecieptItem {

  name: string;
  totalExpensesWithoutTax: number;
  expensesWithTax: number;
  totalPercentageBill: number;
  totalOwedWithTax: number;
  expenses: Expense[];

  constructor() {}

}
