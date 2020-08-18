import { DeviceSettings } from "@core/models/device-settings.model";
import { Earthquake } from "@core/models/earthquake.model";
import { Page } from "@core/models/page.model";
import { Pager } from "@core/types/pager.type";

export namespace GeneralActions {
  export class FetchAllDeviceSettings {
    public static type = "[GENERAL] Fetch all device settings";
    constructor(public search: Pager<DeviceSettings>) {}
  }

  export class FetchAllEarthquakes {
    public static type = "[GENERAL] Fetch all earthquakes";
    constructor(public search: Pager<Earthquake>) {}
  }

  export class FetchAllAnalytics {
    public static type = "[GENERAL] Fetch all analytics";
    constructor(public search: Pager<Earthquake>) {}
  }
}
