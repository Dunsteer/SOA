import { DeviceSettings } from '@core/models/device-settings.model';

export namespace GeneralActions {
  export class FetchAllDeviceSettings {
    public static type = "[GENERAL] Fetch all device settings";
    constructor(public search: DeviceSettings) {}
  }
}
