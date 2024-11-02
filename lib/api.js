import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "https://backend-taskify-ecru.vercel.app"; // Replace with your actual API URL

// Sign Up User
export const signUp = async ({ name, email, password }) => {
  try {
    // console.log(`ENtrou ${name}, ${email}, ${password}}`);
    const response = await fetch(`${apiUrl}/api/v1/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    // Parse JSON from response

    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error.response?.data || error;
  }
};

// Sign In User
export const signIn = async ({ email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return { response };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error.response?.data || error;
  }
};

// Get Current User
export const getCurrentUser = async ({ token }) => {
  // console.log("iNSIDE", token)
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch current user");
    }

    // Parse and log JSON response
    const data = await response.json();
    // console.log("Fetched user data:", data.user);
    // console.log("Fetched user tasks:", data.tasks);

    return { user: data.user, tasks: data.tasks };
  } catch (error) {
    // console.error("Error fetching current user:", error);
    throw error.response?.data || error;
  }
};

export const createTask = async ({ title, priority, description }) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    // console.log("token",token)
    const response = await fetch(`${apiUrl}/api/v1/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({ title, priority, description }),
    });

    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async ({ id }) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    // console.log("token",token)
    const response = await fetch(`${apiUrl}/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    });
    // console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async ({ id,title,description,priority }) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("token",token)
    const response = await fetch(`${apiUrl}/api/v1/tasks/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({ title, priority, description }),
    });
    // console.log("response", response);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
