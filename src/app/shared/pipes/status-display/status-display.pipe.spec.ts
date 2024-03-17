import { StatusDisplayPipe } from './status-display.pipe';

describe('StatusDisplayPipe', () => {
  let pipe: StatusDisplayPipe;

  beforeEach(() => {
    pipe = new StatusDisplayPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "scheduled" to "Scheduled"', () => {
    const transformedValue = pipe.transform('scheduled');

    expect(transformedValue).toBe('Scheduled');
  });


  it('should return undefined for unknown status', () => {
    const transformedValue = pipe.transform(`i'm not really going to work` as any);

    expect(transformedValue).toBeUndefined();
  });
});
