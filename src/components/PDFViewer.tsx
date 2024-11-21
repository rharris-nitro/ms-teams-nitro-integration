import { useContext, useRef, useEffect } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import WebViewer from '@pdftron/webviewer'


const showFunction = Boolean(config.apiName);

export default function PDFViewer(props: {file: File}) {
  const { themeString } = useContext(TeamsFxContext);
  const viewer = useRef(null);

  useEffect(() => {
    if (viewer && viewer.current) {

        WebViewer(
            {
                path: '/webviewer/lib',
                licenseKey: 'YOUR_LICENSE_KEY',
                initialDoc: "https://nitrosoftware-my.sharepoint.com/:b:/g/personal/dstanley_gonitro_com/ERg_8Zf0TPVIuKV3VhOrKhQBsR9ry5Uvwze4jq4UhZ-RsQ?e=GhtUUg",
                isReadOnly: true
               
            },
            viewer.current,
        ).then((instance) => {
            const { documentViewer } = instance.Core;
            // ts-ignore
            instance.UI.setModularHeaders([]);
            instance.UI.loadDocument(props.file, {filename: props.file.name})
            // you can now call WebViewer APIs here...
        });
    }
  }, [viewer]);

  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
      <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    </div>
  );
}
