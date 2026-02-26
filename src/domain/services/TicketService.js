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
}
//# sourceMappingURL=TicketService.js.map