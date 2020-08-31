import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HelperService } from "./helper.service";

export abstract class BaseService<T> {
  protected _http: HttpClient;
  protected _helper: HelperService;
  constructor(
    private _entity: string,
    private _PATCHABLE: string[],
  ) {}

  get(id: number | string): Observable<T> {
    return this._http.get<T>(`${environment.apiURL}/api/${this._entity}/${id}`);
  }

  getAll(search: T): Observable<{ rows: T[]; total: number }> {
    return this._http.get<{
      rows: T[];
      total: number;
    }>(`${environment.apiURL}/api/${this._entity}`, {
      params: this._helper.objectToUrlParams(search),
    });
  }

  update(data: T): Observable<T> {
    return this._http.post<T>(
      `${environment.apiURL}/api/${this._entity}`,
      data
    );
  }

  delete(id: number | string): Observable<T> {
    return this._http.delete<T>(
      `${environment.apiURL}/api/${this._entity}/${id}`
    );
  }
}
