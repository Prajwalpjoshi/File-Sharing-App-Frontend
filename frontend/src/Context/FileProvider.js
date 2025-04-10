import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <FileContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const FileState = () => {
  return useContext(FileContext);
};

export default FileProvider;
