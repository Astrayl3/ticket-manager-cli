import { describe, it, expect, beforeEach } from 'vitest';
import { TicketService } from '../../src/domain/services/TicketService.js';
import { type ITicketRepository } from '../../src/domain/ports/outbound/ITicketRepository.js';
import { type Ticket, TicketStatus, TicketPriority } from '../../src/domain/entities/Ticket.js';

class MockTicketRepository implements ITicketRepository {
    private tickets: Ticket[] = [];
    async save(t: Ticket): Promise<void> { this.tickets.push(t); }
    async findAll(): Promise<Ticket[]> { return this.tickets; }
    async findById(id: string): Promise<Ticket | null> { 
        return this.tickets.find(t => t.id === id) || null; 
    }
}
//Test
describe('TicketService', () => {
    let service: TicketService;
    let repo: MockTicketRepository;

    beforeEach(() => {
        repo = new MockTicketRepository();
        service = new TicketService(repo);
    });

    it('ticket created successfully', async () => {
        const ticket = await service.createTicket('Test', 'Desc', TicketPriority.HIGH, []);
        
        expect(ticket.title).toBe('Test');
        expect(ticket.status).toBe(TicketStatus.OPEN);
        
        const all = await service.getAllTickets();
        expect(all.length).toBe(1);
    });
});