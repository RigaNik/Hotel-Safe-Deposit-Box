import * as TYPES from './action-types';
import * as axios from 'axios';
import env from '../../app/env';
import globals from '../../app/consts/conf';

export const validateMasterCode = (password, serialNumber) => {
  return dispatch => {
    dispatch(validationStartAction());
    axios
      .get(`${env.validationRoute}?code=${password}`)
      .then(response => {
        setTimeout(() => {
          if (response.sn === serialNumber) {
            dispatch(validatedSuccessAction());
          } else {
            dispatch(validatedErrorAction());
          }
        }, globals.serviceValidationTimeout);
      })
      .catch(() => {
        dispatch(validatedErrorAction());
      });
  };
};

export const locking = password => {
  return dispatch => {
    dispatch(lockDepositBoxAction(password));
    setTimeout(() => {
      dispatch(lockDepositBoxSuccessAction());
    }, globals.mechanicalValidationTimeout);
  };
};

export const unlocking = (savedPassword, password) => {
  return dispatch => {
    dispatch(unlockDepositBoxAction());
    setTimeout(() => {
      if (savedPassword === password) {
        dispatch(unlockDepositBoxSuccessAction());
      } else {
        dispatch(goErrorStateAction());
      }
    }, globals.mechanicalValidationTimeout);
  };
};

export const addKeyAction = data => {
  return {
    type: TYPES.ADD_KEY,
    payload: data,
  };
};

export const goToServiceModeAction = () => {
  return {
    type: TYPES.GO_TO_SERVICE_MODE,
  };
};

export const goIdleAction = () => {
  return {
    type: TYPES.GO_IDLE_STATE,
  };
};

export const validationStartAction = () => {
  return {
    type: TYPES.VALIDATION_START,
  };
};

export const validatedSuccessAction = () => {
  return {
    type: TYPES.VALIDATION_SUCCESS,
  };
};

export const validatedErrorAction = () => {
  return {
    type: TYPES.VALIDATION_ERROR,
  };
};

export const goErrorStateAction = () => {
  return {
    type: TYPES.GO_ERROR_STATE,
  };
};

export const lockDepositBoxAction = password => {
  return {
    type: TYPES.LOCK_DEPOSIT_BOX,
    payload: password,
  };
};

export const lockDepositBoxSuccessAction = () => {
  return {
    type: TYPES.LOCK_DEPOSIT_BOX_SUCCESS,
  };
};

export const unlockDepositBoxAction = () => {
  return {
    type: TYPES.UNLOCK_DEPOSIT_BOX,
  };
};

export const unlockDepositBoxSuccessAction = () => {
  return {
    type: TYPES.UNLOCK_DEPOSIT_BOX_SUCCESS,
  };
};
