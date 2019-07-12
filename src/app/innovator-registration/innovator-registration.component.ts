import { Component, OnInit } from '@angular/core';
import subdomain from 'src/assets/jsonfiles/data2.json';
import { RegistrationServiceService } from '../registration-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-innovator-registration',
  templateUrl: './innovator-registration.component.html',
  styleUrls: ['./innovator-registration.component.scss']
})
export class InnovatorRegistrationComponent implements OnInit {
  subDomains=[];
  subDomainList:any=subdomain;
  constructor(private registrationService:RegistrationServiceService, private router:Router) { }

  ngOnInit() {
  }

  onClick(value)
  {
    console.log(value);
    this.subDomains=value;
  }

  register(emailId,password,name,domain,subDomains)
  {
    
    console.log(emailId, password,name,domain,subDomains);
     let innovatordata={  
      emailId:emailId,
       password:password,
       name:name,
       domain:domain,
       subDomain:this.subDomains,
       
       
     
  }
  console.log("hiiiiiii",innovatordata);
   this.registrationService.addInnovatorProfile(innovatordata);
  //  console.log("hi");
  this.router.navigateByUrl("/home");
}


}
