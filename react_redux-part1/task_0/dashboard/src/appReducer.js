/***************
* ACTION TYPES *
***************/

export const APP_ACTIONS = {
  // Log in user.
  LOGIN: 'LOGIN',
  // Log out user.                  
  LOGOUT: 'LOGOUT',
  // Open/close notifications drawer.                     
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  // Remove notification by ID.       
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  // Set notifications list.
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  // Set courses list.
  SET_COURSES: 'SET_COURSES',
};

/****************
* INITIAL STATE *
****************/

export const initialState = {
  // Drawer is open by default.
  displayDrawer: true,
  // User credentials.           
  user: { email: '', password: '', isLoggedIn: false },
  // Notifications array.
  notifications: [],
  // Courses array.                    
  courses: [],
};

/**********
* REDUCER *
**********/

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN:
      // Log in the user with provided credentials.
      return {
        ...state,
        user: { ...action.payload, isLoggedIn: true },
      };

    case APP_ACTIONS.LOGOUT:
      // Log out user and clear courses.
      return {
        ...state,
        user: { email: '', password: '', isLoggedIn: false },
        courses: [],
      };

    case APP_ACTIONS.TOGGLE_DRAWER:
      // Toggle the notifications drawer.
      return { ...state, displayDrawer: !state.displayDrawer };

    case APP_ACTIONS.MARK_NOTIFICATION_READ:
      // Remove notification by ID.
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };

    case APP_ACTIONS.SET_NOTIFICATIONS:
      // Replace notifications array.
      return { ...state, notifications: [...action.payload] };

    case APP_ACTIONS.SET_COURSES:
      // Replace courses array.
      return { ...state, courses: [...action.payload] };

    default:
      return state; // Return current state if action type is unknown.
  }
}
