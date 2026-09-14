import CatmouseCellMark from './catmouse/CellMark.jsx';
import GardenCellMark from './garden/CellMark.jsx';
import PirateCellMark from './pirate/CellMark.jsx';
import StandardCellMark from './standard/CellMark.jsx';
import './standard/theme.css';
import './pirate/theme.css';
import './catmouse/theme.css';
import './garden/theme.css';

export const CELL_MARKS = {
  standard: StandardCellMark,
  pirate: PirateCellMark,
  catmouse: CatmouseCellMark,
  garden: GardenCellMark,
};
