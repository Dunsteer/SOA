import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { GeneralActions } from "@core/store/general/actions";
import { GeneralStateManager } from "@core/store/general/state";
import { Observable } from "rxjs";
import { DeviceSettings } from "@core/models/device-settings.model";
import { Earthquake } from "@core/models/earthquake.model";
import { DeviceSettingsService } from '@core/services/device.service';

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"],
})
export class DataComponent {
  heading = "Earthquake monitoring";
  tab: "earthquakes" | "deviceSettings" | "analytics" = "earthquakes";
  constructor(private _store: Store, private _deviceSettings: DeviceSettingsService) { }

  page = 1;
  pageSize = 8;

  @Select(GeneralStateManager.data("deviceSettingsList"))
  deviceSettings$: Observable<DeviceSettings[]>;
  @Select(GeneralStateManager.data("deviceSettingsCount"))
  deviceSettingsCount$: Observable<number>;
  @Select(GeneralStateManager.data("deviceSettingsLoading"))
  deviceSettingsLoading$: Observable<boolean>;

  @Select(GeneralStateManager.data("earthquakeList"))
  earthquakes$: Observable<Earthquake[]>;
  @Select(GeneralStateManager.data("earthquakeCount"))
  earthquakeCount$: Observable<number>;
  @Select(GeneralStateManager.data("earthquakeLoading"))
  earthquakeLoading$: Observable<boolean>;

  @Select(GeneralStateManager.data("analyticsList"))
  analytics$: Observable<Earthquake[]>;
  @Select(GeneralStateManager.data("analyticsCount"))
  analyticsCount$: Observable<number>;
  @Select(GeneralStateManager.data("analyticsLoading"))
  analyticsLoading$: Observable<boolean>;

  ngOnInit() {
    this.fetchEarthquakes();
  }

  changeTab(tab: "earthquakes" | "deviceSettings" | "analytics") {
    this.tab = tab;
    this.changePage(1);
  }

  changePage(page: number) {
    this.page = page;
    if (this.tab == "earthquakes") {
      this.fetchEarthquakes();
    }

    if (this.tab == "deviceSettings") {
      this.fetchDeviceSettings();
    }

    if (this.tab == "analytics") {
      this.fetchAnalytics();
    }
  }

  fetchEarthquakes() {
    this._store.dispatch(
      new GeneralActions.FetchAllEarthquakes({
        page: this.page,
        pageSize: this.pageSize,
      })
    );
  }

  fetchDeviceSettings() {
    this._store.dispatch(
      new GeneralActions.FetchAllDeviceSettings({
        page: this.page,
        pageSize: this.pageSize,
      })
    );
  }

  fetchAnalytics() {
    this._store.dispatch(
      new GeneralActions.FetchAllAnalytics({
        page: this.page,
        pageSize: this.pageSize,
      })
    );
  }

  newCommand(deviceId, comm, params) {
    this._store.dispatch(
      new GeneralActions.UpdateCommand({
        comm, params, deviceId
      })
    );
  }

  newSensor(deviceId, interval) {
    this._store.dispatch(
      new GeneralActions.UpdateSensor(
        { deviceId, settings: { interval } }
      )
    );
  }
}
