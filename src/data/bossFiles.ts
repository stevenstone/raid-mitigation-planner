import { BossFile } from "../utility/constants";
import p6sData from "./p6s.json";
import p8sDogFirst from "./p8s-dog-first.json";
import p8sSnakeFirst from "./p8s-snake-first.json";
import p9s from "./p9s.json";

export const bossFiles: BossFile = {
    // "p6s": {
    //     file: p6sData,
    //     displayName: "P6S",
    // },
    "p8sdog": {
        file: p8sDogFirst,
        displayName: "P8S (Dog First)",
    },
    "p8ssnake": {
        file: p8sSnakeFirst,
        displayName: "P8S (Snake First)",
    },
    "p9s": {
        file: p9s,
        displayName: "P9S",
    }
};
