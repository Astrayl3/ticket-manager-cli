import { type ITicketRepository } from '../../domain/ports/outbound/ITicketRepository.js';
import { type Ticket } from '../../domain/entities/Ticket.js';
export declare class JsonTicketRepository implements ITicketRepository {
    private readonly filePath;
    save(ticket: Ticket): Promise<void>;
    findAll(): Promise<Ticket[]>;
    findById(id: string): Promise<Ticket | null>;
}
//# sourceMappingURL=JsonTicketRepository.d.ts.map