import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  generatePatch(model, allowed = []) {
    if (!allowed || allowed.length === 0) {
      allowed = Object.keys(model);
    }

    const changed = Object.keys(model).filter(key => allowed.includes(key));

    const obj = [];
    changed.map(x => obj.push({ op: 'replace', path: `/${x}`, value: model[x] }));

    return obj;
  }

  objectToUrlParams(obj) {
    const urlParams = {};
    for (const x in obj) {
      if (!isNullOrUndefined(obj[x])) {
        if (obj[x] instanceof Date) {
          urlParams[x] = obj[x].toISOString();
        } else {
          if (moment.isMoment(obj[x])) {
            urlParams[x] = new Date(obj[x]).toISOString();
          } else {
            urlParams[x] = obj[x];
          }
        }
      }
    }

    return urlParams;
  }

  sortList(array, ascending, memberName) {
    let sortedList = [...array];
    const nameParts = memberName.split('.');

    sortedList = sortedList.sort((a, b) => {
      let x = a,
        y = b;
      for (const part of nameParts) {
        x = x[part];
        y = y[part];
      }

      if (ascending) {
        if (x > y) {
          return 1;
        } else if (x < y) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (x < y) {
          return 1;
        } else if (x > y) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    return sortedList;
  }
}
