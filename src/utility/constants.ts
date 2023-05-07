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
    [displayName: string]: BossAttacks[],
}

export interface PlayerMitigation {
    name: string;
    duration: number;
    cooldown: number;
}

export interface SavedMitigation extends PlayerMitigation {
    time: number;
}

export interface BossAttacks {
    name: string;
    castTime: number;
    time: string;
}