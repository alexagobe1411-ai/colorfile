import { Component } from '@angular/core';


@Component({
  selector: 'app-triangles',
  standalone: true,
  template: `
    @for (triangle of triangles; track triangle) {
      <div [class]="'triangle ' + triangle"></div>
    }
  `,
  styleUrl: './triangle.component.css'
})
export class TriangleComponent {
  readonly triangles = ['t1', 't2', 't3', 't4', 't5'];
}
