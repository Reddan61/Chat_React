export type formDataLoginType = {
    Name: string
}
export type messagesType = Array<{
    user: string,
    text: string
}>

export type socketRoomsDataTypeObj = {
    id:number,
    nameRoom: string,
    users: Array<string>,
    messages: messagesType
}
export type socketRoomsDataType = Array<socketRoomsDataTypeObj>;
