
// Module for all session management
export * from "./session-management.module"

//Service Interfaces and models and module configuration for implementation from outside for setup
export {AuthenticationService} from "./services/authentication/authentication.service"
export * from "./services/authentication/models"

export * from "./services/sessionManagementConfigService/session-management-config.service"

//State for outside module use
export {State as State} from "./store/reducers/session.reducer";

//Selectors for outside module use
export * as Selectors from './store/selectors/session.selectors'

//Actions for outside module use
import {Login, LogOut, RefreshSession} from "./store/actions/session.actions";
export const Actions = { Login, LogOut, RefreshSession }

//Actions for outside module use for (SAML) auth this module
import {LoginSuccess} from "./store/actions/session.actions";
export const AlternativeActions = { LoginSuccess }