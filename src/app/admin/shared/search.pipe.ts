import {Pipe, PipeTransform} from '@angular/core';
import {Post, Comment} from '../../shared/interfaces';

@Pipe({
  name: 'searchPosts'
})
// @Pipe({
//   name: 'searchComments'
// })


export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
/////////////////////////////////////
// export class SearchComments implements PipeTransform {
//   transform(comments: Comment[], search = ''): Comment[] {
//     if (!search.trim()) {
//       return comments;
//     }

//     return comments.filter(post => {
//       // return comments.toLowerCase().includes(search.toLowerCase())
//     })
//   }

// }


