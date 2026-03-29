import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn:'root'
})
export class DashboardService{

API="http://localhost:8080/api/dashboard"

constructor(private http:HttpClient){}

getStats(){

return this.http.get(this.API)

}

}