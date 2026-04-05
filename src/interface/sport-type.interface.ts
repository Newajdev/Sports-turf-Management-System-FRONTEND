import { IBase } from "./user.interface";
import { ITurf } from "./turf.interface";

export interface ISportType extends IBase {
  title: string;
  icon: string;

  turfs?: ITurf[];
}
