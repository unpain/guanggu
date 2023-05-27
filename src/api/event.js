/** @format */

import { opInfo } from './request';

const getAllEvent = () => {
  return opInfo({
   url:`/event`,
   method:'GET'
  });
};

export { getAllEvent };
