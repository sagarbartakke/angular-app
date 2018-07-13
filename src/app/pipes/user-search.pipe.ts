import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users$: any, q: any): any {
    if (q == undefined) {
      return users$;
    } else {
      return users$.filter(function (user) {
        return user.name.toLowerCase().includes(q.toLowerCase());
      })
    }
  }

}
