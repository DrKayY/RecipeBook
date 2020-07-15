import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenName = 'Test';

  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.validName.bind(this)], this.validNameAsync),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(),
    });

    // this.projectForm.get('projectName').valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.projectForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
        console.log(this.projectForm);
      }
    );
  }

  onSubmit() {
    console.log(this.projectForm);
    // this.projectForm.reset();
  }

  validName(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.forbiddenName) {
      return {nameIsForbidden: true};
    } else {
      return null;
    }
  }

  validNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testt') {
          resolve({nameIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
