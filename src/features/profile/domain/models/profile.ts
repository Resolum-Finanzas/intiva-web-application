export interface CreditStatus {
  label: string;
  amount: number;
  validUntil: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  memberId: string;
  avatarUrl?: string;
  creditStatus?: CreditStatus;
}
