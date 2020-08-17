export interface Earthquake {
  depth?: number;
  depthError?: number;
  dmin?: number;
  gap?: number;
  horizontalError?: number;
  id?: string;
  latitude?: number;
  locationSource?: string;
  longitude?: number;
  mag?: number;
  magError?: number;
  magNst?: number;
  magSource?: string;
  magType?: string;
  net?: string;
  nst?: number;
  place?: string;
  rms?: number;
  status?: string;
  time?: Date;
  type?: string;
  updated?: Date;
}
