import { ObjectFieldPipe } from './object-field.pipe';

describe('ObjectFieldPipe', () => {
  let pipe: ObjectFieldPipe;
  const mockObject = {
    name: 'Dwight'
  }

  beforeEach(() => {
    pipe = new ObjectFieldPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('retrieve the value correctly', () => {
    const retrievedName = pipe.transform(mockObject, 'name');

    expect(retrievedName).toBe('Dwight');
  });

  it('retrieve undefined in case of wrong value', () => {
    const retrievedName = pipe.transform(mockObject, 'notAField');

    expect(retrievedName).toBeUndefined();
  });
});
