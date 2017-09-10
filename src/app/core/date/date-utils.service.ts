import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilsService {

  private readonly MS_P_MIN: number = 60000;
  
  dateFromTimezoneOffset(from: Date): Date {
    return new Date(from.getTime() - (from.getTimezoneOffset() * this.MS_P_MIN));
  }

}
