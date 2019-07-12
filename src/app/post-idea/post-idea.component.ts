import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PostIdeaServiceService } from '../post-idea-service.service';
import { Router, ActivatedRoute } from '@angular/router';

import subdomain from 'src/assets/jsonfiles/data2.json';

export interface Domain {
  name: string;
} 

@Component({
  selector: 'app-post-idea',
  templateUrl: './post-idea.component.html',
  styleUrls: ['./post-idea.component.scss']
})


export class PostIdeaComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  domainCtrl = new FormControl();
  subDomainList:any=subdomain;

  serviceProviders=[]

  filteredDomains: Observable<string[]>;
  domains: string[] = [];
  allDomains: string[] = ['Software developer', 'Manual tester', 'Automation tester', 'Mobile developer',
                          'Marketing agent','Travel agent', 'Financer'];
  
  @ViewChild('domainInput', {static: false}) domainInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  

  constructor(public dialogRef: MatDialogRef<PostIdeaComponent>, private postIdeaService : PostIdeaServiceService, private router: Router,private route:ActivatedRoute) {
    // console.log(this.matAutocomplete )
    this.filteredDomains = this.domainCtrl.valueChanges.pipe(
        startWith(null),
        map((domain: string | null) => domain ? this._filter(domain) : this.allDomains.slice()));
      // console.log(this.filteredDomains)
      this.filteredDomains.subscribe(console.log)
  }

  add(event: MatChipInputEvent): void {
    console.log(this.matAutocomplete.opened.emit())
    //  if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      
      
      if ((value || '').trim()) {
        this.domains.push(value.trim());
        console.log(this.domains, "this is add event")
      }
      
      if (input) {
        input.value = '';
      }
    }

  remove(domain: string): void {
    const index = this.domains.indexOf(domain);

    if (index >= 0) {
      this.domains.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // console.log(event, "SELECTED")
    this.domains.push(event.option.viewValue);
    // console.log
    this.domainInput.nativeElement.value = '';
    this.domainCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(value+"123");
    return this.allDomains.filter(domain => domain.toLowerCase().indexOf(filterValue) === 0);
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  ngOnInit() {
    console.log("in ngOnInit.....");
    console.log(this.matAutocomplete)

    const emailId=this.route.snapshot.paramMap.get('emailId');
    console.log("in post Idea"+emailId);
  }

  postIdea(ideaTitle,ideaBio,ideaDomain,ideaSubDomain,ideaBudget): any{

    const emailId=this.route.snapshot.paramMap.get('emailId');
    console.log("in postIdea methoddddd"+emailId);   

    console.log("hiiiiiiiiiii",ideaTitle,ideaDomain,ideaSubDomain,ideaBio,ideaBudget);
    console.log(this.domains)
    var Idea = {  
        title : ideaTitle,
        domain : ideaDomain,
        subDomain : ideaSubDomain,
        description : ideaBio,
        budget : ideaBudget,
        roles : this.domains,
        emailId: emailId,
        serviceProviders: this.serviceProviders

        
    }


    this.postIdeaService.Idea=Idea;
    console.log("want to print mail id..."+emailId);
    console.log(Idea);
    this.postIdeaService.postIdea(Idea);
    this.router.navigateByUrl(`result/`+this.domains);
  }


}
