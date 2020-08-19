import { Injectable } from "@angular/core";
import socketIO from "socket.io-client";
import { ToastrService } from "ngx-toastr";
import { Earthquake } from "@core/models/earthquake.model";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(_toastr: ToastrService) {
    const io = socketIO("localhost:3000");
    io.on("magnitude-alert", (data: Earthquake) => {
      _toastr.error(`${data.type} ${data.place} Mag: ${data.mag}`, "Magnitude alert");
    });
  }
}
