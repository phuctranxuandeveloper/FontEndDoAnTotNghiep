import { useContext, createContext, useState, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../server/LoginService";
import { LoginRequest } from "../models/LoginRequest";

interface AuthContextType {
  token: string;
  loginAction: (loginRequest: LoginRequest) => void; // Thay any bằng kiểu dữ liệu phù hợp với API endpoint
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvide: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("auth") || "",
  );
  const navigate = useNavigate();

  const loginAction = (loginRequest: LoginRequest) => {
    if (loginRequest) {
      login(loginRequest).then((data) => {
        setToken(data.token);
        localStorage.setItem("auth", JSON.stringify(data.token));
        navigate("/");
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
      return;
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const authContextValue: AuthContextType = {
    token,
    loginAction,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvide;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
