export interface account {
    subMallId: string
    type: "CORPORATE" | "INDIVIDUAL"
    account: {
        bank: string
        accountNumber: string
    }
}