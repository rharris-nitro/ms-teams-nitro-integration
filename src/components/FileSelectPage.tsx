import React from "react";
// import { Image } from "@fluentui/react-components";
import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';

export function FileSelector(props: { docsUrl?: string, handleFileSelected: (file: File) => void }) {

  const { openFilePicker, filesContent, loading, errors, plainFiles, clear } = useFilePicker({
    multiple: true,
    readAs: 'ArrayBuffer', // availible formats: "Text" | "BinaryString" | "ArrayBuffer" | "DataURL"
    accept: ['.pdf'],
    validators: [new FileAmountLimitValidator({ max: 1 })],
    readFilesContent: true, // ignores file content
    onFilesSelected: ({ plainFiles }) => props.handleFileSelected(plainFiles[0])
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
      {plainFiles.map(file => {

            console.log(file);
          return <div key={file.name}>{file.name}</div>
      }
      )}

      {plainFiles.length}
      {/* <NSSClient /> //if logged in user, display upload  */}

    </div>
    
  );
}