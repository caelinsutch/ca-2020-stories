import {StoryFilterPipe} from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new StoryFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
