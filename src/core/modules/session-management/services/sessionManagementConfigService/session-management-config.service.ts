import {InjectionToken} from "@angular/core";
import {SessionManagementConfig} from "./models/session-management.config"

export const SessionManagementConfigService = new InjectionToken<SessionManagementConfig>("SessionManagementConfig")
