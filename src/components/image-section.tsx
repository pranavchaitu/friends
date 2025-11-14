import { UploadButton } from "@/utils/uploadthing";

export default () => {
    return <div>
        image section is this
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
            }}
        />
    </div>
}