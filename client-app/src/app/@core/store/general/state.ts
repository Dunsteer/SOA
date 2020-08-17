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
import { Injectable } from '@angular/core';

export interface GeneralState {
  deviceSettings: DeviceSettings[];
  deviceSettingsCount: number;
  deviceSettingsLoading: boolean;
}

const initialState: GeneralState = {
  deviceSettings: [],
  deviceSettingsCount: 0,
  deviceSettingsLoading: false,
};

enum eGeneralStateIndex {
  "deviceSettings" = 0,
}

@Injectable({providedIn: 'root'})
@State<GeneralState>({
  name: "general",
  defaults: initialState,
})
export class GeneralStateManager extends BaseStateManager<
  GeneralState,
  DeviceSettings
> {
  constructor(_deviceSettings: DeviceSettingsService) {
    super(["deviceSettings"], ["id"], [_deviceSettings]);
  }

  static data(
    dataType: "deviceSettings" | "deviceSettingsCount" | "deviceSettingsLoading"
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
}
