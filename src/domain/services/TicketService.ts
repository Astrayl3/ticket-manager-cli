import { type Ticket, TicketStatus, TicketPriority } from "../entities/Ticket.js";
import { type ITicketRepository } from "../ports/outbound/ITicketRepository.js";

export class TicketService {
    constructor(private ticketRepository: ITicketRepository) {}
    
    async createTicket(title: string, description: string, priority: TicketPriority,  tags: string[]) : Promise<Ticket> {
        const newTicket: Ticket = {
            id: Math.random().toString(36).substr(2, 9), // Simple ID
            title,
            description,
            status: TicketStatus.OPEN,
            priority,
            tags,
            createdAt: new Date()
        };

        await this.ticketRepository.save(newTicket);
        return newTicket;
    }

    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketRepository.findAll();
    }
}