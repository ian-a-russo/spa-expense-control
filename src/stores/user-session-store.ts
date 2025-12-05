export type UserOptions = {
  email: string;
  name: string;
  role: string;
};

class UserSessionStore {
  public token: string = "";
  public user: UserOptions = {
    email: "",
    name: "",
    role: "",
  };

  setUser(user: UserOptions) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  setUserEmail(email: string) {
    this.user.email = email;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  hydrate() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) this.token = token;
    if (user) this.user = JSON.parse(user);
  }

  logout() {
    this.token = "";
    this.user = { email: "", name: "", role: "" };
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export const userSessionStore = reactive(new UserSessionStore());
