import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.paylaod };
    case "CHANGE_MODE":
      return { ...state, mode: action.paylaod };
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "pink",
    mode: "dark",
  });

  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", paylaod: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", paylaod: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
