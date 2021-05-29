import config from "../config"
import axios from "axios";
import _ from "lodash";

export type UploadRequestPayload = {
    author: string,
    description: string,
    title: string
    file: File
};

export async function uploadPresentation(payload: UploadRequestPayload): Promise<void> {
    const requestFormData = new FormData();

    requestFormData.append("metadata", JSON.stringify(_.omit(payload, "files")))
    requestFormData.append("data", payload.file)

    const result = await axios({
        method: "post",
        url: config.api_endpoint + "/upload",
        data: requestFormData,
        headers: { "Content-Type": "multipart/form-data"}
    })

    console.log(result.data);
}