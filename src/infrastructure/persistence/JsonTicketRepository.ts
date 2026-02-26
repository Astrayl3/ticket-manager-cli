import fs from 'node:fs/promises';
import { type ITicketRepository } from '../../domain/ports/outbound/ITicketRepository.js';
import { type Ticket } from '../../domain/entities/Ticket.js';

export class JsonTicketRepository implements ITicketRepository {
    private readonly filePath = './data/tickets.json';

    async save(ticket: Ticket): Promise<void> {
        const tickets = await this.findAll();
        const index = tickets.findIndex(t => t.id === ticket.id);
        if (index !== -1){
            tickets[index] = ticket;
        } else{
            tickets.push(ticket);
        }
        await fs.writeFile(this.filePath, JSON.stringify(tickets, null, 2));
    }

    async findAll(): Promise<Ticket[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data) as Ticket[];
        } catch (error) {
            return [];
        }
    }

    async findById(id: string): Promise<Ticket | null> {
        const tickets = await this.findAll();
        return tickets.find(t => t.id === id) || null;
    }
}