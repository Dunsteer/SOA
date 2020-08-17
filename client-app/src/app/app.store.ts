import { ErrorStateManager, ErrorState } from "@core/store/error/state";
import { GeneralStateManager, GeneralState } from "@core/store/general/state";

export const store = [ErrorStateManager, GeneralStateManager];

export type AppState = {
  general: GeneralState;
  error: ErrorState;
};
