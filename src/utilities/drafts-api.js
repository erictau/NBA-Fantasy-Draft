import sendRequest from "./send-request";
const BASE_URL = '/api/drafts'

export async function getAllDrafts() {
    return await sendRequest(BASE_URL)
}

export async function createDraft(draftForm) {
    return await sendRequest(`${BASE_URL}/create`, 'POST', draftForm)
}

export async function getDraftById(draftId) {
    
}