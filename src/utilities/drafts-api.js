import sendRequest from "./send-request";
const BASE_URL = '/api/drafts'

export async function getAllDrafts() {
    return await sendRequest(BASE_URL)
}

export async function createDraft(draftForm) {
    return await sendRequest(BASE_URL, 'POST', draftForm)
}

export async function getDraftById(draftId) {
    return await sendRequest(`${BASE_URL}/${draftId}`)
}

export async function draftPlayer(draftId, player) {
    return await sendRequest(`${BASE_URL}/${draftId}/select-player`, 'POST', player)
}

export async function joinDraft(formData) {
    console.log(formData)
    return await sendRequest(`${BASE_URL}/${formData.draftId}/add-participants`, 'POST', formData)
}