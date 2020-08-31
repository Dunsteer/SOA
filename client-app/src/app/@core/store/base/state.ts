import { StateContext } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";
import { ErrorActions } from "@store/error/actions";
import { BaseActions } from "@core/store/base/actions";
import { of, Observable } from "rxjs";
import {
  insertItem,
  patch,
  updateItem,
  removeItem,
} from "@ngxs/store/operators";
import { BaseService } from "@core/services/base.service";
import { AppState } from "src/app/app.store";
import { ToastrService } from "ngx-toastr";

export class BaseStateManager<State, T> {
  protected _toastr: ToastrService;

  constructor(
    private _names: string[],
    private _selectors: string[],
    protected _services: BaseService<T>[]
  ) {}

  fetchAll(
    ctx: StateContext<State>,
    action: BaseActions.FetchAll,
    index = 0
  ): Observable<AppState> {
    let patchObj = {};
    patchObj[this._names[index] + "Loading"] = true;
    ctx.patchState(patchObj);

    return this._services[index].getAll(action.search).pipe(
      map((res) => {
        if (res) {
          patchObj = {};
          patchObj[this._names[index] + "List"] = res.rows;
          patchObj[this._names[index] + "Count"] = res.total;
          patchObj[this._names[index] + "Loading"] = false;
          return ctx.patchState(patchObj);
        }
      }),
      catchError((err) => {
        patchObj = {};
        patchObj[this._names[index] + "Loading"] = false;
        ctx.patchState(patchObj);

        ctx.dispatch(
          new ErrorActions.Set({
            message: `${this._names[index]} list not fetched.`,
            type: `FETCH_${this._names[index].toUpperCase()}_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }

  fetch(
    ctx: StateContext<State>,
    action: BaseActions.Fetch,
    index = 0
  ): Observable<AppState> {
    let patchObj = {};
    patchObj[this._names[index] + "Loading"] = true;
    ctx.patchState(patchObj);

    return this._services[index].get(action.id).pipe(
      map((res) => {
        if (res) {
          patchObj = {};
          patchObj[this._names[index]] = res;
          patchObj[this._names[index] + "Loading"] = false;
          return ctx.patchState(patchObj);
        }
      }),
      catchError((err) => {
        patchObj = {};
        patchObj[this._names[index] + "Loading"] = false;
        ctx.patchState(patchObj);

        ctx.dispatch(
          new ErrorActions.Set({
            message: `${this._names[index]} not fetched.`,
            type: `FETCH_${this._names[index].toUpperCase()}_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }

  delete(
    ctx: StateContext<State>,
    action: BaseActions.Delete,
    index = 0
  ): Observable<AppState> {
    const state = ctx.getState();
    let patchObj = {};

    return this._services[index].delete(action.id).pipe(
      map((res) => {
        if (res) {
          patchObj = {};
          patchObj[this._names[index] + "List"] = removeItem<T>(
            (c) => c[this._selectors[index]] === action.id
          );
          patchObj[this._names[index] + "Count"] =
            state[this._names[index] + "Count"] - 1;
          this._toastr.success(`[DELETE] ${this._names[index]}`, "Success");
          return ctx.setState(patch(patchObj));
        }
      }),
      catchError((err) => {
        ctx.dispatch(
          new ErrorActions.Set({
            message: `${this._names[index]} not deleted.`,
            type: `DELETE_${this._names[index].toUpperCase()}_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }
}
