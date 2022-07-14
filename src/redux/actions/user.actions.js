import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  startAuthenticationFailure:   null,
  startAuthenticationRequest:   ['authParams'],
  startAuthenticationSuccess:   ['authResponse'],
  authenticationSuccess:        ['authResponse'],
  setUser:                      ['user'],
  setSettings:                  ['settings'],
  updateProfile:                ['profile'],
  setActiveProfile:             ['activeProfile'],
  logout: null,
})

export const UserTypes = Types
export default Creators
