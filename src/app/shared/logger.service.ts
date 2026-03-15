import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LogLevel } from './log-level';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private level = environment.logLevel;

  debug(message: any, ...optional: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(message, ...optional);
    }
  }

  info(message: any, ...optional: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.info(message, ...optional);
    }
  }

  warn(message: any, ...optional: any[]) {
    if (this.level <= LogLevel.WARN) {
      console.warn(message, ...optional);
    }
  }

  error(message: any, ...optional: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error(message, ...optional);
    }
  }

}