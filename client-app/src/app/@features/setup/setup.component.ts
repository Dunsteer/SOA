import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ErrorActions } from "@core/store/error/actions";
import { GeneralActions } from "@core/store/general/actions";
import { GeneralStateManager } from "@core/store/general/state";

@Component({
  selector: "app-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.scss"],
})
export class SetupComponent {
  constructor(private _store: Store) {}

  ngOnInit() {
  }
}
