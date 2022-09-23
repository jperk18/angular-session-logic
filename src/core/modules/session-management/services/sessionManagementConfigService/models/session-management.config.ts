export interface SessionManagementConfig {
  timerIntervalCheckInMilliseconds: number
  extendSessionRangeInMinutes: number
  refreshBufferInSeconds: number
  loginOrRootPagePath: string
  landingPagePath: string
}
