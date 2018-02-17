import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {

   clone = function(source: any) {
      return JSON.parse(JSON.stringify(source));
   };

   mergeProperties = function(template: any, source: any) {
      for (let k in template) { template[k] = source[k]; }
      return template;
   };

   objectGetValues = function(target: any) {
      let source: any = [];
      for (let obj in target) {
         source.push(obj);
      }
      return source;
   };

   objectToList = function(originalObject: any): any[] {
      let result: any[] = [];
      for (let key in originalObject) {
         if (typeof originalObject[key] === 'object') {
            originalObject[key].key = key;
            result.push(originalObject[key]);
         } else {
            result.push({
               value: originalObject[key],
               key: key
            });
         }
      }
      return result;
   };

  getKeyFromValue = function(value: string, enumVal: any) {
      for (const key in enumVal) {
         if (enumVal[key] === value) {
            return key;
         }
      }
      return '';
   };

   getUnique = function(field: string, source: any) {
      let unique: any = {};
      let distinct: any[] = [];
      for (const i in source) {
         if (typeof (unique[source[i][field]]) === 'undefined') {
            distinct.push(source[i][field]);
         }
         unique[source[i][field]] = 0;
      }
      return distinct;
   };

   merge = (target: any, ...sources: any[]) => Object.assign(target, ...sources);

}
