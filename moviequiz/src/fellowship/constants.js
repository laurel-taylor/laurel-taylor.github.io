import characters from '@/fellowship/characters';

import rope from '@/assets/pics/rope.png';
import vial from '@/assets/pics/vial.png';
import bow from '@/assets/pics/bow.png';
import hairs from '@/assets/pics/hairs.png';
import daggers from '@/assets/pics/daggers.png';
import merrypippin from '@/assets/pics/merrypippin.png';

export const gifts = {
    rope: {
        name: "Rope",
        accepted: ["rope"],
        picture: characters.sam.picture,
        pictureOption: rope,
        answerPrompt: "Sam got the:",
    },
    light: {
        name: "Vial (Light of Elendil)",
        accepted: ["vial", "light", "elendil"],
        picture: characters.frodo.picture,
        pictureOption: vial,
        answerPrompt: "Frodo got the:",
    },
    daggers: {
        name: "Daggers",
        accepted: ["daggers", "dagger"],
        picture: merrypippin,
        pictureOption: daggers,
        answerPrompt: "Merry and Pippin got the:",
    },
    bow: {
        name: "Bow",
        accepted: ["bow"],
        picture: characters.legolas.picture,
        pictureOption: bow,
        answerPrompt: "Legolas got the:",
    },
    hairs: {
        name: "Hairs (x3)",
        accepted: ["hair", "hairs", "3", "3x", "three"],
        picture: characters.gimli.picture,
        pictureOption: hairs,
        answerPrompt: "Gimli got the:",
    },
}