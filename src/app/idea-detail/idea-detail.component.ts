import { Component, OnInit } from '@angular/core';
import { RecentIdeasService } from '../recent-ideas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.scss']
})
export class IdeaDetailComponent implements OnInit {
ideaDetail:any=[];
appliedSP:any=[];
status:boolean=false;
  constructor(private recentideas: RecentIdeasService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDetails();
    this.getAppliedServiceProvider();
  }

  getDetails():any{
    const title=this.route.snapshot.paramMap.get('title');
    this.recentideas.getIdeaDetails(title).subscribe((data:any)=>{
      console.log("data fetched.."+ data);
      this.ideaDetail=data;
      console.log("after getting back from service",this.ideaDetail);
    });
  }

  getAppliedServiceProvider():any{
    const title=this.route.snapshot.paramMap.get('title');
    this.recentideas.getAppliedServiceProviders(title).subscribe((data:any)=>
    {
      console.log("applied people"+data);
      this.appliedSP=data;


    })
  }

  onApprove(emailId){
    console.log(emailId);
    this.status=true;
    const title=this.route.snapshot.paramMap.get('title');
    this.recentideas.approveOrRejectSP(title,emailId,status).subscribe((data:any)=>
    {
      console.log("updated idea with approves service providers"+data);
    });
  }

  onReject(emailId){
    console.log(emailId);
    this.status=false;
    const title=this.route.snapshot.paramMap.get('title');
    this.recentideas.approveOrRejectSP(title,emailId,status).subscribe((data:any)=>
    {
      console.log("updated idea with "+data);
    })
  }



}
