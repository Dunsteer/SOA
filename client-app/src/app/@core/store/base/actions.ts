export namespace BaseActions {
  export abstract class Fetch {
    constructor(public id: number | string) {}
  }

  export abstract class FetchAll {
    constructor(public search: any = {}) {}
  }

  export class Create {
    constructor(public data: any) {}
  }

  export class Update {
    constructor(public id: number | string, public changes: any) {}
  }

  export class Delete {
    constructor(public id: number | string) {}
  }
}