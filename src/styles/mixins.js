import { css } from 'styled-components';
import tw from 'tailwind.macro';

const button = css`
  ${tw`flex justify-around items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
`;

const mixins = {
  button,
};

export default mixins;
