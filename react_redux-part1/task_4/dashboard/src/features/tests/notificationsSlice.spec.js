import notificationsReducer, {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
  fetchNotifications,
} from '../notifications/notificationsSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification content</strong>'),
}));

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return the initial state', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Should handle markNotificationAsRead', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
        { id: 3, type: 'urgent', value: 'Notification 3' },
      ],
      displayDrawer: true,
    };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const actual = notificationsReducer(stateWithNotifications, markNotificationAsRead(2));

    expect(actual.notifications).toHaveLength(2);
    expect(actual.notifications.find((n) => n.id === 2)).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Marking notification 2 as read');

    consoleSpy.mockRestore();
  });

  it('Should handle showDrawer', () => {
    const stateWithDrawerHidden = {
      notifications: [],
      displayDrawer: false,
    };

    const actual = notificationsReducer(stateWithDrawerHidden, showDrawer());

    expect(actual.displayDrawer).toBe(true);
  });

  it('should handle hideDrawer', () => {
    const stateWithDrawerShown = {
      notifications: [],
      displayDrawer: true,
    };

    const actual = notificationsReducer(stateWithDrawerShown, hideDrawer());

    expect(actual.displayDrawer).toBe(false);
  });

  it('Should fetch notifications data correctly', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
      { id: 3, type: 'urgent', value: 'Notification 3' },
    ];

    axios.get.mockResolvedValueOnce({
      data: { notifications: mockNotifications },
    });

    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    await store.dispatch(fetchNotifications());

    const state = store.getState().notifications;

    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[2].html.__html).toBe('<strong>Latest notification content</strong>');
  });
});
