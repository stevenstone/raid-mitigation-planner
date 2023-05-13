// import { convertTimeStringToSeconds } from "./timeCalculations";

// export const attackTypes = new Map<string, string>(
//     [
//         ["magical", "M"],
//         ["all", ""],
//         ["physical", "P"]
//     ]
// );

// export type MitigationType = "magical" | "physical" | "all" | "none";

export interface BossFile {
    [key: string]: {
        file: FightData,
        displayName: string;
    }
}

export interface PlayerMitigation {
    name: string;
    duration: number;
    cooldown: number;
}

export interface SavedMitigation extends PlayerMitigation {
    time: number;
}

export interface FightData {
    attacks: BossAttacks[];
    time: string;
}

export interface BossAttacks {
    name: string;
    castTime: number;
    time: string;
}