import { Command } from 'commander';
import { TicketService } from "./domain/services/TicketService.js";
import { JsonTicketRepository } from "./infrastructure/persistence/JsonTicketRepository.js";
import { TicketPriority } from "./domain/entities/Ticket.js";
import console from 'node:console';

const ticketService = new TicketService(new JsonTicketRepository());
const program = new Command();

program
    .name("ticket-manager")
    .description("tickets manager using Hexagonal")
    .version("1.0.0");
//LIST
program
    .command("list")
    .description("list all tickets")
    .action(async() => {
        const tickets = await ticketService.getAllTickets();
        console.table(tickets);
    });
//CREATE
program
    .command("create")
    .description("create a new ticket")
    .requiredOption("-t, --title <string>", "Ticket title")
    .option("-d, --desc <string>", "Description", " ")
    .option("-p, --priority <string>", "Priority (LOW, MEDIUM, HIGH)", "LOW")
    .option('--tags <string>', 'Tags list', '')
    .action(async(options) => {
        const tagList = options.tags ? options.tags.split(',').map((s: string) => s.trim()) : [];

        const ticket = await ticketService.createTicket(
            options.title,
            options.desc,
            options.priority as TicketPriority,
            tagList
        );
        console.log("Ticket ID created:", ticket.id);
    });

    program.parse();
    
