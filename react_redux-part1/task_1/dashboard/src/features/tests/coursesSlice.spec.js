import reducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('coursesSlice', () => {
  const initialState = { courses: [] };
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return the initial state by default', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('Should fetch courses correctly', async () => {
    const mockCourses = [
      { id: 1, name: 'React' },
      { id: 2, name: 'Redux' },
    ];

    mock.onGet('http://localhost:5173/courses.json').reply(200, {
      courses: mockCourses,
    });

    const store = configureStore({ reducer });
    await store.dispatch(fetchCourses());

    const state = store.getState();
    expect(state.courses).toEqual(mockCourses);
  });

  it('Should reset courses when logout is dispatched', () => {
    const prevState = { courses: [{ id: 1, name: 'React' }] };
    const newState = reducer(prevState, logout());
    expect(newState).toEqual(initialState);
  });
});
