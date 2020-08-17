import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "./helper.service";
import { Earthquake } from "@core/models/earthquake.model";
@Injectable({
  providedIn: "root",
})
export class AnalyticsService extends BaseService<Earthquake> {
  constructor(protected _http: HttpClient, protected _helper: HelperService) {
    super("analytics", []);
  }
}
