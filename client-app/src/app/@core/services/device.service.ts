import { Injectable } from "@angular/core";
import * as moment from "moment";
import { isNullOrUndefined } from "util";
import { BaseService } from "./base.service";
import { DeviceSettings } from "@core/models/device-settings.model";
import { HttpClient } from "@angular/common/http";
import { HelperService } from './helper.service';
@Injectable({
  providedIn: "root",
})
export class DeviceSettingsService extends BaseService<DeviceSettings> {
  constructor(protected _http: HttpClient, protected _helper: HelperService) {
    super("device/settings", []);
  }
}
