import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { Show } from "../models/show";
import { ShowService } from "./show.service";

@Injectable()
export class ShowResolver implements Resolve<Show> {

  constructor(private showService: ShowService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id: number = route.params['id'];
    return this.showService.getShow(id);
  }

}
