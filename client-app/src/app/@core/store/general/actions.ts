import { DeviceSettings } from "@core/models/device-settings.model";
import { Earthquake } from "@core/models/earthquake.model";
import { Page } from "@core/models/page.model";
import { Pager } from "@core/types/pager.type";
import { Sensor } from '@core/models/sensor.model';
import { Command } from '@core/models/command.model';

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

  export class UpdateSensor {
    public static type = "[GENERAL] Update sensor";
    constructor(public data: Sensor) {}
  }

  export class UpdateCommand {
    public static type = "[GENERAL] Update command";
    constructor(public data: Command) {}
  }
}
