import { StreamVideoClient } from "@stream-io/video-react-sdk";

let client = null;

export const initStreamClient = (userId, userName, userImage, token, apiKey) => {
    if (client) return client; 
  client = new StreamVideoClient({
    apiKey,
    user: {
      id: userId,
      name: userName,
      image: userImage || "",
    },
    token,
  });
  return client;
};

export const getStreamClient = () => client;

export const disconnectStreamClient = async () => {
  if (client) {
    await client.disconnectUser();
    client = null;
  }
};