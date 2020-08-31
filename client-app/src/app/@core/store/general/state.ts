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
import { Command } from '@core/models/command.model';
import { Sensor } from '@core/models/sensor.model';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
DeviceSettings | Earthquake | Command | Sensor
> {
  constructor(
    protected _toastr: ToastrService,
    private _deviceSettings: DeviceSettingsService,
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
    dataType: keyof GeneralState
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

  @Action(GeneralActions.UpdateCommand)
  updateCommand(
    ctx: StateContext<GeneralState>,
    action: GeneralActions.UpdateCommand
  ) {
    return this._deviceSettings.update(action.data).pipe(
      map(() => {
        this._toastr.success(`[UPDATE] Command`, "Success");
        return ctx.dispatch(new GeneralActions.FetchAllDeviceSettings({ page: 0, pageSize: 8 }));
      }),
      catchError((err) => {
        ctx.dispatch(
          new ErrorActions.Set({
            message: `Command not updated.`,
            type: `UPDATE_COMMAND_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }

  @Action(GeneralActions.UpdateSensor)
  updateSensor(
    ctx: StateContext<GeneralState>,
    action: GeneralActions.UpdateSensor
  ) {
    return this._deviceSettings.update(action.data).pipe(
      map(() => {
        this._toastr.success(`[UPDATE] Sensor`, "Success");
        return ctx.dispatch(new GeneralActions.FetchAllDeviceSettings({ page: 0, pageSize: 8 }));
      }),
      catchError((err) => {
        ctx.dispatch(
          new ErrorActions.Set({
            message: `Sensor not updated.`,
            type: `UPDATE_COMMAND_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }

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
