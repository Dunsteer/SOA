import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector,
} from "@ngxs/store";
import { ErrorActions } from "@store/error/actions";
import { Error } from "@core/models/error.model";
import { ToastrService } from "ngx-toastr";
import { GeneralActions } from "./actions";
import { BaseStateManager } from "../base/state";
import { DeviceSettings } from "@core/models/device-settings.model";
import { DeviceSettingsService } from "@core/services/device.service";
import { Injectable } from "@angular/core";
import { Earthquake } from "@core/models/earthquake.model";
import { EarthquakeService } from "@core/services/earthquake.service";
import { AnalyticsService } from "@core/services/analytics.service";

export interface GeneralState {
  deviceSettingsList: DeviceSettings[];
  deviceSettingsCount: number;
  deviceSettingsLoading: boolean;

  earthquakeList: Earthquake[];
  earthquakeCount: number;
  earthquakeLoading: boolean;

  analyticsList: Earthquake[];
  analyticsCount: number;
  analyticsLoading: boolean;
}

const initialState: GeneralState = {
  deviceSettingsList: [],
  deviceSettingsCount: 0,
  deviceSettingsLoading: false,

  earthquakeList: [],
  earthquakeCount: 0,
  earthquakeLoading: false,

  analyticsList: [],
  analyticsCount: 0,
  analyticsLoading: false,
};

enum eGeneralStateIndex {
  deviceSettings = 0,
  earthquake,
  analytics,
}

@Injectable({ providedIn: "root" })
@State<GeneralState>({
  name: "general",
  defaults: initialState,
})
export class GeneralStateManager extends BaseStateManager<
  GeneralState,
  DeviceSettings | Earthquake
> {
  constructor(
    protected _toastr: ToastrService,
    _deviceSettings: DeviceSettingsService,
    _earthquake: EarthquakeService,
    _analytics: AnalyticsService
  ) {
    super(
      ["deviceSettings", "earthquake", "analytics"],
      ["id", "id", "id"],
      [_deviceSettings, _earthquake, _analytics]
    );
  }

  static data(
    dataType:
      | "deviceSettingsList"
      | "deviceSettingsCount"
      | "deviceSettingsLoading"
      | "earthquakeList"
      | "earthquakeCount"
      | "earthquakeLoading"
      | "analyticsList"
      | "analyticsCount"
      | "analyticsLoading"
  ) {
    return createSelector([GeneralStateManager], (state: GeneralState) => {
      return state[dataType];
    });
  }

  @Selector()
  static state(state: GeneralState) {
    return state;
  }

  @Action(GeneralActions.FetchAllDeviceSettings)
  fetchAllDeviceSettings(
    ctx: StateContext<GeneralState>,
    action: GeneralActions.FetchAllDeviceSettings
  ) {
    return super.fetchAll(ctx, action, eGeneralStateIndex.deviceSettings);
  }

  //   @Action(GeneralActions.CreateDeviceSettings)
  //   createDeviceSettings(
  //     ctx: StateContext<GeneralState>,
  //     action: GeneralActions.CreateDeviceSettings
  //   ) {
  //     return super.create(ctx, action, eGeneralStateIndex.deviceSettings);
  //   }

  //   @Action(GeneralActions.UpdateDeviceSettings)
  //   updateDeviceSettings(
  //     ctx: StateContext<GeneralState>,
  //     action: GeneralActions.UpdateDeviceSettings
  //   ) {
  //     return super.update(ctx, action, eGeneralStateIndex.deviceSettings);
  //   }

  //   @Action(GeneralActions.DeleteDeviceSettings)
  //   deleteDeviceSettings(
  //     ctx: StateContext<GeneralState>,
  //     action: GeneralActions.DeleteDeviceSettings
  //   ) {
  //     return super.delete(ctx, action, eGeneralStateIndex.deviceSettings);
  //   }

  @Action(GeneralActions.FetchAllEarthquakes)
  fetchAllData(
    ctx: StateContext<GeneralState>,
    action: GeneralActions.FetchAllEarthquakes
  ) {
    return super.fetchAll(ctx, action, eGeneralStateIndex.earthquake);
  }

  @Action(GeneralActions.FetchAllAnalytics)
  fetchAllAnalytics(
    ctx: StateContext<GeneralState>,
    action: GeneralActions.FetchAllAnalytics
  ) {
    return super.fetchAll(ctx, action, eGeneralStateIndex.analytics);
  }
}
