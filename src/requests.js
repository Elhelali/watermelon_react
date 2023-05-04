import axios from 'axios';
export async function update_survey(data) {
    const response = await axios.post('update_survey',data)
    return response.data
}