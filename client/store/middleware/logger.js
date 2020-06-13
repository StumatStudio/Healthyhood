import { apiCallFailed } from '../entities/apiActions';

const logger = store => next => action => {
  if (action.type === 'error') return console.log(action.payload);
  if (action.type === apiCallFailed) return console.log(action.payload);

  return next(action);
};

export default logger;
