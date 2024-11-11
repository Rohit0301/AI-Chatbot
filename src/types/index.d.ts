export interface IMessage {
    id: string;
    text: string;
    isWritting?: boolean;
    likeOrUnlike?: string;
    isBotMessage?: boolean;
}