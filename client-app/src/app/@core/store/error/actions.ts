import { Error } from '@core/models/error.model';

export namespace ErrorActions {
    export class Set {
        static readonly type = '[ERROR] Set';

        constructor(public error: Error) { }
    }

    export class Reset {
        static readonly type = '[ERROR] Reset';
    }
}
