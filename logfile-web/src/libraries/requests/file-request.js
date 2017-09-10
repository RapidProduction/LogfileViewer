import { isNil } from 'lodash';

const endpoint = 'http://localhost:9001/api/logfile/';
export const formGetFileRequest = (filename, index, offset) => {
  if(isNil(index) || isNil(offset)) {
    return `${endpoint}${filename}`;
  }
  return `${endpoint}${filename}?index=${index}&offset=${offset}`;
};