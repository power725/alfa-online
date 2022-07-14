import { SessionCreators } from '../actions/sessions.actions';
import * as WebService from '@web-services';

export const getSessions = () => (dispatch,getState) => {
    const { user: { authToken } } = getState();

    dispatch(SessionCreators.getSessionsRequest());
    return WebService.getDevices(authToken)
        .then(response => {
            dispatch(SessionCreators.getSessionsSuccess(response.data.Sessions));
            return response;
        })
        .catch(error => {
            dispatch(SessionCreators.getSessionsFailure());
        });

}
export const deleteSession = (session) => (dispatch,getState) => {
    const { user: { authToken } } = getState();
    dispatch(SessionCreators.getSessionsRequest());
    return WebService.deleteDevice(authToken,session)
        .then(()=>{
            return WebService.getDevices(authToken)
                .then(response => {
                    dispatch(SessionCreators.getSessionsSuccess(response.data.Sessions));
                    return response;
                })
                .catch(error => {
                    dispatch(SessionCreators.getSessionsFailure());
                });
        }).catch(error => {
        dispatch(SessionCreators.getSessionsFailure());
    });
}
export const deleteSessionWithoutLoading = (session) => (dispatch,getState) => {
    const { user: { authToken } } = getState();
    dispatch(SessionCreators.getSessionsWithoutLoadingRequest());
    return WebService.deleteDevice(authToken,session)
        .then(()=>{
            return WebService.getDevices(authToken)
                .then(response => {
                    dispatch(SessionCreators.getSessionsSuccess(response.data.Sessions));
                })
                .catch(error => {
                    dispatch(SessionCreators.getSessionsFailure());
                });
        }).catch(error => {
            dispatch(SessionCreators.getSessionsFailure());
        });
}
