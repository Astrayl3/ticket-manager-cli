import fs from 'node:fs/promises';
import {} from '../../domain/ports/outbound/ITicketRepository.js';
import {} from '../../domain/entities/Ticket.js';
export class JsonTicketRepository {
    filePath = './data/tickets.json';
    async save(ticket) {
        const tickets = await this.findAll();
        const index = tickets.findIndex(t => t.id === ticket.id);
        if (index !== -1) {
            tickets[index] = ticket;
        }
        else {
            tickets.push(ticket);
        }
        await fs.writeFile(this.filePath, JSON.stringify(tickets, null, 2));
    }
    async findAll() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    async findById(id) {
        const tickets = await this.findAll();
        return tickets.find(t => t.id === id) || null;
    }
}
//# sourceMappingURL=JsonTicketRepository.js.map