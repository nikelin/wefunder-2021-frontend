import config from "../config"
import axios from "axios";
import {PresentationData} from "./entities";

export async function fetchPresentationsList(): Promise<PresentationData[]> {
    const result = await axios({
        method: "get",
        url: config.api_endpoint + "/presentations"
    })

    return result.data;
}

export async function fetchPresentation(id: number): Promise<PresentationData|null> {
    const result = await axios({
        method: "get",
        url: config.api_endpoint + "/presentation/" + id
    })

    return result.data;
}