"use client";

import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  UploadResult,
  uploadBytesResumable,
} from "firebase/storage";
import { storege } from "./firebase/firebase";
import { v4 } from "uuid";
import { ReactReader } from "react-reader";
import { url } from "inspector";

export default function Home() {
  const [epubUpload, setEpubUpload] = useState<File | null>(null);
  const [epubUrls, setEpubUrls] = useState<(string | UploadResult)[]>([]);
  const [location, setLocation] = useState<string | number>(0);
  const epubListRef = ref(storege, "epubs/");

  const uploadEpub = () => {
    console.log("upload epub");
    if (epubUpload == null) return;

    const epubRef = ref(storege, `epubs/${v4()}.epub`);
    uploadBytes(epubRef, epubUpload).then((url) => {
      setEpubUrls((prev) => [...prev, url]);
    });
  };

  useEffect(() => {
    listAll(epubListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setEpubUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="">
      Learning firebase and use it for Epub reading and uploading
      <hr />
      <div>
        <input
          type="file"
          onChange={(event) => {
            const file = event.target.files && event.target.files[0];
            if (file) {
              setEpubUpload(file);
            }
          }}
        />
        <button onClick={uploadEpub}>Upload</button>
      </div>
      {/* {epubUrls.map((url) => {
        return <div key={url}>{url}</div>;
      })} */}
      <div style={{ height: "100vh" }}>
        <ReactReader
          // url="https://firebasestorage.googleapis.com/v0/b/learn-firebase-768a9.appspot.com/o/epubs%2F203cc94d-6f5c-440d-ae01-e92ba9a8b8e2?alt=media&token=4456eb6f-008d-4acc-a42a-b4b4939173bf"
          // url="https://react-reader.metabits.no/files/alice.epub"
          // url="https://firebasestorage.googleapis.com/v0/b/learn-firebase-768a9.appspot.com/o/epubs%2F5f0b98c0-658b-423c-a2fc-d279beb0b896?alt=media&token=f49e5421-6318-4f19-bfd4-8c26fe422381"
          url={
            "https://files.edgestore.dev/u57kfmj7qdlw6rtr/publicFiles/_public/e06af3f5-b15f-4ea4-a640-bf0b0ed50dea.epub"
          }
          title="test"
          epubInitOptions={{
            openAs: "epub",
          }}
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
          epubOptions={{
            flow: "scrolled",
            manager: "continuous",
          }}
        />
      </div>
    </div>
  );
}
