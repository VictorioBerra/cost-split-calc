import {
  Expense
} from './expensecard.model';

export class Reciept {
    
  total: number;

  constructor(public recieptItems: RecieptItem[]) { }

}

export class RecieptItem {

  name: string;
  totalExpensesWithoutTax: number;
  expensesWithTax: number;
  totalPercentageBill: number;
  totalOwedWithTax: number;
  expenses: Expense[];
  extraRounded: boolean;

  constructor() {}

}
