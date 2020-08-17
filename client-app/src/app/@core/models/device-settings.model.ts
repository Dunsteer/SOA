import { Command } from "./command.model";

export interface DeviceSettings {
  id?: number;
  type?: "sensor" | "actuator";
  interval?: number;
  commands?: Command[];
}
