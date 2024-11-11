import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

export const generateAIResponse = async (message: string): Promise<string> => {
  const apiUrl: string = "https://api.openai.com/v1/chat/completions";
  const apiKey: string | undefined = process.env.REACT_APP_OPENAI_API_KEY;
  const headers: Pick<AxiosRequestHeaders, "Content-Type" | "Authorization"> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const requestBody: {
    messages: { role: string; content: string }[];
    model: string;
  } = {
    messages: [{ role: "user", content: message }],
    model: "gpt-4o-mini",
  };
  const { data }: Awaited<AxiosResponse> = await axios.post(
    apiUrl,
    requestBody,
    { headers }
  );
  return data.choices[0].message.content;
};
