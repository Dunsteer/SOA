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
    private _services: BaseService<T>[]
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
          patchObj[this._names[index] + "List"] = res.list;
          patchObj[this._names[index] + "Count"] = res.count;
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

  create(
    ctx: StateContext<State>,
    action: BaseActions.Create,
    index = 0
  ): Observable<AppState> {
    const state = ctx.getState();
    let patchObj = {};

    return this._services[index].create(action.data).pipe(
      map((res) => {
        if (res) {
          patchObj = {};
          patchObj[this._names[index] + "List"] = insertItem(res);
          patchObj[this._names[index] + "Count"] =
            state[this._names[index] + "Count"] + 1;
          patchObj[this._names[index]] = res;

          this._toastr.success(`[CREATE] ${this._names[index]}`, "Success");
          return ctx.setState(patch(patchObj));
        }
      }),
      catchError((err) => {
        ctx.dispatch(
          new ErrorActions.Set({
            message: `${this._names[index]} not created.`,
            type: `CREATE_${this._names[index].toUpperCase()}_FAILURE`,
            baseError: err,
          })
        );

        return of(null);
      })
    );
  }

  update(
    ctx: StateContext<State>,
    action: BaseActions.Update,
    index = 0
  ): Observable<AppState> {
    let patchObj = {};

    return this._services[index].update(action.id, action.changes).pipe(
      map((res) => {
        if (res) {
          patchObj = {};
          patchObj[this._names[index] + "List"] = updateItem(
            (c) => c[this._selectors[index]] === action.id,
            res
          );

          this._toastr.success(`[UPDATE] ${this._names[index]}`, "Success");
          return ctx.setState(patch(patchObj));
        }
      }),
      catchError((err) => {
        ctx.dispatch(
          new ErrorActions.Set({
            message: `${this._names[index]} not updated.`,
            type: `UPDATE_${this._names[index].toUpperCase()}_FAILURE`,
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

  alterState(
    where: string,
    selector: string = null
  ): {
    set: (
      ctx: StateContext<State>,
      action: BaseActions.Create,
      index: number
    ) => Observable<AppState>;
    insert: (
      ctx: StateContext<State>,
      action: BaseActions.Create,
      index: number
    ) => Observable<AppState>;
    update: (
      ctx: StateContext<State>,
      action: BaseActions.Update,
      index: number
    ) => Observable<AppState>;
    remove: (
      ctx: StateContext<State>,
      action: BaseActions.Delete,
      index: number
    ) => Observable<AppState>;
  } {
    return {
      set: (ctx, action, index: number = 0) => {
        const state = ctx.getState();

        return this._services[index].create(action.data).pipe(
          map((res) => {
            if (res) {
              let patchObj = JSON.parse(JSON.stringify(state));
              const parts = where.split(".");
              const prop = parts.pop();
              let parent = patchObj;
              parts.map((part) => {
                parent = parent[part];
              });
              parent[prop] = res;

              return ctx.setState(patchObj);
            }
          }),
          catchError((err) => {
            ctx.dispatch(
              new ErrorActions.Set({
                message: `${where} not set.`,
                type: `SET_${where.toUpperCase()}_FAILURE`,
                baseError: err,
              })
            );

            return of(null);
          })
        );
      },
      insert: (ctx, action, index: number = 0) => {
        const state = ctx.getState();

        return this._services[index].create(action.data).pipe(
          map((res) => {
            if (res) {
              let patchObj = JSON.parse(JSON.stringify(state));
              const parts = where.split(".");
              const prop = parts.pop();
              let parent = patchObj;
              parts.map((part) => {
                parent = parent[part];
              });
              (parent[prop] as T[]).push(res);

              return ctx.setState(patchObj);
            }
          }),
          catchError((err) => {
            ctx.dispatch(
              new ErrorActions.Set({
                message: `${where} not inserted.`,
                type: `INSERT_${where.toUpperCase()}_FAILURE`,
                baseError: err,
              })
            );

            return of(null);
          })
        );
      },
      update: (ctx, action, index: number = 0) => {
        const state = ctx.getState();

        return this._services[index].update(action.id, action.changes).pipe(
          map((res) => {
            if (res) {
              if (res) {
                let patchObj = JSON.parse(JSON.stringify(state));
                const parts = where.split(".");
                const prop = parts.pop();
                let parent = patchObj;
                parts.map((part) => {
                  parent = parent[part];
                });
                if (selector) {
                  let i = (parent[prop] as T[]).findIndex(
                    (x) => x[selector] == action.id
                  );

                  parent[prop][i] = res;
                } else {
                  console.error("No selector presented.");
                }

                return ctx.setState(patchObj);
              }
            }
          }),
          catchError((err) => {
            ctx.dispatch(
              new ErrorActions.Set({
                message: `${where} not updated.`,
                type: `UPDATE_${where.toUpperCase()}_FAILURE`,
                baseError: err,
              })
            );

            return of(null);
          })
        );
      },
      remove: (ctx, action, index: number = 0) => {
        const state = ctx.getState();

        return this._services[index].delete(action.id).pipe(
          map((res) => {
            if (res) {
              let patchObj = JSON.parse(JSON.stringify(state));
              const parts = where.split(".");
              const prop = parts.pop();
              let parent = patchObj;
              parts.map((part) => {
                parent = parent[part];
              });
              if (selector) {
                parent[prop] = (parent[prop] as T[]).filter(
                  (x) => x[selector] != action.id
                );
              } else {
                console.error("No selector presented.");
              }
              return ctx.setState(patchObj);
            }
          }),
          catchError((err) => {
            ctx.dispatch(
              new ErrorActions.Set({
                message: `${where} not removed.`,
                type: `REMOVE_${where.toUpperCase()}_FAILURE`,
                baseError: err,
              })
            );

            return of(null);
          })
        );
      },
    };
  }
}
