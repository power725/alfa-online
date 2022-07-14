import { createReducer } from 'reduxsauce'
import { SessionTypes as Types  } from '../actions';
import storeInitialState from '../store/initial-state';
export const INITIAL_STATE = storeInitialState.sessions;
export const getSessionsFailure = (state, action) => ({
    ...state,
    loading:false,
    error:true,
    loadingEmulator:false,
})

export const getSessionsRequest = (state, action) => ({
    ...state,
    loading:true,
    error:undefined
})
export const getSessionsWithoutLoadingRequest = (state, action) => ({
    ...state,
    loadingEmulator:true,
    error:undefined
})

export const getSessionsSuccess = (state, {sessions}) => ({
    devices: sessions,
    loading:false,
    loadingEmulator:false,
    error:undefined
})

export const HANDLERS = {
    [Types.GET_SESSIONS_FAILURE]:     getSessionsFailure,
    [Types.GET_SESSIONS_REQUEST]:     getSessionsRequest,
    [Types.GET_SESSIONS_WITHOUT_LOADING_REQUEST]:     getSessionsWithoutLoadingRequest,
    [Types.GET_SESSIONS_SUCCESS]:     getSessionsSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS);
