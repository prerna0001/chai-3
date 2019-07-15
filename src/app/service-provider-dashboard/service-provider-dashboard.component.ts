import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../registration-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { RecentIdeasService } from '../recent-ideas.service';

@Component({
  selector: 'app-service-provider-dashboard',
  templateUrl: './service-provider-dashboard.component.html',
  styleUrls: ['./service-provider-dashboard.component.scss']
})
export class ServiceProviderDashboardComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router, private route:ActivatedRoute, private recentideas:RecentIdeasService) { }

  recommendedIdeas:any=[];

  ngOnInit() {
    this.getRecommendation();
  }

  getRecommendation():void
  {
    const emailId=this.route.snapshot.paramMap.get('sendEmailId');
    console.log("in service-provider..get by email"+emailId);
    this.loginService.getRecommendations(emailId).subscribe((data:any)=>{
      console.log("data fetched.."+ data);
      this.recommendedIdeas=data;
      console.log("after getting back from service",this.recommendedIdeas);
    });
  }

  goToProfile():void{
    const emailId=this.route.snapshot.paramMap.get('sendEmailId');
    console.log(emailId);
    this.router.navigateByUrl('/serviceProfile/'+emailId);
  }

  applyForAnIdea(title)
{
  console.log(title);
  const emailId=this.route.snapshot.paramMap.get('sendEmailId');
  console.log(emailId);

    this.recentideas.sendToInnovator(title,emailId);


}


}

