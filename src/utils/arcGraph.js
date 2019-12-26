export const toCoordinatesArray = ({ latitude, longitude }) => [longitude, latitude].map(Number);

export const extractCoordinates = type => ({ [type]: { latitude, longitude } }) =>
  toCoordinatesArray({ latitude, longitude });

const extractData = ({ isSource = true, object }) => object[isSource ? 'startNode' : 'stopNode'];

export const getCursor = () => 'crosshair';

export const setOnHover = action => ({ object: data, x, y }) => action({ data, x, y });
export const setOnHoverNode = action => ({ isSource = true }) => ({ object: data, x, y }) =>
  action({ isSource, data, x, y });

const find = target => ({ id }) => id === target;
const remove = target => ({ id }) => id !== target;

export const setOnClickNode = action => ({ isSource = true }) => ({ object }) =>
  action(selected => {
    const node = extractData({ isSource, object });
    const { id: target } = node;
    return selected.find(find(target)) ? selected.filter(remove(target)) : [...selected, node];
  });

export default {
  toCoordinatesArray,
  setOnClickNode,
  setOnHover,
  setOnHoverNode,
  extractCoordinates,
  getCursor,
};
