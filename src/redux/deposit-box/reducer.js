import { Record } from 'immutable';
import * as TYPES from './action-types';

export const DepositBoxState = new Record({
  savedPassword: '',
  password: '',
  lock: false,
  status: 'Ready',
  idle: true,
  serviceMode: false,
  sn: '9859111688',
  loading: false,
});

export function depositBoxReducer(state = new DepositBoxState(), { payload, type }) {
  switch (type) {
    case TYPES.ADD_KEY:
      return state.merge({
        password: !state.serviceMode && state.password.length === 6 ? state.password : state.password + payload,
        idle: false,
      });

    // States
    case TYPES.GO_IDLE_STATE:
      return state.merge({
        idle: true,
      });

    case TYPES.GO_TO_SERVICE_MODE:
      return state.merge({
        serviceMode: true,
        status: 'Service',
        password: '',
      });

    case TYPES.GO_ERROR_STATE:
      return state.merge({
        status: 'Error',
        password: '',
        loading: false,
      });

    //Validation
    case TYPES.VALIDATION_START:
      return state.merge({
        status: 'Validating',
        loading: true,
        password: '',
      });

    case TYPES.VALIDATION_SUCCESS:
      return state.merge({
        status: 'Ready',
        loading: false,
        lock: false,
        serviceMode: false,
        password: '',
        savedPassword: '',
      });

    case TYPES.VALIDATION_ERROR:
      return state.merge({
        status: 'Error',
        loading: false,
        password: '',
      });

    // Unlock Deposit
    case TYPES.UNLOCK_DEPOSIT_BOX:
      return state.merge({
        lock: true,
        status: 'Unlocking',
        password: '',
        loading: true,
      });

    case TYPES.UNLOCK_DEPOSIT_BOX_SUCCESS:
      return state.merge({
        lock: false,
        status: 'Ready',
        password: '',
        loading: false,
      });

    // Lock Deposit
    case TYPES.LOCK_DEPOSIT_BOX:
      return state.merge({
        lock: false,
        status: 'Locking',
        savedPassword: payload,
        password: '',
        loading: true,
      });

    case TYPES.LOCK_DEPOSIT_BOX_SUCCESS:
      return state.merge({
        lock: true,
        status: 'Ready',
        loading: false,
      });

    default:
      return state;
  }
}
