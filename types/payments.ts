import { CardMethod, AccountMethod } from "@tosspayments/brandpay-types";

export interface account {
    subMallId: string
    type: "CORPORATE" | "INDIVIDUAL"
    account: {
        bank: string
        accountNumber: string
    }
}

export type PaymentMethod = CardMethod | AccountMethod;