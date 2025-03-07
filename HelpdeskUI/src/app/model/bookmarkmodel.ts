export interface Bookmarkmodel {
    id:number,
    ticketId: number,
    userId: number,
    title:string,
    description:string,
    createdby : string,
    resolvedby : string,
    status : string,
    resolution :string,
    createdtime : Date,
    resolvedtime? : Date | null
    userName: string
}

