import axios from "axios";
import { keys } from "../../keys";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from "../types";
import Swal from "sweetalert2";

export const getCategory = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/category`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CATEGORY,
          payload: response.data.date,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const deleteCategory = (data) => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/category/destroy`,
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
            type: DELETE_CATEGORY,
            payload: data,
          });
        }

      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/category`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_CATEGORY,
            payload: response.data.data,
          });
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};
