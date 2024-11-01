const apiUrl = "https://backend-taskify-ecru.vercel.app"; // Replace with your actual API URL

// Sign Up User
export const signUp = async ({ name, email, password }) => {
  try {
    console.log(`ENtrou ${name}, ${email}, ${password}}`);
    const response = await fetch(`${apiUrl}/api/v1/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    // Parse JSON from response

    return response
  } catch (error) {
    console.error("Error signing up:", error);
    throw error.response?.data || error;
  }
};

// Sign In User
export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const { token, user } = response.data;
    // Optionally save token in AsyncStorage or context for future requests
    return { token, user };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error.response?.data || error;
  }
};

// Get Current User
export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error.response?.data || error;
  }
};

// Get User Tasks
// export const getUserTasks = async (token) => {
//   try {
//     const response = await axios.get(`${apiUrl}/tasks`, {

//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.tasks;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error.response?.data || error;
//   }
// };
