import { type Ticket, TicketPriority } from "../entities/Ticket.js";
import { type ITicketRepository } from "../ports/outbound/ITicketRepository.js";
export declare class TicketService {
    private ticketRepository;
    constructor(ticketRepository: ITicketRepository);
    createTicket(title: string, description: string, priority: TicketPriority, tags: string[]): Promise<Ticket>;
    getAllTickets(): Promise<Ticket[]>;
}
//# sourceMappingURL=TicketService.d.ts.map