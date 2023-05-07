import { BossFile } from "../utility/constants";
import { attacks as p6sData } from "./p6s.json";
import { attacks as p8sDogFirst } from "./p8s-dog-first.json";
import { attacks as p8sSnakeFirst } from "./p8s-snake-first.json";

export const bossFiles: BossFile = {
    "P6S": p6sData,
    "P8S (Dog First)": p8sDogFirst,
    "P8S (Snake First)": p8sSnakeFirst,
};
