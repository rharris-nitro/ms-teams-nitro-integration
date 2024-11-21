// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import { useContext, useRef, useEffect, useState} from "react";

import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import PDFViewer from "././PDFViewer";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { FileSelector } from "./FileSelectPage";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });

  const [file, setFile] = useState<File | null>(null)

  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
                file ? (<PDFViewer file={file} />) : (<FileSelector handleFileSelected={(file) => setFile(file)}/>)
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
