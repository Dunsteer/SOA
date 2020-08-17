import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { GeneralActions } from "@core/store/general/actions";
import { GeneralStateManager } from "@core/store/general/state";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"],
})
export class DataComponent {
  constructor(private _store: Store) {}

  @Select(GeneralStateManager.data("deviceSettings")) deviceSettings$;

  ngOnInit() {
    this._store.dispatch(new GeneralActions.FetchAllDeviceSettings({}));
  }
}
