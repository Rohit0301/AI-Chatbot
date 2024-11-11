export interface IMessage {
    id: string;
    message: string;
    isWritting?: boolean;
    likeOrUnlike?: string;
    isBotMessage?: boolean;
}