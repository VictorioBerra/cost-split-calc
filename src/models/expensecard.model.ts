export class ExpenseCard {
  name: string;
  expenses: Expense[];
}

export class Expense {
  value: number;
  note?: string;
}