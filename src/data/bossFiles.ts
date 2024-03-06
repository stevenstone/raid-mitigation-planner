import { BossFile } from "../utility/constants";
// import p6sData from "./p6s.json";
// import p8sDogFirst from "./p8s-dog-first.json";
// import p8sSnakeFirst from "./p8s-snake-first.json";
// import p9s from "./p9s.json";
// import p10s from "./p10s.json";
import ketuduke from "./ketuduke.json";
import lala from "./lala.json";
import statice from "./statice.json";

export const bossFiles: BossFile = {
    "ketuduke": {
        file: ketuduke,
        displayName: "Ketuduke",
    },
    "lala": {
        file: lala,
        displayName: "Lala",
    },
    "statice": {
        file: statice,
        displayName: "Statice",
    }
};
