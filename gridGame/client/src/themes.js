const THEME_KEY = 'gridChase.theme';

export const THEMES = {
  standard: {
    id: 'standard',
    label: 'Standard',
    title: 'Grid Chase',
    copy: {
      starting: 'Starting a new game…',
      playing: 'Reach the gold square. Avoid the red PC.',
      newGame: 'New game',
      youWin: 'You win',
      youLose: 'You lose',
      timedOut: 'Out of time',
      you: 'You',
      pc: 'PC',
      objective: 'Objective',
      reasons: {
        player_hit_pc: 'You ran into the PC. You lose.',
        player_hit_objective: 'You reached the objective. You win.',
        pc_hit_player: 'The PC caught you. You lose.',
        pc_hit_objective: 'The PC reached the objective. You lose.',
        timeout: 'Time ran out before you reached the objective. You lose.',
      },
      fallbackWin: 'You win.',
      fallbackLose: 'You lose.',
    },
  },
  pirate: {
    id: 'pirate',
    label: 'Pirate',
    title: 'X Marks the Spot',
    copy: {
      starting: 'Chartin\' a course…',
      playing: 'Steer yer ship to the buried X. Keep clear o\' the rival vessel.',
      newGame: 'New voyage',
      youWin: 'Yo-ho-ho!',
      youLose: 'Davy Jones has ye',
      timedOut: 'The tide turned',
      you: 'Yer ship',
      pc: 'Rival ship',
      objective: 'Buried X',
      reasons: {
        player_hit_pc: 'Ye rammed the scallywag! All hands lost.',
        player_hit_objective: 'Ye found the treasure! Drink up, me hearties.',
        pc_hit_player: 'The rival ship boarded ye! Walk the plank.',
        pc_hit_objective: 'The scallywag claimed the booty! Ye lose.',
        timeout: 'The sands ran out! Treasure stays buried. Ye lose.',
      },
      fallbackWin: 'The treasure be yers.',
      fallbackLose: 'Ye be sunk.',
    },
  },
  catmouse: {
    id: 'catmouse',
    label: 'Cat & mouse',
    title: 'Cat and Mouse',
    copy: {
      starting: 'The chase begins…',
      playing: 'Get the cheese. Don\'t let the cat get you.',
      newGame: 'New chase',
      youWin: 'Got the cheese!',
      youLose: 'Caught!',
      timedOut: 'Too slow!',
      you: 'Mouse',
      pc: 'Cat',
      objective: 'Cheese',
      reasons: {
        player_hit_pc: 'You ran into the cat! Caught.',
        player_hit_objective: 'You got the cheese! Nibble away.',
        pc_hit_player: 'The cat got you!',
        pc_hit_objective: 'The cat stole the cheese!',
        timeout: 'Too slow — the cheese went stale.',
      },
      fallbackWin: 'You got the cheese.',
      fallbackLose: 'The cat wins.',
    },
  },
  catdog: {
    id: 'catdog',
    label: 'Cat & dog',
    title: 'Fish Run',
    copy: {
      starting: 'Paws at the ready…',
      playing: 'Grab the fish. Don\'t let the dog catch you.',
      newGame: 'New dash',
      youWin: 'Got the fish!',
      youLose: 'Caught!',
      timedOut: 'Fish got away!',
      you: 'Cat',
      pc: 'Dog',
      objective: 'Fish',
      reasons: {
        player_hit_pc: 'You ran into the dog! Caught.',
        player_hit_objective: 'You got the fish! Nom nom.',
        pc_hit_player: 'The dog caught you!',
        pc_hit_objective: 'The dog stole the fish!',
        timeout: 'Too slow — the fish got away.',
      },
      fallbackWin: 'You got the fish.',
      fallbackLose: 'The dog wins.',
    },
  },
  garden: {
    id: 'garden',
    label: 'Garden',
    title: 'The Bloom',
    copy: {
      starting: 'Taking flight…',
      playing: 'Reach the bloom. Beware the wasp.',
      newGame: 'New flight',
      youWin: 'Nectar!',
      youLose: 'Stung!',
      timedOut: 'Dusk fell',
      you: 'Bee',
      pc: 'Wasp',
      objective: 'Flower',
      reasons: {
        player_hit_pc: 'You flew into the wasp. Stung!',
        player_hit_objective: 'You reached the bloom!',
        pc_hit_player: 'The wasp caught you!',
        pc_hit_objective: 'The wasp claimed the flower!',
        timeout: 'Dusk fell and the bloom closed.',
      },
      fallbackWin: 'The bloom is yours.',
      fallbackLose: 'The garden goes quiet.',
    },
  },
};

export function getStoredThemeId() {
  const stored = localStorage.getItem(THEME_KEY);
  return THEMES[stored] ? stored : 'standard';
}

export function storeThemeId(id) {
  localStorage.setItem(THEME_KEY, id);
  document.documentElement.dataset.theme = id;
}

export function messageFor(game, theme) {
  const copy = theme.copy;
  if (!game?.status || game.status === 'in_progress') {
    return copy.playing;
  }
  return copy.reasons[game.reason]
    ?? (game.status === 'won' ? copy.fallbackWin : copy.fallbackLose);
}
