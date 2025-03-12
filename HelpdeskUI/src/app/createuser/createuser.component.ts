import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usermodel } from '../model/usermodel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  standalone: false,
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})
export class CreateuserComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: Usermodel = { Firstname: '', Lastname: '', Email: '' };
  message: string = '';

  ngOnInit(): void {

  }

  createUser(): void {

    this.userService.createUser(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user.Firstname = data.Firstname;
        this.user.Lastname =data.Lastname;
        this.user.Email = data.Email;
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
   // this.message = `Welcome ${this.user.Firstname} ${this.user.Lastname}, Your account created successfully.`;
    if (this.user !== null) {
      this.message = `Welcome ${this.user.Firstname} ${this.user.Lastname}, Your account created successfully.`;
    }
    else {
      this.message = "Error Creating account";
    }
  }
}



