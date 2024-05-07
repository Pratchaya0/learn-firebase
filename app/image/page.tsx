"use client";

import { v4 } from "uuid";
import { storege } from "../firebase/firebase";
import {
  UploadResult,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState, useTransition } from "react";
import { Progress } from "@/components/ui/progress";

const ImagePage = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null); // Local Image state
  const [imageUrls, setImageUrls] = useState<(string | UploadResult)[]>([]);
  const [uploadPercent, setUploadPercent] = useState<number>();
  const [isUploading, startUploading] = useTransition();
  const [isUploadDone, setIsUploadDone] = useState<boolean>(true);
  const imageListRef = ref(storege, "tests/");

  const uploadImage = () => {
    console.log("upload image");
    if (imageUpload == null) return;

    startUploading(() => {
      setIsUploadDone(false);
      const imageRef = ref(storege, `tests/${v4()}`);
      // upload
      // uploadBytes  => not return data while uploading
      // uploadBytesResumable => return data while uploading
      const uploadTask = uploadBytesResumable(imageRef, imageUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          console.log(snapshot);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploadPercent(progress);

          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          setIsUploadDone(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
          setIsUploadDone(true);
        }
      );
    });
  };

  //   useEffect(() => {
  //     // get back
  //     listAll(imageListRef).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageUrls((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []); // Empty dependency array to run effect only once

  return (
    <div className="">
      Learning firebase and use it for Image reading and uploading
      <hr />
      <div>
        <input
          type="file"
          onChange={(event) => {
            const file = event.target.files && event.target.files[0];
            if (file) {
              setImageUpload(file);
            }
          }}
        />
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div className="mt-2">
        {!isUploadDone && <Progress value={uploadPercent} />}
      </div>
    </div>
  );
};

export default ImagePage;
