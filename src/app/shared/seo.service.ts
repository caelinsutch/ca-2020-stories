import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  generateTags({title = '', description = '', image = '', type = 'article', summary = ''}) {

    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph
      {name: 'og:url', content: `https://${environment.url}${this.router.url}`},
      {name: 'og:title', content: title},
      {name: 'og:stie_name', content: 'CA 2020'},
      {name: 'og:type', content: type},
      {name: 'og:description', content: description},
      {name: 'og:image', content: image},
      // Twitter Card
      {name: 'twitter:card', content: summary},
      {name: 'twitter:site', content: '@caelinsutch'},
      {name: 'twitter:title', content: title},
      {name: 'twitter:description', content: description},
      {name: 'twitter:creator', content: '@caelinsutch'},
      {name: 'twitter:image', content: image},
    ]);
  }
}
