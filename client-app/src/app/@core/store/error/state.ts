import { State, Action, StateContext, Selector } from "@ngxs/store";
import { ErrorActions } from "@store/error/actions";
import { Error } from "@core/models/error.model";
import { ToastrService } from "ngx-toastr";
import { Injectable } from '@angular/core';

export interface ErrorState {
  error: Error;
}

const initialState: ErrorState = {
  error: null,
};

@Injectable({providedIn: 'root'})
@State<ErrorState>({
  name: "error",
  defaults: initialState,
})
export class ErrorStateManager {
  constructor(private _toastr: ToastrService) {}

  @Selector()
  static state(state: ErrorState) {
    return state;
  }

  @Action(ErrorActions.Set)
  set(ctx: StateContext<ErrorState>, action: ErrorActions.Set) {
    ctx.patchState({ error: action.error });

    this._toastr.error(action.error.message, `ERROR ${action.error.type}`);
  }

  @Action(ErrorActions.Reset)
  reset(ctx: StateContext<ErrorState>, action: ErrorActions.Reset) {
    ctx.patchState({ error: null });
  }
}
