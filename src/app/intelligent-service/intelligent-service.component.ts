import { Component, OnInit } from '@angular/core';
import { IntelligentserviceService } from '../intelligentservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostIdeaServiceService } from '../post-idea-service.service';

@Component({
  selector: 'app-intelligent-service',
  templateUrl: './intelligent-service.component.html',
  styleUrls: ['./intelligent-service.component.css']
})
export class IntelligentServiceComponent implements OnInit {

  constructor(private intelligentService: IntelligentserviceService,private postIdeaService:PostIdeaServiceService, private route: ActivatedRoute,
    private router: Router) { }
  arrayOfServiceProviders: any = [];
  servProvider: any;
  acceptedServiceProvoders: any = [];
  rejectedServiceProviders: any = [];
  length: any;
  roles: string[] = [];;

  ngOnInit() {
    this.getAllServiceProviders();
  }


  home()
  {
    this.router.navigateByUrl('/home');
  }



  getAllServiceProviders() {

    console.log("idea getting is",this.postIdeaService.Idea)
    const sp= this.route.snapshot.paramMap.get('roles');

    console.log("we are getting",sp)

  
     var arrayOfroles = sp.split(',');

     console.log("hi",arrayOfroles)

     
     arrayOfroles.forEach(element => {
      
  
    this.intelligentService.getServiceProviders(element).subscribe(data => {

      console.log("all service providers are",data)

       data.serviceProvider.map(e => {
        this.arrayOfServiceProviders.push(e)
      });
      length = this.arrayOfServiceProviders.length;
    
      this.servProvider = this.arrayOfServiceProviders[length - 1];
     });
    });

  
  }



  public accept() {
    length = this.arrayOfServiceProviders.length;

    this.servProvider = this.arrayOfServiceProviders[length - 1];
    this.acceptedServiceProvoders.push(this.servProvider);
     this.arrayOfServiceProviders.pop(this.servProvider);
    console.log( "acceptedprovoders", this.acceptedServiceProvoders)
     
    this.postIdeaService.Idea.serviceProviders=this.acceptedServiceProvoders;
    console.log("updated idea",this.postIdeaService.Idea)
    
  }

    done()
    {
      this.postIdeaService.updateIdea(this.postIdeaService.Idea)
      this.router.navigateByUrl('/home')
    }
    
  

  public reject() {
    length = this.arrayOfServiceProviders.length;

    this.servProvider = this.arrayOfServiceProviders[length - 1];
    this.arrayOfServiceProviders.pop(this.servProvider)
  }


}









