import sendRequest from "./send-request";
const BASE_URL = '/api/drafts'

export async function getAllDrafts() {
    sendRequest(BASE_URL)
    return []
}