// import { convertTimeStringToSeconds } from "./timeCalculations";

// export const attackTypes = new Map<string, string>(
//     [
//         ["magical", "M"],
//         ["all", ""],
//         ["physical", "P"]
//     ]
// );

// export type MitigationType = "magical" | "physical" | "all" | "none";

export interface BossAttacks {
    name: string;
    castTime: number;
    time: string;
}

export interface FightData {
    attacks: BossAttacks[];
    time: string;
}

export interface BossFile {
    [key: string]: {
        file: FightData,
        displayName: string;
    }
}

export interface Mitigation {
    name: string;
    duration: number;
    cooldown: number;
}

export interface MitigationOptions {
    [job: string]: Mitigation[],
}

export interface SavedMitigation extends Mitigation {
    time: number;
}

export interface SinglePlayerMitigations {
    job: string;
    mitigations: SavedMitigation[];
}

export interface SingleFightMitigations {
    fight: string;
    mitigations: SinglePlayerMitigations[];
}

// export interface AllMitigations {
//     fights: SingleFightMitigations[];
// }
