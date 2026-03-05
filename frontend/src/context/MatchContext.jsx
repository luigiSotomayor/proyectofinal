import { createContext, useContext, useState } from "react";

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState([]);

  return (
    <MatchContext.Provider
      value={{ selectedMatch, setSelectedMatch, matches, setMatches }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => useContext(MatchContext);
