import React, { useRef, useState, useEffect } from "react";
import "./UploadImage.css";
function UploadImage(props) {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();
  const pickedHandler = e => {
    let pickedFile;
    let isValidFile;
    if (e.target.files && e.target.files.length === 1) {
      // We used pickedFile in onInput function because setFile is Async function which will not work properly-
      pickedFile = e.target.files[0];
      console.log(pickedFile);
      setFile(e.target.files[0]);
      setIsValid(true);
      isValidFile = true;
    } else {
      setIsValid(false);
    }
    props.onInput(props.id, pickedFile.name, isValidFile);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  useEffect(() => {
    if (!file) {
      return;
    } else {
      //    FileReader Will Convert The Image Which Will Be Binary Data Into Readable Url-
      const fileReader = new FileReader();
      //    Once Url Of Binary Data Completed This onloadf Function Will Be Called Automatically-
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      //    Start Reading File And Making It's Url
      fileReader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <div className="image-upload">
      <input
        type="file"
        id={props.id}
        accept=".jpg,.png,.jpeg"
        style={{ display: "none" }}
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Select An Image</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
    </div>
  );
}

export default UploadImage;
