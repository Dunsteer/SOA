import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { ErrorActions } from "@core/store/error/actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "client-app";

  constructor(private _store: Store) {}

  ngOnInit() {
    this._store.dispatch(
      new ErrorActions.Set({
        message: "Test",
        type: "TEST TYPE",
        baseError: null,
      })
    );
  }
}
