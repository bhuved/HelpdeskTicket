export interface Ticketmodel {
    id:number,
    title:string,
    description:string,
    createdbyUserId : number,
    resolvedbyUserId : number,
    createdby : string,
    resolvedby : string,
    status : string,
    resolution :string,
    createdtime : Date,
    resolvedtime? : Date | null

}
