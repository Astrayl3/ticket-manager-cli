import { TicketStatus, TicketPriority } from "../entities/Ticket.js";
import {} from "../ports/outbound/ITicketRepository.js";
export class TicketService {
    ticketRepository;
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    async createTicket(title, description, priority, tags) {
        const newTicket = {
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
    async getAllTickets() {
        return await this.ticketRepository.findAll();
    }
    async getTicketById(id) {
        return await this.ticketRepository.findById(id);
    }
    async updateTicketStatus(id, newStatus) {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket)
            throw new Error("Cannot found ticket with id:" + id);
        ticket.status = newStatus;
        await this.ticketRepository.save(ticket);
        return ticket;
    }
}
//# sourceMappingURL=TicketService.js.map