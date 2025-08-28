import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
