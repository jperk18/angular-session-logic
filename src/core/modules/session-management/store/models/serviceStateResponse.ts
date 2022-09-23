export interface ServiceStateResponse<TSuccess, TFailed> {
  success?: TSuccess
  failed?: TFailed
}
