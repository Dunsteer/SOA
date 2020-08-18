import { Page } from '@core/models/page.model';

export type Pager<T>= {
    [P in keyof T]?: T[P]
} & Page;