import client from "./client"

export const session = () => {
    return client.post('/session');
};

export const feedback = () => {
    return client.post("/feedback");
}

export const feedback_status = ({ id }) => {
    return client.get(`/feedback/status/${id}`);
}

export const feedback_content = ({ id }) => {
    return client.get(`/feedback/${id}`);
}