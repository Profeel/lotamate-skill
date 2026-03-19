#!/usr/bin/env node
"use strict";
/**
 * Lotamate Skill CLI
 *
 * A command-line tool for testing and using Lotamate Skill.
 *
 * Usage:
 *   LOTAMATE_API_KEY=lk_xxx lotamate-skill search-contacts 张三
 *   lotamate-skill --help
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const args = process.argv.slice(2);
function printHelp() {
    console.log(`
Lotamate Skill CLI - Access your Lotamate business data

Usage:
  LOTAMATE_API_KEY=lk_xxx lotamate-skill <command> [options]

Commands:
  search-contacts <keyword>     Search contacts by keyword
  get-contact <id>              Get contact details
  create-contact <name>         Create a new contact

  search-enterprises [keyword]  Search enterprises
  get-enterprise <id>           Get enterprise details

  list-opportunities            List opportunities
  get-opportunity <id>          Get opportunity details

  list-events                   List events
  get-event <id>                Get event details
  register-event <id>           Register for an event

  get-points                    Get points balance

  test                          Test API connection
  tools                         List available tools

Options:
  --limit <n>                   Limit results (default 10)
  --page <n>                    Page number
  --json                        Output raw JSON

Examples:
  # Search contacts
  LOTAMATE_API_KEY=lk_xxx lotamate-skill search-contacts 张三

  # Search enterprises with limit
  lotamate-skill search-enterprises 科技 --limit 5

  # Test connection
  lotamate-skill test

Environment Variables:
  LOTAMATE_API_KEY    Your API key (required)
  LOTAMATE_API_URL    API URL (optional, default: https://api.lotamate.com/mcp)
`);
}
async function main() {
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        printHelp();
        process.exit(0);
    }
    const command = args[0];
    const skill = new index_1.LotamateSkill();
    const getOption = (name) => {
        const idx = args.indexOf(name);
        return idx >= 0 ? args[idx + 1] : undefined;
    };
    const outputJson = args.includes('--json');
    const limit = parseInt(getOption('--limit') || '10', 10);
    const output = (data) => {
        if (outputJson) {
            console.log(JSON.stringify(data, null, 2));
        }
        else {
            console.log(JSON.stringify(data, null, 2));
        }
    };
    try {
        switch (command) {
            case 'test': {
                const result = await skill.checkConnection();
                console.log(result.success ? '✓ Connection successful' : '✗ Connection failed');
                console.log(result.message);
                break;
            }
            case 'tools': {
                const tools = await skill.listTools();
                console.log('Available tools:');
                tools.forEach((t) => console.log(`  - ${t.name}`));
                break;
            }
            case 'search-contacts': {
                const keyword = args[1];
                if (!keyword) {
                    console.error('Error: keyword required');
                    process.exit(1);
                }
                const result = await skill.searchContacts(keyword, limit);
                output(result);
                break;
            }
            case 'get-contact': {
                const id = args[1];
                if (!id) {
                    console.error('Error: contact ID required');
                    process.exit(1);
                }
                const result = await skill.getContact(id);
                output(result);
                break;
            }
            case 'create-contact': {
                const name = args[1];
                if (!name) {
                    console.error('Error: name required');
                    process.exit(1);
                }
                const result = await skill.createContact({ name });
                output(result);
                break;
            }
            case 'search-enterprises': {
                const keyword = args[1] || '';
                const result = await skill.searchEnterprises({ keyword, limit });
                output(result);
                break;
            }
            case 'get-enterprise': {
                const id = parseInt(args[1], 10);
                if (isNaN(id)) {
                    console.error('Error: enterprise ID required');
                    process.exit(1);
                }
                const result = await skill.getEnterprise(id);
                output(result);
                break;
            }
            case 'list-opportunities': {
                const result = await skill.listOpportunities({ limit });
                output(result);
                break;
            }
            case 'get-opportunity': {
                const id = parseInt(args[1], 10);
                if (isNaN(id)) {
                    console.error('Error: opportunity ID required');
                    process.exit(1);
                }
                const result = await skill.getOpportunity(id);
                output(result);
                break;
            }
            case 'list-events': {
                const result = await skill.listEvents({ limit });
                output(result);
                break;
            }
            case 'get-event': {
                const id = parseInt(args[1], 10);
                if (isNaN(id)) {
                    console.error('Error: event ID required');
                    process.exit(1);
                }
                const result = await skill.getEvent(id);
                output(result);
                break;
            }
            case 'register-event': {
                const id = parseInt(args[1], 10);
                if (isNaN(id)) {
                    console.error('Error: event ID required');
                    process.exit(1);
                }
                const result = await skill.registerEvent(id);
                output(result);
                break;
            }
            case 'get-points': {
                const result = await skill.getPoints();
                output(result);
                break;
            }
            default:
                console.error(`Unknown command: ${command}`);
                console.error('Run --help for usage information');
                process.exit(1);
        }
    }
    catch (error) {
        console.error('Error:', error.response?.data?.error || error.message);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7OztHQVFHOztBQUVILG1DQUF3QztBQUV4QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVuQyxTQUFTLFNBQVM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E0Q2IsQ0FBQyxDQUFDO0FBQ0gsQ0FBQztBQUVELEtBQUssVUFBVSxJQUFJO0lBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDbEUsU0FBUyxFQUFFLENBQUM7UUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxxQkFBYSxFQUFFLENBQUM7SUFFbEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQXNCLEVBQUU7UUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxTQUFT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RUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2YsTUFBTTtZQUNSLENBQUM7WUFFRCxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2YsTUFBTTtZQUNSLENBQUM7WUFFRDtnQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLyoqXG4gKiBMb3RhbWF0ZSBTa2lsbCBDTElcbiAqXG4gKiBBIGNvbW1hbmQtbGluZSB0b29sIGZvciB0ZXN0aW5nIGFuZCB1c2luZyBMb3RhbWF0ZSBTa2lsbC5cbiAqXG4gKiBVc2FnZTpcbiAqICAgTE9UQU1BVEVfQVBJX0tFWT1sa194eHggbG90YW1hdGUtc2tpbGwgc2VhcmNoLWNvbnRhY3RzIOW8oOS4iVxuICogICBsb3RhbWF0ZS1za2lsbCAtLWhlbHBcbiAqL1xuXG5pbXBvcnQgeyBMb3RhbWF0ZVNraWxsIH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IGFyZ3MgPSBwcm9jZXNzLmFyZ3Yuc2xpY2UoMik7XG5cbmZ1bmN0aW9uIHByaW50SGVscCgpIHtcbiAgY29uc29sZS5sb2coYFxuTG90YW1hdGUgU2tpbGwgQ0xJIC0gQWNjZXNzIHlvdXIgTG90YW1hdGUgYnVzaW5lc3MgZGF0YVxuXG5Vc2FnZTpcbiAgTE9UQU1BVEVfQVBJX0tFWT1sa194eHggbG90YW1hdGUtc2tpbGwgPGNvbW1hbmQ+IFtvcHRpb25zXVxuXG5Db21tYW5kczpcbiAgc2VhcmNoLWNvbnRhY3RzIDxrZXl3b3JkPiAgICAgU2VhcmNoIGNvbnRhY3RzIGJ5IGtleXdvcmRcbiAgZ2V0LWNvbnRhY3QgPGlkPiAgICAgICAgICAgICAgR2V0IGNvbnRhY3QgZGV0YWlsc1xuICBjcmVhdGUtY29udGFjdCA8bmFtZT4gICAgICAgICBDcmVhdGUgYSBuZXcgY29udGFjdFxuXG4gIHNlYXJjaC1lbnRlcnByaXNlcyBba2V5d29yZF0gIFNlYXJjaCBlbnRlcnByaXNlc1xuICBnZXQtZW50ZXJwcmlzZSA8aWQ+ICAgICAgICAgICBHZXQgZW50ZXJwcmlzZSBkZXRhaWxzXG5cbiAgbGlzdC1vcHBvcnR1bml0aWVzICAgICAgICAgICAgTGlzdCBvcHBvcnR1bml0aWVzXG4gIGdldC1vcHBvcnR1bml0eSA8aWQ+ICAgICAgICAgIEdldCBvcHBvcnR1bml0eSBkZXRhaWxzXG5cbiAgbGlzdC1ldmVudHMgICAgICAgICAgICAgICAgICAgTGlzdCBldmVudHNcbiAgZ2V0LWV2ZW50IDxpZD4gICAgICAgICAgICAgICAgR2V0IGV2ZW50IGRldGFpbHNcbiAgcmVnaXN0ZXItZXZlbnQgPGlkPiAgICAgICAgICAgUmVnaXN0ZXIgZm9yIGFuIGV2ZW50XG5cbiAgZ2V0LXBvaW50cyAgICAgICAgICAgICAgICAgICAgR2V0IHBvaW50cyBiYWxhbmNlXG5cbiAgdGVzdCAgICAgICAgICAgICAgICAgICAgICAgICAgVGVzdCBBUEkgY29ubmVjdGlvblxuICB0b29scyAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0IGF2YWlsYWJsZSB0b29sc1xuXG5PcHRpb25zOlxuICAtLWxpbWl0IDxuPiAgICAgICAgICAgICAgICAgICBMaW1pdCByZXN1bHRzIChkZWZhdWx0IDEwKVxuICAtLXBhZ2UgPG4+ICAgICAgICAgICAgICAgICAgICBQYWdlIG51bWJlclxuICAtLWpzb24gICAgICAgICAgICAgICAgICAgICAgICBPdXRwdXQgcmF3IEpTT05cblxuRXhhbXBsZXM6XG4gICMgU2VhcmNoIGNvbnRhY3RzXG4gIExPVEFNQVRFX0FQSV9LRVk9bGtfeHh4IGxvdGFtYXRlLXNraWxsIHNlYXJjaC1jb250YWN0cyDlvKDkuIlcblxuICAjIFNlYXJjaCBlbnRlcnByaXNlcyB3aXRoIGxpbWl0XG4gIGxvdGFtYXRlLXNraWxsIHNlYXJjaC1lbnRlcnByaXNlcyDnp5HmioAgLS1saW1pdCA1XG5cbiAgIyBUZXN0IGNvbm5lY3Rpb25cbiAgbG90YW1hdGUtc2tpbGwgdGVzdFxuXG5FbnZpcm9ubWVudCBWYXJpYWJsZXM6XG4gIExPVEFNQVRFX0FQSV9LRVkgICAgWW91ciBBUEkga2V5IChyZXF1aXJlZClcbiAgTE9UQU1BVEVfQVBJX1VSTCAgICBBUEkgVVJMIChvcHRpb25hbCwgZGVmYXVsdDogaHR0cHM6Ly9hcGkubG90YW1hdGUuY29tL21jcClcbmApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDAgfHwgYXJnc1swXSA9PT0gJy0taGVscCcgfHwgYXJnc1swXSA9PT0gJy1oJykge1xuICAgIHByaW50SGVscCgpO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuXG4gIGNvbnN0IGNvbW1hbmQgPSBhcmdzWzBdO1xuICBjb25zdCBza2lsbCA9IG5ldyBMb3RhbWF0ZVNraWxsKCk7XG5cbiAgY29uc3QgZ2V0T3B0aW9uID0gKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaWR4ID0gYXJncy5pbmRleE9mKG5hbWUpO1xuICAgIHJldHVybiBpZHggPj0gMCA/IGFyZ3NbaWR4ICsgMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgY29uc3Qgb3V0cHV0SnNvbiA9IGFyZ3MuaW5jbHVkZXMoJy0tanNvbicpO1xuICBjb25zdCBsaW1pdCA9IHBhcnNlSW50KGdldE9wdGlvbignLS1saW1pdCcpIHx8ICcxMCcsIDEwKTtcblxuICBjb25zdCBvdXRwdXQgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgaWYgKG91dHB1dEpzb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xuICAgIH1cbiAgfTtcblxuICB0cnkge1xuICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgY2FzZSAndGVzdCc6IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2tpbGwuY2hlY2tDb25uZWN0aW9uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5zdWNjZXNzID8gJ+KckyBDb25uZWN0aW9uIHN1Y2Nlc3NmdWwnIDogJ+KclyBDb25uZWN0aW9uIGZhaWxlZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQubWVzc2FnZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICd0b29scyc6IHtcbiAgICAgICAgY29uc3QgdG9vbHMgPSBhd2FpdCBza2lsbC5saXN0VG9vbHMoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0F2YWlsYWJsZSB0b29sczonKTtcbiAgICAgICAgdG9vbHMuZm9yRWFjaCgodDogYW55KSA9PiBjb25zb2xlLmxvZyhgICAtICR7dC5uYW1lfWApKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlYXJjaC1jb250YWN0cyc6IHtcbiAgICAgICAgY29uc3Qga2V5d29yZCA9IGFyZ3NbMV07XG4gICAgICAgIGlmICgha2V5d29yZCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBrZXl3b3JkIHJlcXVpcmVkJyk7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNraWxsLnNlYXJjaENvbnRhY3RzKGtleXdvcmQsIGxpbWl0KTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdnZXQtY29udGFjdCc6IHtcbiAgICAgICAgY29uc3QgaWQgPSBhcmdzWzFdO1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IGNvbnRhY3QgSUQgcmVxdWlyZWQnKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2tpbGwuZ2V0Q29udGFjdChpZCk7XG4gICAgICAgIG91dHB1dChyZXN1bHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnY3JlYXRlLWNvbnRhY3QnOiB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBhcmdzWzFdO1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogbmFtZSByZXF1aXJlZCcpO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBza2lsbC5jcmVhdGVDb250YWN0KHsgbmFtZSB9KTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdzZWFyY2gtZW50ZXJwcmlzZXMnOiB7XG4gICAgICAgIGNvbnN0IGtleXdvcmQgPSBhcmdzWzFdIHx8ICcnO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBza2lsbC5zZWFyY2hFbnRlcnByaXNlcyh7IGtleXdvcmQsIGxpbWl0IH0pO1xuICAgICAgICBvdXRwdXQocmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2dldC1lbnRlcnByaXNlJzoge1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KGFyZ3NbMV0sIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKGlkKSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBlbnRlcnByaXNlIElEIHJlcXVpcmVkJyk7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNraWxsLmdldEVudGVycHJpc2UoaWQpO1xuICAgICAgICBvdXRwdXQocmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2xpc3Qtb3Bwb3J0dW5pdGllcyc6IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2tpbGwubGlzdE9wcG9ydHVuaXRpZXMoeyBsaW1pdCB9KTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdnZXQtb3Bwb3J0dW5pdHknOiB7XG4gICAgICAgIGNvbnN0IGlkID0gcGFyc2VJbnQoYXJnc1sxXSwgMTApO1xuICAgICAgICBpZiAoaXNOYU4oaWQpKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IG9wcG9ydHVuaXR5IElEIHJlcXVpcmVkJyk7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNraWxsLmdldE9wcG9ydHVuaXR5KGlkKTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdsaXN0LWV2ZW50cyc6IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2tpbGwubGlzdEV2ZW50cyh7IGxpbWl0IH0pO1xuICAgICAgICBvdXRwdXQocmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ2dldC1ldmVudCc6IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChhcmdzWzFdLCAxMCk7XG4gICAgICAgIGlmIChpc05hTihpZCkpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogZXZlbnQgSUQgcmVxdWlyZWQnKTtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc2tpbGwuZ2V0RXZlbnQoaWQpO1xuICAgICAgICBvdXRwdXQocmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3JlZ2lzdGVyLWV2ZW50Jzoge1xuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSW50KGFyZ3NbMV0sIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKGlkKSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBldmVudCBJRCByZXF1aXJlZCcpO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBza2lsbC5yZWdpc3RlckV2ZW50KGlkKTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdnZXQtcG9pbnRzJzoge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBza2lsbC5nZXRQb2ludHMoKTtcbiAgICAgICAgb3V0cHV0KHJlc3VsdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKGBVbmtub3duIGNvbW1hbmQ6ICR7Y29tbWFuZH1gKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignUnVuIC0taGVscCBmb3IgdXNhZ2UgaW5mb3JtYXRpb24nKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5lcnJvciB8fCBlcnJvci5tZXNzYWdlKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cbn1cblxubWFpbigpOyJdfQ==