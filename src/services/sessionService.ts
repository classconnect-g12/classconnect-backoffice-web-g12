const sessionService = {
  setSession: (token: string) => {
    localStorage.setItem("token", token);
  },
  getSession: () => {
    return localStorage.getItem("token");
  },
  clearSession: () => {
    localStorage.removeItem("token");
  },
};

export default sessionService;
