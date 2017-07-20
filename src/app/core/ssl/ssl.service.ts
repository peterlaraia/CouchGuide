import { Injectable } from '@angular/core';

@Injectable()
export class SslService {

  toHttps(httpString: string): string {
    return httpString.replace('http://', 'https://');
  }

}
