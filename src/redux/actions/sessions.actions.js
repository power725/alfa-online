import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getSessionsFailure: null,
    getSessionsRequest: null,
    getSessionsWithoutLoadingRequest:null,
    getSessionsSuccess: ['sessions'],
    deleteSession:   ['session']
});

export const SessionTypes = Types;
export const SessionCreators = Creators;
