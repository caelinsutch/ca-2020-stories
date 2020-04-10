import {Pipe, PipeTransform} from '@angular/core';
import {Story} from '../services/story.model';

const {isArray} = Array;

@Pipe({
  name: 'StoryFilter'
})
export class StoryFilterPipe implements PipeTransform {
  transform(stories: Story[], find: string): Story[] {
    if (!stories) {
      return [];
    }
    if (!find) {
      return stories;
    }
    find = find.toLowerCase();
    return this.search(stories, find);
  }

  search(entries: any[], query: string) {

    query = query.toLowerCase();
    console.log('Query', query);

    return entries.filter(obj => {
      const keys: string[] = ['title', 'author'];
      return keys.some(key => {
        const value = obj[key];
        if (isArray(value)) {
          return value.some(v => {
            return v.toLowerCase().includes(query);
          });
        } else if (!isArray(value)) {
          if (value) {
            return value.toLowerCase().includes(query);
          } else {
            return null;
          }
        }
      });
    });
  }
}
