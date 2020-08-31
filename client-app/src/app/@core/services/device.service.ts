import { Injectable } from "@angular/core";
import * as moment from "moment";
import { isNullOrUndefined } from "util";
import { BaseService } from "./base.service";
import { DeviceSettings } from "@core/models/device-settings.model";
import { HttpClient } from "@angular/common/http";
import { HelperService } from './helper.service';
import { Command } from '@core/models/command.model';
import { Sensor } from '@core/models/sensor.model';
@Injectable({
  providedIn: "root",
})
export class DeviceSettingsService extends BaseService<DeviceSettings | Command | Sensor> {
  constructor(protected _http: HttpClient, protected _helper: HelperService) {
    super("device/settings", []);
  }
}
