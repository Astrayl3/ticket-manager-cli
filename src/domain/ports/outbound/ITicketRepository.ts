import {  type Ticket } from "../../entities/Ticket.js";

export interface ITicketRepository {
    save(ticket: Ticket): Promise<void>;
    findAll(): Promise<Ticket[]>;
    findById(id: string): Promise<Ticket | null>;
}