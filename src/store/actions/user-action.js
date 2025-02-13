import axios from "axios";
import { keys } from "../../keys";
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
  GET_ACCESS_WORKS,
  GET_RESULTS,
  GET_SERVICES,
  GET_USER,
  GET_USERS,
  GET_WORKS,
} from "../types";

export const getUsers = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USERS,
          payload: {
            data: response.data.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getUser = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user/single`, {
        params: data,
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER,
          payload: {
            data: response.data.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteUser = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/user/destroy`,
        { id: data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DELETE_USER,
            payload: data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const addUser = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/user`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_USER,
            payload: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getServices = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user/user-service`, {
        params: data,
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_SERVICES,
          payload: {
            data: response.data,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteService = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/user/destroy-user-service`,
        { id: data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DELETE_SERVICES,
            payload: data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const editService = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/user/edit-user-service`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: EDIT_SERVICES,
            payload: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const addService = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/user/add-user-service`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_SERVICES,
            payload: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const dengerDelete = () => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/admin/destroyAll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DENGER_DELETE,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getResults = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user/calc-service`, {
        params: data,
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_RESULTS,
          payload: {
            data: response.data.date,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getWorks = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user/get-user-work`, {
        params: data,
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_WORKS,
          payload: {
            data: response.data.date,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const addWork = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/user/add-user-work`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_WORKS,
            payload: response.data.data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const deleteWork = (data, role) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/user/destroy-user-work`,
        { id: data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: role == "admin" ? DELETE_WORKS : DELETE_ACCESS_WORKS,
            payload: data,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getAccessWorks = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/user/get-user-access-work`, {
        params: data,
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ACCESS_WORKS,
          payload: {
            data: response.data.date,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const changeAccessedWork = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/user/change-access-work`,
        { id: data },
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };
};
