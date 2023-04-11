export interface MinesRound {
    _id?: string
    userId?: string
    size?: number
    mines?: number
    gems?: number
    betAmount?: number
    resultHash?: string
    playerChoices?: number
    profitPercent?: number
    profit?: number
    time?: string
    started?: boolean
    closed?: boolean
    userPaid?: boolean
    masterPaid?: boolean
}
