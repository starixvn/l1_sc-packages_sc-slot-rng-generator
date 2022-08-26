export interface BetChoice {
    name: string;
    odds: number;
    count: number;
    relatedChoices: string[];
    canBet: boolean;
}

export interface BetChoiceTable {
    choices: BetChoice[];
}
