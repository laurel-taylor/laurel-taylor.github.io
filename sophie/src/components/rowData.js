/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const rows = {
  r_1: { small: 2, medium: 2, large: 3, index: '1' },
  r_2: { small: 3, medium: 3, large: 3, index: '2' },
  r_3: { small: 7, medium: 9, large: 10, index: '3' },
  r_4: { small: 5, medium: 6, large: 7, index: '4' },
  r_5: { small: 2, medium: 3, large: 3.5, index: '5' },
  r_6: { small: 2, medium: 3, large: 4.5, index: '6' },
  r_7: { small: 2, medium: 3, large: 5.5, index: '7' },
  r_8: { small: 5, medium: 4, large: 6.5, index: '8' },
  r_9: { small: 5, medium: 6, large: 8, index: '9' },
  r_10: { small: 10, medium: 11, large: 18, index: '10' },
  r_11: { small: 4, medium: 9, large: 9, index: '11' },
  r_12: { small: 4, medium: 9, large: 6, index: '12' },
  r_13: { small: 12, medium: 13, large: 18, index: '13' },
  r_14: { small: 8, medium: 5, large: 9, index: '14' },
  r_15: { small: 9, medium: 7, large: 9, index: '15' },
  r_16: { small: 10, medium: 9, large: 15, index: '16' },
  r_17: { small: 7, medium: 6, large: 11, index: '17' },
  r_18: { small: 17, medium: 20, large: 20, index: '18' },
  r_19: { small: 14, medium: 14, large: 20, index: '19' },
  r_20: { small: 17, medium: 21, large: 23, index: '20' },
  r_21: { small: 15, medium: 11, large: 18, index: '21' },
  r_22: { small: 14, medium: 20, large: 17, index: '22' },
  r_23: { small: 16, medium: 20, large: 24, index: '23' },
  r_24: { small: 9, medium: 14, large: 16, index: '24' },
  r_25: { small: 9, medium: 14, large: 16, index: '25' },
  r_26: { small: 17, medium: 21, large: 22, index: '26' },
  r_27: { small: 15, medium: 20, large: 21, index: '27' },
  r_28: { small: 7, medium: 13, large: 13, index: '28' },
  r_29: { small: 17, medium: 20, large: 24, index: '29' },
  r_30: { small: 14, medium: 25, large: 26, index: '30' },
  r_31: { small: 10, medium: 20, large: 23, index: '31' },
  r_32: { small: 14, medium: 18, large: 21, index: '32' },
  r_33: { small: 7, medium: 17, large: 18, index: '33' },
  r_34: { small: 15, medium: 24, large: 23, index: '34' },
  r_35: { small: 14, medium: 23, large: 24, index: '35' },
  r_36: { small: 20, medium: 28, large: 29, index: '36' },
  optional_flowers: { small: 10, medium: 10, large: 12, index: '36.5', name: 'Optional flowers' },
  r_37: { small: 20, medium: 31, large: 32, index: '37' },
  r_38: { small: 17, medium: 20, large: 24, index: '38' },
  r_39: { small: 41, medium: 53, large: 65, index: '39' },
  r_40: { small: 19, medium: 24, large: 23.5, index: '40' },
  r_41: { small: 36, medium: 52, large: 54, index: '41' },
  r_42: { small: 14, medium: 17, large: 20, index: '42' },
  r_43: { small: 14, medium: 20, large: 21, index: '43' },
  r_44: { small: 14, medium: 20, large: 21, index: '44' },
  r_45: { small: 17, medium: 23, large: 26, index: '45' },
  r_46: { small: 19, medium: 30, large: 32, index: '46' },
  r_47: { small: 19, medium: 30, large: 32, index: '47' },
  r_48: { small: 14, medium: 22.5, large: 27, index: '48' },
  r_49: { small: 24, medium: 31, large: 36, index: '49' },
  r_50: { small: 26, medium: 31, large: 37.5, index: '50' },
  r_51: { small: 27, medium: 31, large: 34, index: '51' },
  r_52: { small: 24, medium: 28, large: 34, index: '52' },
  r_53: { small: 31, medium: 41, large: 44, index: '53' },
  r_54: { small: 17, medium: 25, large: 24, index: '54' },
  r_55: { small: 17, medium: 34, large: 31.5, index: '55' },
  r_56: { small: 26, medium: 37, large: 36, index: '56' },
  r_57: { small: 17, medium: 23, large: 30, index: '57' },
  r_58: { small: 24, medium: 28, large: 36, index: '58' },
  r_59: { small: 31, medium: 42, large: 49, index: '59' },
  r_60: { small: 24, medium: 26, large: 31, index: '60' },
  r_61: { small: 14, medium: 23, large: 20, index: '61' },
  r_62: { small: 27, medium: 31, large: 36, index: '62' },
  r_63: { small: 31, medium: 42, large: 46.5, index: '63' },
  r_64: { small: 27, medium: 31, large: 36, index: '64' },
  r_65: { small: 14, medium: 23, large: 28.5, index: '65' },
  r_66: { small: 27, medium: 36, large: 46.5, index: '66' },
  r_67: { small: 17, medium: 22, large: 27, index: '67' },
  r_68: { small: 21, medium: 28, large: 33, index: '68' },
  r_69: { small: 14, medium: 20, large: 25, index: '69' },
  r_70: { small: 20, medium: 28, large: 28.5, index: '70' },
  r_71: { small: 20, medium: 22.5, large: 30, index: '71' },
  r_72: { small: 17, medium: 22.5, large: 26, index: '72' },
  r_73: { small: 41, medium: 56, large: 64, index: '73' },
  r_74: { small: 21, medium: 31, large: 36, index: '74' },
  r_75: { small: 24, medium: 36, large: 35, index: '75' },
  r_76: { small: 27, medium: 34, large: 37.5, index: '76' },
  r_77: { small: 20, medium: 31, large: 29, index: '77' },
  r_78: { small: 24, medium: 34, large: 31.5, index: '78' },
  r_79: { small: 24, medium: 36, large: 31.5, index: '79' },
  r_80: { small: 17, medium: 28, large: 25, index: '80' },
  r_81: { small: 22, medium: 34, large: 33, index: '81' },
  r_82: { small: 22, medium: 33, large: 36, index: '82' },
  r_83: { small: 15, medium: 17, large: 24, index: '83' },
  r_84: { small: 27, medium: 39, large: 38, index: '84' },
  r_85: { small: 27, medium: 42, large: 40, index: '85' },
  r_86: { small: 24, medium: 37, large: 41, index: '86' },
  r_87: { small: 21, medium: 39, large: 41, index: '87' },
  r_88: { small: 22, medium: 39, large: 36, index: '88' },
  r_89: { small: 31, medium: 42, large: 48, index: '89' },
  r_90: { small: 27, medium: 39, large: 45, index: '90' },
  r_91: { small: 22, medium: 36, large: 40, index: '91' },
  r_92: { small: 38, medium: 61, large: 65, index: '92' },
  r_93: { small: 32, medium: 45, large: 50, index: '93' },
  r_94: { small: 32, medium: 45, large: 50, index: '94' },
  r_95: { small: 31, medium: 42, large: 49, index: '95' },
  r_96: { small: 24, medium: 34, large: 35, index: '96' },
  r_97: { small: 37, medium: 59, large: 62, index: '97' },
  r_98: { small: 44, medium: 72, large: 75, index: '98' },
  r_99: { small: 37, medium: 56, large: 63, index: '99' },
  r_100: { small: 55, medium: 75, large: 85, index: '100' },
  r_101: { small: 37, medium: 64, large: 64, index: '101' },
  r_102: { small: 44, medium: 62, large: 72, index: '102' },
  r_103: { small: 24, medium: 36, large: 41, index: '103' },
  r_104: { small: 37, medium: 48, large: 58, index: '104' },
  r_105: { small: 24, medium: 36, large: 39, index: '105' },
  r_106: { small: 45, medium: 65, large: 73, index: '106' },
  r_107: { small: 31, medium: 41, large: 44, index: '107' },
  r_108: { small: 34, medium: 52, large: 56, index: '108' },
  r_109: { small: 37, medium: 52, large: 56, index: '109' },
  r_110: { small: 34, medium: 43, large: 48, index: '110' },
  r_111: { small: 34, medium: 50, large: 60, index: '111' },
  r_112: { small: 41, medium: 58, large: 63, index: '112' },
  r_113: { small: 58, medium: 78, large: 88, index: '113' },
};

const colorGroups = {
  small: {
    title: 'Small pattern',
    index: 'small',
    yarn: 'Scheepjes Color 8',
    colors: [
      [rows.r_1, rows.r_8, rows.r_16, rows.r_27, rows.r_34, rows.r_39, rows.r_49, rows.r_66, rows.r_88],
      [rows.r_2, rows.r_17, rows.optional_flowers, rows.r_50, rows.r_76, rows.r_87],
      [rows.r_3, rows.r_18, rows.r_31, rows.r_51, rows.r_59, rows.r_75, rows.r_86],
      [rows.r_4, rows.r_19, rows.r_29, rows.r_52, rows.r_80, rows.r_100, rows.r_107, rows.r_110],
      [rows.r_30, rows.r_54, rows.r_62, rows.r_73],
      [rows.r_36, rows.r_42, rows.r_43, rows.r_44, rows.r_55, rows.r_60, rows.r_69, rows.r_78],
      [rows.r_10, rows.r_20, rows.r_35, rows.r_40, rows.r_41, rows.r_53, rows.r_63, rows.r_74, rows.r_79, rows.r_85, rows.r_104, rows.r_112],
      [rows.r_11, rows.r_12, rows.r_13, rows.r_64, rows.r_103, rows.r_113],
      [rows.r_9, rows.r_21, rows.r_26, rows.r_28, rows.r_38, rows.r_48, rows.r_58, rows.r_65, rows.r_71, rows.r_81, rows.r_83, rows.r_89, rows.r_99],
      [rows.r_5, rows.r_6, rows.r_7, rows.r_14, rows.r_15, rows.r_23, rows.r_24, rows.r_25, rows.r_32, rows.r_37, rows.r_45, rows.r_46, rows.r_47, rows.r_56, rows.r_57, rows.r_61, rows.r_67, rows.r_68, rows.r_72, rows.r_77, rows.r_82, rows.r_91, rows.r_92, rows.r_93, rows.r_94, rows.r_95, rows.r_96, rows.r_97, rows.r_101, rows.r_102, rows.r_105, rows.r_106, rows.r_108, rows.r_109, rows.r_111],
      [rows.r_22, rows.r_33, rows.r_70, rows.r_84, rows.r_90, rows.r_98],
    ],
    defaultColors: [
      '#FADE4F', // canary
      '#D7B9C8', // lt pink
      '#FEDFDD', // pink
      '#B4497B', // fushsia
      '#A1A0CA', // violet
      '#844B76', // lt purple
      '#B10144', // moors
      '#351B25', // heath
      '#C3CC87', // lt green
      '#85E0EE', // lt tqoise
      '#11A3C6', // turquoise
    ],
  },
  medium_colorcrafter: {
    title: 'Med pattern',
    index: 'medium_colorcrafter',
    yarn: 'Colour crafter',
    colors: [
      [rows.r_1, rows.r_8, rows.r_16, rows.r_27, rows.r_34, rows.r_39, rows.r_49, rows.r_66, rows.r_88],
      [rows.r_2, rows.r_17, rows.optional_flowers, rows.r_50, rows.r_62, rows.r_76, rows.r_87],
      [rows.r_3, rows.r_18, rows.r_31, rows.r_51, rows.r_59, rows.r_75, rows.r_86],
      [rows.r_4, rows.r_19, rows.r_29, rows.r_52, rows.r_80, rows.r_100, rows.r_107, rows.r_110],
      [rows.r_30, rows.r_36, rows.r_42, rows.r_43, rows.r_44, rows.r_54, rows.r_55, rows.r_60, rows.r_69, rows.r_73, rows.r_78],
      [rows.r_10, rows.r_20, rows.r_35, rows.r_40, rows.r_41, rows.r_53, rows.r_63, rows.r_74, rows.r_79, rows.r_85, rows.r_104, rows.r_112],
      [rows.r_11, rows.r_12, rows.r_13, rows.r_64, rows.r_103, rows.r_113],
      [rows.r_9, rows.r_21, rows.r_26, rows.r_28, rows.r_38, rows.r_48, rows.r_58, rows.r_65, rows.r_71, rows.r_81, rows.r_83, rows.r_89, rows.r_99],
      [rows.r_5, rows.r_6, rows.r_7, rows.r_14, rows.r_15, rows.r_23, rows.r_24, rows.r_25, rows.r_32, rows.r_37, rows.r_45, rows.r_46, rows.r_47, rows.r_56, rows.r_57, rows.r_61, rows.r_67, rows.r_68, rows.r_72, rows.r_77, rows.r_91, rows.r_92, rows.r_93, rows.r_94, rows.r_95, rows.r_96, rows.r_97, rows.r_101, rows.r_102, rows.r_105, rows.r_106, rows.r_108, rows.r_109, rows.r_111],
      [rows.r_22, rows.r_33, rows.r_70, rows.r_82, rows.r_84, rows.r_90, rows.r_98],
    ],
    defaultColors: ['#E4CB63', '#DDC1C5', '#D88AAA', '#B63949', '#9186AC', '#945491', '#40172F', '#B4B269', '#ACCACE', '#4EA2CA', '#844B76'],
  },
  medium_softfun: {
    title: 'Med pattern 2',
    index: 'medium_softfun',
    yarn: 'Scheepjes Softfun',
    colors: [
      [rows.r_1, rows.r_16, rows.r_34, rows.r_39, rows.r_49, rows.r_66, rows.r_82, rows.r_88],
      [rows.r_2, rows.r_17, rows.r_27, rows.r_35, rows.r_50, rows.r_76, rows.r_87, rows.r_109],
      [rows.r_3, rows.r_18, rows.r_29, rows.r_36, rows.r_51, rows.r_59, rows.r_75, rows.r_86, rows.r_104, rows.r_111],
      [rows.r_4, rows.r_19, rows.r_52, rows.r_80, rows.r_90, rows.r_98, rows.r_107, rows.r_110],
      [rows.r_54, rows.r_62, rows.r_73, rows.r_101, rows.r_102],
      [rows.r_31, rows.r_42, rows.r_43, rows.r_44, rows.r_55, rows.r_60, rows.r_78, rows.r_108],
      [rows.r_11, rows.r_12, rows.r_13, rows.r_20, rows.r_30, rows.r_40, rows.r_41, rows.r_63, rows.r_74, rows.r_79, rows.r_85, rows.r_103, rows.r_112],
      [rows.r_10, rows.optional_flowers, rows.r_53, rows.r_64, rows.r_100, rows.r_113],
      [rows.r_9, rows.r_21, rows.r_26, rows.r_28, rows.r_38, rows.r_48, rows.r_58, rows.r_65, rows.r_71, rows.r_81, rows.r_83, rows.r_89, rows.r_99, rows.r_105],
      [rows.r_5, rows.r_6, rows.r_7, rows.r_8, rows.r_14, rows.r_15, rows.r_23, rows.r_24, rows.r_25, rows.r_32, rows.r_37, rows.r_45, rows.r_46, rows.r_47, rows.r_56, rows.r_57, rows.r_61, rows.r_67, rows.r_68, rows.r_69, rows.r_72, rows.r_77, rows.r_91, rows.r_92, rows.r_93, rows.r_94, rows.r_95, rows.r_96, rows.r_97, rows.r_106],
      [rows.r_22, rows.r_33, rows.r_70, rows.r_84],
    ],
    defaultColors: [
      '#FADE4F', // canary
      '#FAB7DE', // lt rose
      '#F595A5', // rose
      '#921519', // bordeaux
      '#FEDFDD', // pink
      '#A1A0CA', // violet
      '#972344', // cyclamen
      '#351B25', // heath
      '#A6A342', // olive
      '#95C0DF', // lt blue
      '#11BEDF', // dk tqoise
    ],
  },
  large: {
    title: 'Large pattern',
    index: 'large',
    yarn: 'Scheepjes Softfun XL',
    colors: [
      [rows.r_1, rows.r_5, rows.r_6, rows.r_7, rows.r_8, rows.r_14, rows.r_15, rows.r_24, rows.r_25, rows.r_27, rows.r_30, rows.r_32, rows.r_34, rows.r_35, rows.r_42, rows.r_43, rows.r_44, rows.r_45, rows.r_46, rows.r_47, rows.r_49, rows.r_51, rows.r_52, rows.r_53, rows.r_56, rows.r_57, rows.r_61, rows.r_62, rows.r_67, rows.r_68, rows.r_69, rows.r_72, rows.r_75, rows.r_80, rows.r_82, rows.r_85, rows.r_87, rows.r_89, rows.r_91, rows.r_92, rows.r_93, rows.r_94, rows.r_95, rows.r_96, rows.r_97, rows.r_101, rows.r_102, rows.r_105, rows.r_106, rows.r_108, rows.r_109, rows.r_111],
      [rows.r_2, rows.r_22, rows.r_23, rows.r_37, rows.r_55, rows.r_63, rows.r_74, rows.r_77],
      [rows.r_3, rows.r_20, rows.r_21, rows.optional_flowers, rows.r_64, rows.r_84, rows.r_104],
      [rows.r_4, rows.r_36, rows.r_54, rows.r_73, rows.r_86, rows.r_103],
      [rows.r_9, rows.r_26, rows.r_28, rows.r_38, rows.r_48, rows.r_58, rows.r_70, rows.r_78, rows.r_81, rows.r_83, rows.r_99, rows.r_107, rows.r_110],
      [rows.r_18, rows.r_19, rows.r_33, rows.r_40, rows.r_60, rows.r_65, rows.r_71, rows.r_88],
      [rows.r_16, rows.r_17, rows.r_59, rows.r_90, rows.r_98],
      [rows.r_11, rows.r_12, rows.r_13, rows.r_41, rows.r_79, rows.r_113],
      [rows.r_10, rows.r_31, rows.r_39, rows.r_76, rows.r_112],
      [rows.r_29, rows.r_50, rows.r_66, rows.r_100],
    ],
    defaultColors: ['#E4D3C1', '#9EB9B4', '#167D7A', '#486877', '#A8B681', '#D2BA60', '#89717E', '#621922', '#C07280', '#F79675'],
  },
};

const colorMap = [
  { code: '#E4D3C1', name: 'Moon Stone' },
  { code: '#9EB9B4', name: 'Amazonite (853)' },
  { code: '#167D7A', name: 'Green Agate (855)' },
  { code: '#486877', name: 'Blue Apatite (845)' },
  { code: '#A8B681', name: 'Canada Jade (846)' },
  { code: '#D2BA60', name: 'Lemon Quartz (852)' },
  { code: '#89717E', name: 'Deep Amethyst (851)' },
  { code: '#621922', name: 'Garnet (850)' },
  { code: '#C07280', name: 'Corundum Ruby (848)' },
  { code: '#F79675', name: 'Coral (856)' },
  { code: '#FADE4F', name: 'Canary (2518)' },
  { code: '#FAB7DE', name: 'Light Rose (2513)' },
  { code: '#F595A5', name: 'Rose (2514)' },
  { code: '#921519', name: 'Bordeaux (2492)' },
  { code: '#972344', name: 'Cyclamen (2534)' },
  { code: '#A6A342', name: 'Olive (2531)' },
  { code: '#11BEDF', name: 'Dark Turquoise (2511)' },
  { code: '#95C0DF', name: 'Light Blue (2432)' },
  { code: '#FEDFDD', name: 'Pink (2480)' },
  { code: '#351B25', name: 'Heath (2493)' },
  { code: '#A1A0CA', name: 'Violet (2519)' },
  { code: '#FADE4F', name: 'Canary (714)' },
  { code: '#D7B9C8', name: 'Light Pink (718)' },
  { code: '#B4497B', name: 'Fuchsia (720)' },
  { code: '#FEDFDD', name: 'Pink (719)' },
  { code: '#B10144', name: 'Moors (726)' },
  { code: '#C3CC87', name: 'Light Green (642)' },
  { code: '#11A3C6', name: 'Turquoise (712)' },
  { code: '#85E0EE', name: 'Light Turquoise (622)' },
  { code: '#A1A0CA', name: 'Violet (529)' },
  { code: '#351B25', name: 'Heath (721)' },
  { code: '#844B76', name: 'Light Purple (651)' },
  { code: '#E4CB63', name: 'Brussel' },
  { code: '#DDC1C5', name: 'Sittard' },
  { code: '#D88AAA', name: 'Den Bosch' },
  { code: '#B63949', name: 'Tilburg' },
  { code: '#9186AC', name: 'Heerlen' },
  { code: '#945491', name: 'Hengelo' },
  { code: '#40172F', name: 'Meppel' },
  { code: '#B4B269', name: 'Delftzijl' },
  { code: '#ACCACE', name: 'Urk' },
  { code: '#4EA2CA', name: 'Den Helder' },
  { code: '#d0c6bc', name: 'pink quartzite (821)' },
  { code: '#8395a2', name: 'blue apatite (805)' },
  { code: '#151514', name: 'Black Onyx (803)' },
  { code: '#654c43', name: 'brown agate (822)' },
  { code: '#b3b1a2', name: 'crystal quartz (814)' },
  { code: '#a09ea0', name: 'smokey quartz (802)' },
  { code: '#2c3f87', name: 'oostende (2005)' },
  { code: '#8cada6', name: 'ameland (1725)' },
  { code: '#8395a2', name: 'blue apatite (805)' },
  { code: '#98cbd2', name: 'amazonite (813)' },
  { code: '#c6e7f0', name: 'wheaton (950)' },

];

const findColorIndex = (round, colorGroup) => {
  const foundColor = -1;
  const { colors } = colorGroup;
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    for (let j = 0; j < color.length; j++) {
      const r1 = color[j];

      if (r1 === round) {
        return i;
      }
    }
  }

  console.log('could not find', round.index, 'in', colorGroup.title);
  return foundColor;
};

export default {
  rows,
  colorGroups,
  colorMap,
  findColorIndex,
};
