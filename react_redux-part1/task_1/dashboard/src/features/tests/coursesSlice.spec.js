import reducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';

global.fetch = jest.fn();

describe('coursesSlice', () => {
  const initialState = { courses: [] };

  beforeEach(() => {
    fetch.mockClear();
  });

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should fetch courses correctly', async () => {
    const mockCourses = [{ id: 1, name: 'React' }, { id: 2, name: 'Redux' }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCourses,
    });

    const store = configureStore({ reducer });
    await store.dispatch(fetchCourses());

    const state = store.getState();
    expect(state.courses).toEqual(mockCourses);
  });

  it('should reset courses when logout is dispatched', () => {
    const prevState = { courses: [{ id: 1, name: 'React' }] };

    const newState = reducer(prevState, logout());
    expect(newState).toEqual(initialState);
  });
});
