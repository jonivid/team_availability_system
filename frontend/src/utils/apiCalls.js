import axios from "axios";
import { routes } from "./routes";

export const submitLoginDetails = async (credentials) => {
  try {
    const apiUrl = import.meta.env.VITE_REST_API;
    const res = await axios.post(`${apiUrl}/${routes.LOGIN}`, credentials);
    if (res.data.success) {
      sessionStorage.setItem("token", res.data.token);
      return res.data.token;
    } else {
      console.log("Login failed:", res.data.message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
};

export const getContacts = async ({
  setUserDetails,
  setUsersList,
  setSelectedStatus,
  query,
  selectedOptions,
}) => {
  try {
    const apiUrl = import.meta.env.VITE_REST_API;
    const token = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage
    const params = {};

    if (query) {
      params.name = query;
    }

    if (selectedOptions && selectedOptions.length > 0) {
      params.statusId = selectedOptions.join(","); // Join status IDs into a comma-separated string
    }
    const res = await axios.get(`${apiUrl}/${routes.USERS}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    setUsersList(res.data.users);
    if (res.data.users.length > 0) {
      const userById = res.data.users.filter((u) => u.id === res.data.userId);
      if (userById.length > 0) {
        setUserDetails(userById[0]);
        setSelectedStatus(userById[0].statusId);
      }
    }
  } catch (error) {
    console.error("An error occurred during getContacts:", error);
  }
};

export const getStatusList = async (setStatusList) => {
  try {
    const apiUrl = import.meta.env.VITE_REST_API;
    const token = sessionStorage.getItem("token");

    const res = await axios.get(`${apiUrl}/${routes.STATUS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStatusList(res.data);
  } catch (error) {
    console.error("An error occurred during getStatusList:", error);
  }
};

export const updateUserStatusById = async (
  userId,
  statusId,
  setUserDetails,
  setSelectedStatus,
) => {
  try {
    const apiUrl = import.meta.env.VITE_REST_API;
    const token = sessionStorage.getItem("token");

    const res = await axios.put(
      `${apiUrl}/${routes.USERS}`,
      { userId, statusId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.success) {
      setUserDetails(res.data.userDetails);
      setSelectedStatus(res.data.userDetails.statusId);
    }
  } catch (error) {
    console.error("An error occurred during updateUserStatusById:", error);
  }
};
