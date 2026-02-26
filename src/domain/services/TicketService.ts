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

    async getTicketById(id: string): Promise<Ticket | null> {
        return await this.ticketRepository.findById(id);
    }

    async updateTicketStatus(id: string, newStatus: TicketStatus): Promise<Ticket> {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket) throw  new Error("Cannot found ticket with id:" + id);
        ticket.status = newStatus;
        await this.ticketRepository.save(ticket);
        return ticket;
    }
}