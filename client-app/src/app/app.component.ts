import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ErrorActions } from "@core/store/error/actions";
import { GeneralActions } from "@core/store/general/actions";
import { GeneralStateManager } from "@core/store/general/state";
import { SocketService } from '@core/services/socket.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  heading = "Earthquake monitoring";

  constructor(socket: SocketService) {
    
  }
}
