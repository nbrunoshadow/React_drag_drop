import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function Drop({ setFileContent }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => alert('file reading was aborted');
        reader.onerror = () => alert('file reading has failed');

        const rABS = !!reader.readAsBinaryString;
        reader.onload = () => {
          // Do whatever you want with the file contents
          const content = reader.result;

          setFileContent({ type: rABS ? 'binary' : 'array', content });
        };

        if (rABS) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      });
    },
    [setFileContent],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
