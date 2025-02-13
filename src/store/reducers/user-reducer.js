import {
  ADD_SERVICES,
  ADD_USER,
  ADD_WORKS,
  DELETE_ACCESS_WORKS,
  DELETE_SERVICES,
  DELETE_USER,
  DELETE_WORKS,
  DENGER_DELETE,
  EDIT_SERVICES,
  EDIT_WORK,
  GET_ACCESS_WORKS,
  GET_RESULTS,
  GET_SERVICES,
  GET_USERS,
  GET_WORKS,
} from "../types";

const initialState = {
  users: null,
  services: null,
  results: null,
  work: null,
  accessWorks: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload.data };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((i) => i.id !== action.payload),
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_SERVICES:
      return { ...state, services: action.payload.data.date };
    case DELETE_SERVICES:
      return {
        ...state,
        services: state.services.filter((i) => i.id !== action.payload),
      };
    case EDIT_SERVICES:
      const editedData = state.services.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      return {
        ...state,
        services: editedData,
      };
    case ADD_SERVICES:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload.data,
      };
    case DENGER_DELETE:
      return {
        ...state,
        users: null,
        services: null,
        results: null,
      };
    case GET_WORKS:
      return {
        ...state,
        work: action.payload.data,
      };
    case ADD_WORKS:
      return {
        ...state,
        work: [...state.work, action.payload],
      };
    case DELETE_WORKS:
      return {
        ...state,
        work: state.work.filter((i) => i.id !== action.payload),
      };
    case EDIT_WORK:
      const edited = state.work.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      return {
        ...state,
        work: edited,
      };
    case GET_ACCESS_WORKS:
      return {
        ...state,
        accessWorks: action.payload.data,
      };
    case DELETE_ACCESS_WORKS:
      return {
        ...state,
        accessWorks: state.accessWorks.filter((i) => i.id !== action.payload),
      };
    default:
      return state;
  }
};
