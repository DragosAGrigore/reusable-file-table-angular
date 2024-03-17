import { StatusColorPipe } from './status-color.pipe';

describe('StatusColorPipe', () => {
  let pipe: StatusColorPipe;

  beforeEach(() => {
    pipe = new StatusColorPipe();
  });

  it('create an instance', () => {
    const pipe = new StatusColorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "available" to "lime"', () => {
    const transformedValue = pipe.transform('available');

    expect(transformedValue).toBe('lime');
  });


  it('should return undefined for unknown status', () => {
    const transformedValue = pipe.transform(`i'm not really going to work` as any);

    expect(transformedValue).toBeUndefined();
  });
});
