export interface IMessage {
    id: string;
    text: string;
    comment?: string;
    isWritting?: boolean;
    likeOrUnlike?: string;
    isBotMessage?: boolean;
    userMessage?: string;
}