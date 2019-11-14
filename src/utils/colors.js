import { parseToRgb } from 'polished';

export const toRgbArray = color => Object.values(parseToRgb(color));
