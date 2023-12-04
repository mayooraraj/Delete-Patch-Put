import { Component } from '@angular/core';
import { Post } from '../post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss']
})
export class MethodsComponent {

    constructor(private http: HttpClient){}//injected user service

    objPut:Post=new Post();
    objPatch:Post=new Post(); //catching the return data from the patch APi
    message:string='';

    put(opost:Post):Observable<any>{
      return this.http.put("https://jsonplaceholder.typicode.com/posts/1",opost);
    }

    patch(opost: Post): Observable<Post> {
      return this.http.patch<Post>("https://jsonplaceholder.typicode.com/posts/1", opost);
    }
    
delete():Observable<any>{
  return this.http.delete("https://jsonplaceholder.typicode.com/posts/1")
}

    ngOnInit(){
      let opost = new Post();
      opost.body ='updating the body';
      opost.title='updating the title';
      opost.userId=5;

      this.put(opost).subscribe((data: any) => {
        this.objPut = data;
      })

      opost.title = 'patched title';
      opost.id =  2;
      this.patch(opost).subscribe((data: Post) => {
        this.objPatch = data;
      });

      this.delete().subscribe(data => {
        this.message="resource deleted successfully"
      })
    }
}
