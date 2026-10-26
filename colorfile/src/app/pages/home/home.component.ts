import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({

  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  backgroundColor = '';

  constructor(private router: Router) {}
  
/*Random background color generation for the home page */
  ngOnInit(): void {
    const hue = Math.floor(Math.random() * 360);
    this.backgroundColor = `hsl(${hue}, 80%, 50%)`;
  }

  start(): void {
    this.router.navigate(['/palette']);
  }
}


