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

  getAll(search: T): Observable<{ list: T[]; count: number }> {
    return this._http.get<{
      list: T[];
      count: number;
    }>(`${environment.apiURL}/api/${this._entity}`, {
      params: this._helper.objectToUrlParams(search),
    });
  }

  create(data: T): Observable<T> {
    return this._http.post<T>(
      `${environment.apiURL}/api/${this._entity}`,
      data
    );
  }

  update(id: number | string, data: T): Observable<T> {
    const patch = this._helper.generatePatch(data, this._PATCHABLE);
    return this._http.patch<T>(
      `${environment.apiURL}/api/${this._entity}/${id}`,
      patch
    );
  }

  delete(id: number | string): Observable<T> {
    return this._http.delete<T>(
      `${environment.apiURL}/api/${this._entity}/${id}`
    );
  }
}
