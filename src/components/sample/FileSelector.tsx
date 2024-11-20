import React from "react";
import "./FileSelector.css";
// import { Image } from "@fluentui/react-components";
import { useFilePicker } from 'use-file-picker';

export function FileSelector(props: { docsUrl?: string }) {

  const { openFilePicker, filesContent, loading, errors, plainFiles, clear } = useFilePicker({
    multiple: true,
    readAs: 'ArrayBuffer', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
    accept: ['.pdf'],
    // TODO uncomment validators: [new FileAmountLimitValidator({ min: 2, max: 3 })],
    readFilesContent: true, // ignores file content
  });

  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFilePicker()}>Something went wrong, retry! </button>
        {errors.map(err => (
          <div>
            {/* TODO: uncomment {err.name}: {err.reason} */} Error 
            /* e.g. "name":"FileAmountLimitError", "reason":"MAX_AMOUNT_OF_FILES_EXCEEDED" */
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFilePicker()}>Select file </button>
      <button onClick={() => clear()}>Clear</button>

      <br />
      Number of selected files: {plainFiles.length}
      <br />
      {/* If readAs is set to DataURL, You can display an image */}
      {/* {!!filesContent.length && <img src={filesContent[0].content} />} */}
      <br />
      {plainFiles.map(file => (
        <div key={file.name}>{file.name}</div>
      ))}

      {plainFiles.length}
      {/* <NSSClient /> //if logged in user, display upload  */}

    </div>
    
  );
}
