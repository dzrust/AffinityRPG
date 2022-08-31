export enum SUBSCRIPTIONS {
  FREE = "FREE",
  PAID_V1 = "PAID_V1",
}

export enum SUBSCRIPTION_STATE {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  REVOKED = "REVOKED",
}

export type Subscription = {
  id: string;
  startDate: number;
  state: SUBSCRIPTION_STATE;
};
