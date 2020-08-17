import { State, Action, StateContext, Selector } from "@ngxs/store";
import { ErrorActions } from "@store/error/actions";
import { Error } from "@core/models/error.model";
import { ToastrService } from "ngx-toastr";
import { GeneralActions } from "./actions";

export interface GeneralState {}

const initialState: GeneralState = {};

@State<GeneralState>({
  name: "general",
  defaults: initialState,
})
export class GeneralStateManager {
  constructor() {}

  @Selector()
  static state(state: GeneralState) {
    return state;
  }

  @Action(GeneralActions.GetDevices)
  set(ctx: StateContext<GeneralState>, action: GeneralActions.GetDevices) {
    //ctx.patchState({ error: action.error });
  }
}
