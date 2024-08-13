import { useState, useCallback } from "react";
import axios from "axios";
import { routes } from "./routes";

export const useApi = () => {
  const apiUrl = import.meta.env.VITE_REST_API;
  const [userDetails, setUserDetails] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [error, setError] = useState(null);

  const submitLoginDetails = useCallback(
    async (credentials) => {
      try {
        const res = await axios.post(`${apiUrl}/${routes.LOGIN}`, credentials);
        if (res.data.success) {
          sessionStorage.setItem("token", res.data.token);
          setError(null); // Clear any previous errors
          return res.data.token;
        } else {
          setError(res.data.message || "Login failed. Please try again.");
          return null;
        }
      } catch (error) {
        console.log(error.response);
        const errorMessage =
          error.response.data.error || "An error occurred during login.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    },
    [apiUrl],
  );

  const getContacts = useCallback(
    async ({ query, selectedOptions }) => {
      try {
        const token = sessionStorage.getItem("token");
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
            Authorization: `Bearer ${token}`,
          },
        });
        setUsersList(res.data.users);
        if (res.data.users.length > 0) {
          const userById = res.data.users.find((u) => u.id === res.data.userId);
          if (userById) {
            setUserDetails(userById);
            setSelectedStatus(userById.statusId);
          }
        }
        setError(null); // Clear any previous errors
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while fetching contacts.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    },
    [apiUrl],
  );

  const getStatusList = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(`${apiUrl}/${routes.STATUS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatusList(res.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching the status list.";
      setError(errorMessage);
      console.error(errorMessage);
    }
  }, [apiUrl]);

  const updateUserStatusById = useCallback(
    async (userId, statusId) => {
      try {
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
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while updating the user status.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    },
    [apiUrl],
  );

  return {
    userDetails,
    usersList,
    statusList,
    selectedStatus,
    error,
    submitLoginDetails,
    getContacts,
    getStatusList,
    updateUserStatusById,
  };
};
