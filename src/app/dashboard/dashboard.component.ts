import { Component, OnInit } from '@angular/core';
import { apiService } from '../api.service';
import { FormControl,FormGroup } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../app.component.css']
})
export class DashboardComponent implements OnInit {

  ColumnMode = ColumnMode;
  rows = [
    // { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ name: 'link' },
   { name: 'title' }, { name: 'score' }];
  
  
  public dashboardForm = new FormGroup({
      page : new FormControl(''),
      pageSize : new FormControl(''),
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      order : new FormControl(''),
      min : new FormControl(''),
      max : new FormControl(''),
      sort : new FormControl(''),
      quesIds : new FormControl(''),
  });

  public order:string='';
  public sort:string='';
  quesIds:string='';
  parameters:string='';
  public value:string="";
  constructor(public apiService : apiService){ }

  selectChangeHandler(event:any){
    this.order = event.target.value; 
  }
  selectChangeSort(eve:any){
    this.sort = eve.target.value;
  }

  ngOnInit(): void {

    // this.value = "2.3/questions?&sort=activity&site=stackoverflow";
    this.value= "/2.3/questions?"+this.parameters+"site=stackoverflow"
    
    this.apiService.getDashboardDetails(this.value).subscribe((data:any) =>{
      console.log(data);
      this.rows = data.items;
    });
  }

  onsubmit(){
    let fDate = new Date((this.dashboardForm.get('fromDate')?.value))
    var fD = String(fDate.getTime()).substr(0,10);
    var date = new Date(1627218483);
    let tDate = new Date((this.dashboardForm.get('toDate')?.value))
    var tD = String(tDate.getTime()).substring(0,10);
    
    console.log(date);
    console.log(fD);
    console.log(tD);

    this.parameters='';
    this.quesIds = (this.dashboardForm.get('quesIds')?.value)?("/"+this.dashboardForm.get('quesIds')?.value):'';
    this.parameters += (this.dashboardForm.get('page')?.value)?("page="+this.dashboardForm.get('page')?.value+"&"):'';
    this.parameters += (this.dashboardForm.get('pageSize')?.value)?("pagesize="+this.dashboardForm.get('pageSize')?.value+"&"):'';
    this.parameters += (this.dashboardForm.get('fromDate')?.value)?("fromdate="+fD+"&"):''
    this.parameters += (this.dashboardForm.get('toDate')?.value)?("todate="+tD+"&"):''
    this.parameters += this.order?("order="+this.order+"&"):''
    this.parameters += (this.dashboardForm.get('min')?.value)?("min="+this.dashboardForm.get('min')?.value+"&"):''
    this.parameters += (this.dashboardForm.get('max')?.value)?("max="+this.dashboardForm.get('max')?.value+"&"):''
    this.parameters += this.sort?("sort="+this.sort+"&"):''

    this.value= "/2.3/questions"+this.quesIds+"?"+this.parameters+"site=stackoverflow"
    console.log(this.value);

    this.apiService.getDashboardDetails(this.value).subscribe((data:any) =>{
     
      this.rows = data.items;
      console.log(data)
    },(error)=>{
      console.log('error caught in component:',error);

    });
  }

}
