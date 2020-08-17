import { HttpErrorResponse } from '@angular/common/http';

export interface Error {
    type: string;
    message: string;
    baseError?: HttpErrorResponse;
}
