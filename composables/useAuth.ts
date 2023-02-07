export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const response = await $fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        password: password,
      },
    });
    return response;
  };

  const logout = async () => {
    const response = await $fetch("/auth/logout", {
      method: "POST",
    });

    return response;
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await $fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: name,
        email: email,
        password: password,
      },
    });
    if (response === "User Saved") {
      return useRouter().replace("/login");
    }
    return response;
  };

  return {
    login,
    signup,
    logout,
  };
};
