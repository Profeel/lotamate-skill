"use strict";
/**
 * Lotamate Skill for OpenClaw
 *
 * This skill allows OpenClaw to interact with Lotamate's business data:
 * - Contacts management
 * - Enterprise search
 * - Opportunities tracking
 * - Events management
 * - Points and recommendations
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotamateSkill = void 0;
exports.getSkill = getSkill;
exports.setApiKey = setApiKey;
const axios_1 = __importDefault(require("axios"));
/**
 * Lotamate Skill Client
 *
 * Main class for interacting with Lotamate API.
 * Use environment variable LOTAMATE_API_KEY or pass apiKey in config.
 *
 * @example
 * ```typescript
 * const client = new LotamateSkill({ apiKey: 'lk_xxx' });
 * const contacts = await client.searchContacts('张三');
 * ```
 */
class LotamateSkill {
    constructor(config) {
        this.apiKey = config?.apiKey || process.env.LOTAMATE_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('LOTAMATE_API_KEY is required. ' +
                'Set it as environment variable or pass in config.');
        }
        const baseUrl = config?.baseUrl || process.env.LOTAMATE_API_URL || 'https://api.lotamate.com/mcp';
        this.client = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.apiKey,
            },
            timeout: 30000,
        });
    }
    // ==================== Contacts ====================
    /**
     * Search contacts by keyword
     * @param keyword Search keyword (name, company, position)
     * @param limit Max results (default 10, max 50)
     */
    async searchContacts(keyword, limit = 10) {
        const response = await this.client.post('/tools/lotamate_search_contacts', {
            keyword,
            limit,
        });
        return response.data.data;
    }
    /**
     * Get contact details by ID
     * @param contactId Contact ID
     */
    async getContact(contactId) {
        const response = await this.client.post('/tools/lotamate_get_contact', {
            contactId,
        });
        return response.data.data;
    }
    /**
     * Create a new contact
     * @param data Contact data
     */
    async createContact(data) {
        const response = await this.client.post('/tools/lotamate_create_contact', data);
        return response.data.data;
    }
    // ==================== Enterprises ====================
    /**
     * Search enterprises
     * @param params Search parameters
     */
    async searchEnterprises(params = {}) {
        const response = await this.client.post('/tools/lotamate_search_enterprises', params);
        return response.data.data;
    }
    /**
     * Get enterprise details
     * @param enterpriseId Enterprise ID
     */
    async getEnterprise(enterpriseId) {
        const response = await this.client.post('/tools/lotamate_get_enterprise', {
            enterpriseId,
        });
        return response.data.data;
    }
    /**
     * Get signed partners for an enterprise
     * @param enterpriseId Enterprise ID
     */
    async getSignedPartners(enterpriseId) {
        const response = await this.client.post('/tools/lotamate_get_signed_partners', {
            enterpriseId,
        });
        return response.data.data;
    }
    // ==================== QCC Database ====================
    /**
     * Search enterprises in QCC database (企查查)
     * @param params Search parameters
     */
    async searchQccEnterprises(params = {}) {
        const response = await this.client.post('/tools/lotamate_search_qcc_enterprises', params);
        return response.data.data;
    }
    /**
     * Get detailed QCC enterprise info by ID
     * @param enterpriseId QCC Enterprise ID
     */
    async getQccEnterprise(enterpriseId) {
        const response = await this.client.post('/tools/lotamate_get_qcc_enterprise', {
            enterpriseId,
        });
        return response.data.data;
    }
    /**
     * List all provinces with QCC enterprises
     */
    async listQccProvinces() {
        const response = await this.client.post('/tools/lotamate_list_qcc_provinces', {});
        return response.data.data;
    }
    /**
     * List all industries with QCC enterprises
     */
    async listQccIndustries() {
        const response = await this.client.post('/tools/lotamate_list_qcc_industries', {});
        return response.data.data;
    }
    // ==================== Opportunities ====================
    /**
     * List opportunities
     * @param params Filter parameters
     */
    async listOpportunities(params = {}) {
        const response = await this.client.post('/tools/lotamate_list_opportunities', params);
        return response.data.data;
    }
    /**
     * Get opportunity details
     * @param opportunityId Opportunity ID
     */
    async getOpportunity(opportunityId) {
        const response = await this.client.post('/tools/lotamate_get_opportunity', {
            opportunityId,
        });
        return response.data.data;
    }
    /**
     * Create a new opportunity
     * @param data Opportunity data
     */
    async createOpportunity(data) {
        const response = await this.client.post('/tools/lotamate_create_opportunity', data);
        return response.data.data;
    }
    // ==================== Events ====================
    /**
     * List events
     * @param params Filter parameters
     */
    async listEvents(params = {}) {
        const response = await this.client.post('/tools/lotamate_list_events', params);
        return response.data.data;
    }
    /**
     * Get event details
     * @param eventId Event ID
     */
    async getEvent(eventId) {
        const response = await this.client.post('/tools/lotamate_get_event', {
            eventId,
        });
        return response.data.data;
    }
    /**
     * Register for an event
     * @param eventId Event ID
     */
    async registerEvent(eventId) {
        const response = await this.client.post('/tools/lotamate_register_event', {
            eventId,
        });
        return response.data;
    }
    // ==================== Points ====================
    /**
     * Get points balance
     */
    async getPoints() {
        const response = await this.client.post('/tools/lotamate_get_points', {});
        return response.data.data;
    }
    /**
     * Get points records
     * @param params Pagination parameters
     */
    async getPointsRecords(params = {}) {
        const response = await this.client.post('/tools/lotamate_get_points_records', params);
        return response.data.data;
    }
    // ==================== AI Recommendations ====================
    /**
     * Get AI-powered partner recommendations
     * @param params Recommendation parameters
     */
    async recommendPartners(params = {}) {
        const response = await this.client.post('/tools/lotamate_recommend_partners', params);
        return response.data.data;
    }
    /**
     * Get opportunity recommendations
     * @param params Recommendation parameters
     */
    async recommendOpportunities(params = {}) {
        const response = await this.client.post('/tools/lotamate_recommend_opportunities', params);
        return response.data.data;
    }
    /**
     * Get event recommendations
     * @param params Recommendation parameters
     */
    async recommendEvents(params = {}) {
        const response = await this.client.post('/tools/lotamate_recommend_events', params);
        return response.data.data;
    }
    /**
     * Analyze contacts with AI
     * @param analysisType Type of analysis
     */
    async analyzeContacts(analysisType = 'network') {
        const response = await this.client.post('/tools/lotamate_analyze_contacts', {
            analysisType,
        });
        return response.data.data;
    }
    // ==================== Referrals ====================
    /**
     * Create a referral
     * @param data Referral data
     */
    async createReferral(data) {
        const response = await this.client.post('/tools/lotamate_create_referral', data);
        return response.data.data;
    }
    /**
     * List referrals
     * @param params Filter parameters
     */
    async listReferrals(params = {}) {
        const response = await this.client.post('/tools/lotamate_list_referrals', params);
        return response.data.data;
    }
    /**
     * Update referral status
     * @param referralId Referral ID
     * @param status New status (2=contacted, 3=signed, 4=rejected)
     */
    async updateReferralStatus(referralId, status) {
        const response = await this.client.post('/tools/lotamate_update_referral_status', {
            referral_id: referralId,
            status,
        });
        return response.data;
    }
    // ==================== Utility ====================
    /**
     * Check API connection
     */
    async checkConnection() {
        try {
            await this.getPoints();
            return { success: true, message: 'Connection successful' };
        }
        catch (error) {
            return { success: false, message: error.message || 'Connection failed' };
        }
    }
    /**
     * List all available tools
     */
    async listTools() {
        const response = await this.client.get('/tools');
        return response.data.tools;
    }
}
exports.LotamateSkill = LotamateSkill;
// Default export
exports.default = LotamateSkill;
// Create default instance if API key is available
let defaultInstance = null;
function getSkill() {
    if (!defaultInstance) {
        defaultInstance = new LotamateSkill();
    }
    return defaultInstance;
}
function setApiKey(apiKey) {
    process.env.LOTAMATE_API_KEY = apiKey;
    defaultInstance = null; // Reset instance
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztHQVdHOzs7Ozs7QUFnZUgsNEJBS0M7QUFFRCw4QkFHQztBQXhlRCxrREFBNkM7QUFzRjdDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBYSxhQUFhO0lBSXhCLFlBQVksTUFBdUI7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUUsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDO1FBRW5FLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDYixnQ0FBZ0M7Z0JBQ2hDLG1EQUFtRCxDQUNwRCxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSw4QkFBOEIsQ0FBQztRQUVsRyxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7WUFDekIsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTTthQUN6QjtZQUNELE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFEQUFxRDtJQUVyRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFlLEVBQUUsUUFBZ0IsRUFBRTtRQUN0RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFO1lBQ3pFLE9BQU87WUFDUCxLQUFLO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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O0lBRUQsb0RBQW9EO0lBRXBEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGVBQWU7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFDN0QsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBcFhELHNDQW9YQztBQUVELGlCQUFpQjtBQUNqQixrQkFBZSxhQUFhLENBQUM7QUFFN0Isa0RBQWtEO0FBQ2xELElBQUksZUFBZSxHQUF5QixJQUFJLENBQUM7QUFFakQsU0FBZ0IsUUFBUTtJQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckIsZUFBZSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNELE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFnQixTQUFTLENBQUMsTUFBYztJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztJQUN0QyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsaUJBQWlCO0FBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIExvdGFtYXRlIFNraWxsIGZvciBPcGVuQ2xhd1xuICpcbiAqIFRoaXMgc2tpbGwgYWxsb3dzIE9wZW5DbGF3IHRvIGludGVyYWN0IHdpdGggTG90YW1hdGUncyBidXNpbmVzcyBkYXRhOlxuICogLSBDb250YWN0cyBtYW5hZ2VtZW50XG4gKiAtIEVudGVycHJpc2Ugc2VhcmNoXG4gKiAtIE9wcG9ydHVuaXRpZXMgdHJhY2tpbmdcbiAqIC0gRXZlbnRzIG1hbmFnZW1lbnRcbiAqIC0gUG9pbnRzIGFuZCByZWNvbW1lbmRhdGlvbnNcbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gJ2F4aW9zJztcblxuLy8gQ29uZmlndXJhdGlvblxuZXhwb3J0IGludGVyZmFjZSBMb3RhbWF0ZUNvbmZpZyB7XG4gIGFwaUtleTogc3RyaW5nO1xuICBiYXNlVXJsPzogc3RyaW5nO1xufVxuXG4vLyBUeXBlc1xuZXhwb3J0IGludGVyZmFjZSBDb250YWN0IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBjb21wYW55Pzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIGVtYWlsPzogc3RyaW5nO1xuICB3ZWNoYXQ/OiBzdHJpbmc7XG4gIHRhZ3M/OiBzdHJpbmdbXTtcbiAgbm90ZXM/OiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRlcnByaXNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgYnJhbmQ6IHN0cmluZztcbiAgZnVsbF9uYW1lOiBzdHJpbmc7XG4gIGluZHVzdHJ5Pzogc3RyaW5nO1xuICBwcm92aW5jZT86IHN0cmluZztcbiAgY2l0eT86IHN0cmluZztcbiAgYWRkcmVzcz86IHN0cmluZztcbiAgbG9nbz86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRY2NFbnRlcnByaXNlIHtcbiAgaWQ6IG51bWJlcjtcbiAgY29tcGFueV9uYW1lOiBzdHJpbmc7XG4gIGxlZ2FsX3JlcD86IHN0cmluZztcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIHByb3ZpbmNlPzogc3RyaW5nO1xuICBjaXR5Pzogc3RyaW5nO1xuICBkaXN0cmljdD86IHN0cmluZztcbiAgYWRkcmVzcz86IHN0cmluZztcbiAgaW5kdXN0cnk/OiBzdHJpbmc7XG4gIG9yZ190eXBlPzogc3RyaW5nO1xuICByZWdpc3RlcmVkX2NhcGl0YWw/OiBzdHJpbmc7XG4gIGVzdGFibGlzaG1lbnRfZGF0ZT86IHN0cmluZztcbiAgYnVzaW5lc3Nfc2NvcGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3Bwb3J0dW5pdHkge1xuICBpZDogbnVtYmVyO1xuICB0aXRsZTogc3RyaW5nO1xuICBlbnRlcnByaXNlX25hbWU6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGFtb3VudD86IG51bWJlcjtcbiAgc3RhZ2U/OiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmVudCB7XG4gIGlkOiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN0YXJ0X3RpbWU6IHN0cmluZztcbiAgZW5kX3RpbWU6IHN0cmluZztcbiAgbG9jYXRpb246IHN0cmluZztcbiAgZmVlOiBzdHJpbmc7XG4gIG1heF9wYXJ0aWNpcGFudHM6IG51bWJlcjtcbiAgcmVnaXN0cmF0aW9uX2NvdW50OiBudW1iZXI7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50c0JhbGFuY2Uge1xuICBiYWxhbmNlOiBudW1iZXI7XG4gIHRvdGFsX3JlY29yZHM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0ZWRSZXN1bHQ8VD4ge1xuICBpdGVtczogVFtdO1xuICBwYWdpbmF0aW9uOiB7XG4gICAgcGFnZTogbnVtYmVyO1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgdG90YWw6IG51bWJlcjtcbiAgICB0b3RhbF9wYWdlczogbnVtYmVyO1xuICB9O1xufVxuXG4vKipcbiAqIExvdGFtYXRlIFNraWxsIENsaWVudFxuICpcbiAqIE1haW4gY2xhc3MgZm9yIGludGVyYWN0aW5nIHdpdGggTG90YW1hdGUgQVBJLlxuICogVXNlIGVudmlyb25tZW50IHZhcmlhYmxlIExPVEFNQVRFX0FQSV9LRVkgb3IgcGFzcyBhcGlLZXkgaW4gY29uZmlnLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBjbGllbnQgPSBuZXcgTG90YW1hdGVTa2lsbCh7IGFwaUtleTogJ2xrX3h4eCcgfSk7XG4gKiBjb25zdCBjb250YWN0cyA9IGF3YWl0IGNsaWVudC5zZWFyY2hDb250YWN0cygn5byg5LiJJyk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIExvdGFtYXRlU2tpbGwge1xuICBwcml2YXRlIGNsaWVudDogQXhpb3NJbnN0YW5jZTtcbiAgcHJpdmF0ZSBhcGlLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBMb3RhbWF0ZUNvbmZpZykge1xuICAgIHRoaXMuYXBpS2V5ID0gY29uZmlnPy5hcGlLZXkgfHwgcHJvY2Vzcy5lbnYuTE9UQU1BVEVfQVBJX0tFWSB8fCAnJztcblxuICAgIGlmICghdGhpcy5hcGlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0xPVEFNQVRFX0FQSV9LRVkgaXMgcmVxdWlyZWQuICcgK1xuICAgICAgICAnU2V0IGl0IGFzIGVudmlyb25tZW50IHZhcmlhYmxlIG9yIHBhc3MgaW4gY29uZmlnLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZVVybCA9IGNvbmZpZz8uYmFzZVVybCB8fCBwcm9jZXNzLmVudi5MT1RBTUFURV9BUElfVVJMIHx8ICdodHRwczovL2FwaS5sb3RhbWF0ZS5jb20vbWNwJztcblxuICAgIHRoaXMuY2xpZW50ID0gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6IGJhc2VVcmwsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdYLUFQSS1LZXknOiB0aGlzLmFwaUtleSxcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09IENvbnRhY3RzID09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBjb250YWN0cyBieSBrZXl3b3JkXG4gICAqIEBwYXJhbSBrZXl3b3JkIFNlYXJjaCBrZXl3b3JkIChuYW1lLCBjb21wYW55LCBwb3NpdGlvbilcbiAgICogQHBhcmFtIGxpbWl0IE1heCByZXN1bHRzIChkZWZhdWx0IDEwLCBtYXggNTApXG4gICAqL1xuICBhc3luYyBzZWFyY2hDb250YWN0cyhrZXl3b3JkOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSAxMCk6IFByb21pc2U8UGFnaW5hdGVkUmVzdWx0PENvbnRhY3Q+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfc2VhcmNoX2NvbnRhY3RzJywge1xuICAgICAga2V5d29yZCxcbiAgICAgIGxpbWl0LFxuICAgIH0pO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbnRhY3QgZGV0YWlscyBieSBJRFxuICAgKiBAcGFyYW0gY29udGFjdElkIENvbnRhY3QgSURcbiAgICovXG4gIGFzeW5jIGdldENvbnRhY3QoY29udGFjdElkOiBzdHJpbmcpOiBQcm9taXNlPENvbnRhY3Q+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9nZXRfY29udGFjdCcsIHtcbiAgICAgIGNvbnRhY3RJZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjb250YWN0XG4gICAqIEBwYXJhbSBkYXRhIENvbnRhY3QgZGF0YVxuICAgKi9cbiAgYXN5bmMgY3JlYXRlQ29udGFjdChkYXRhOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGNvbXBhbnk/OiBzdHJpbmc7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gICAgcGhvbmU/OiBzdHJpbmc7XG4gICAgZW1haWw/OiBzdHJpbmc7XG4gICAgd2VjaGF0Pzogc3RyaW5nO1xuICAgIHRhZ3M/OiBzdHJpbmc7XG4gICAgbm90ZXM/OiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHsgaWQ6IHN0cmluZzsgbWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9jcmVhdGVfY29udGFjdCcsIGRhdGEpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PSBFbnRlcnByaXNlcyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggZW50ZXJwcmlzZXNcbiAgICogQHBhcmFtIHBhcmFtcyBTZWFyY2ggcGFyYW1ldGVyc1xuICAgKi9cbiAgYXN5bmMgc2VhcmNoRW50ZXJwcmlzZXMocGFyYW1zOiB7XG4gICAga2V5d29yZD86IHN0cmluZztcbiAgICBpbmR1c3RyeT86IHN0cmluZztcbiAgICBwcm92aW5jZT86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gIH0gPSB7fSk6IFByb21pc2U8UGFnaW5hdGVkUmVzdWx0PEVudGVycHJpc2U+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfc2VhcmNoX2VudGVycHJpc2VzJywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbnRlcnByaXNlIGRldGFpbHNcbiAgICogQHBhcmFtIGVudGVycHJpc2VJZCBFbnRlcnByaXNlIElEXG4gICAqL1xuICBhc3luYyBnZXRFbnRlcnByaXNlKGVudGVycHJpc2VJZDogbnVtYmVyKTogUHJvbWlzZTxFbnRlcnByaXNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfZ2V0X2VudGVycHJpc2UnLCB7XG4gICAgICBlbnRlcnByaXNlSWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2lnbmVkIHBhcnRuZXJzIGZvciBhbiBlbnRlcnByaXNlXG4gICAqIEBwYXJhbSBlbnRlcnByaXNlSWQgRW50ZXJwcmlzZSBJRFxuICAgKi9cbiAgYXN5bmMgZ2V0U2lnbmVkUGFydG5lcnMoZW50ZXJwcmlzZUlkOiBudW1iZXIpOiBQcm9taXNlPFBhZ2luYXRlZFJlc3VsdDxhbnk+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfZ2V0X3NpZ25lZF9wYXJ0bmVycycsIHtcbiAgICAgIGVudGVycHJpc2VJZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT0gUUNDIERhdGFiYXNlID09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBlbnRlcnByaXNlcyBpbiBRQ0MgZGF0YWJhc2UgKOS8geafpeafpSlcbiAgICogQHBhcmFtIHBhcmFtcyBTZWFyY2ggcGFyYW1ldGVyc1xuICAgKi9cbiAgYXN5bmMgc2VhcmNoUWNjRW50ZXJwcmlzZXMocGFyYW1zOiB7XG4gICAga2V5d29yZD86IHN0cmluZztcbiAgICBwcm92aW5jZT86IHN0cmluZztcbiAgICBjaXR5Pzogc3RyaW5nO1xuICAgIGluZHVzdHJ5Pzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gIH0gPSB7fSk6IFByb21pc2U8eyBpdGVtczogUWNjRW50ZXJwcmlzZVtdOyB0b3RhbDogbnVtYmVyOyBwYWdpbmF0aW9uOiBQYWdpbmF0ZWRSZXN1bHQ8YW55PlsncGFnaW5hdGlvbiddIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9zZWFyY2hfcWNjX2VudGVycHJpc2VzJywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkZXRhaWxlZCBRQ0MgZW50ZXJwcmlzZSBpbmZvIGJ5IElEXG4gICAqIEBwYXJhbSBlbnRlcnByaXNlSWQgUUNDIEVudGVycHJpc2UgSURcbiAgICovXG4gIGFzeW5jIGdldFFjY0VudGVycHJpc2UoZW50ZXJwcmlzZUlkOiBudW1iZXIpOiBQcm9taXNlPFFjY0VudGVycHJpc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9nZXRfcWNjX2VudGVycHJpc2UnLCB7XG4gICAgICBlbnRlcnByaXNlSWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGFsbCBwcm92aW5jZXMgd2l0aCBRQ0MgZW50ZXJwcmlzZXNcbiAgICovXG4gIGFzeW5jIGxpc3RRY2NQcm92aW5jZXMoKTogUHJvbWlzZTx7IHByb3ZpbmNlczogeyBuYW1lOiBzdHJpbmcgfVtdIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9saXN0X3FjY19wcm92aW5jZXMnLCB7fSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGFsbCBpbmR1c3RyaWVzIHdpdGggUUNDIGVudGVycHJpc2VzXG4gICAqL1xuICBhc3luYyBsaXN0UWNjSW5kdXN0cmllcygpOiBQcm9taXNlPHsgaW5kdXN0cmllczogeyBuYW1lOiBzdHJpbmcgfVtdIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9saXN0X3FjY19pbmR1c3RyaWVzJywge30pO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PSBPcHBvcnR1bml0aWVzID09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIExpc3Qgb3Bwb3J0dW5pdGllc1xuICAgKiBAcGFyYW0gcGFyYW1zIEZpbHRlciBwYXJhbWV0ZXJzXG4gICAqL1xuICBhc3luYyBsaXN0T3Bwb3J0dW5pdGllcyhwYXJhbXM6IHtcbiAgICBzdGF0dXM/OiAnbmV3JyB8ICdmb2xsb3cnIHwgJ3Byb2dyZXNzJyB8ICdzdWNjZXNzJyB8ICdmYWlsJztcbiAgICBwYWdlPzogbnVtYmVyO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICB9ID0ge30pOiBQcm9taXNlPFBhZ2luYXRlZFJlc3VsdDxPcHBvcnR1bml0eT4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9saXN0X29wcG9ydHVuaXRpZXMnLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG9wcG9ydHVuaXR5IGRldGFpbHNcbiAgICogQHBhcmFtIG9wcG9ydHVuaXR5SWQgT3Bwb3J0dW5pdHkgSURcbiAgICovXG4gIGFzeW5jIGdldE9wcG9ydHVuaXR5KG9wcG9ydHVuaXR5SWQ6IG51bWJlcik6IFByb21pc2U8T3Bwb3J0dW5pdHk+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9nZXRfb3Bwb3J0dW5pdHknLCB7XG4gICAgICBvcHBvcnR1bml0eUlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG9wcG9ydHVuaXR5XG4gICAqIEBwYXJhbSBkYXRhIE9wcG9ydHVuaXR5IGRhdGFcbiAgICovXG4gIGFzeW5jIGNyZWF0ZU9wcG9ydHVuaXR5KGRhdGE6IHtcbiAgICBlbnRlcnByaXNlX2lkOiBudW1iZXI7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBlc3RpbWF0ZWRfYW1vdW50PzogbnVtYmVyO1xuICB9KTogUHJvbWlzZTx7IGlkOiBudW1iZXI7IG1lc3NhZ2U6IHN0cmluZyB9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfY3JlYXRlX29wcG9ydHVuaXR5JywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09IEV2ZW50cyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKlxuICAgKiBMaXN0IGV2ZW50c1xuICAgKiBAcGFyYW0gcGFyYW1zIEZpbHRlciBwYXJhbWV0ZXJzXG4gICAqL1xuICBhc3luYyBsaXN0RXZlbnRzKHBhcmFtczoge1xuICAgIHN0YXR1cz86IHN0cmluZztcbiAgICBrZXl3b3JkPzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gIH0gPSB7fSk6IFByb21pc2U8UGFnaW5hdGVkUmVzdWx0PEV2ZW50Pj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQucG9zdCgnL3Rvb2xzL2xvdGFtYXRlX2xpc3RfZXZlbnRzJywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBldmVudCBkZXRhaWxzXG4gICAqIEBwYXJhbSBldmVudElkIEV2ZW50IElEXG4gICAqL1xuICBhc3luYyBnZXRFdmVudChldmVudElkOiBudW1iZXIpOiBQcm9taXNlPEV2ZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfZ2V0X2V2ZW50Jywge1xuICAgICAgZXZlbnRJZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGZvciBhbiBldmVudFxuICAgKiBAcGFyYW0gZXZlbnRJZCBFdmVudCBJRFxuICAgKi9cbiAgYXN5bmMgcmVnaXN0ZXJFdmVudChldmVudElkOiBudW1iZXIpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9yZWdpc3Rlcl9ldmVudCcsIHtcbiAgICAgIGV2ZW50SWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PSBQb2ludHMgPT09PT09PT09PT09PT09PT09PT1cblxuICAvKipcbiAgICogR2V0IHBvaW50cyBiYWxhbmNlXG4gICAqL1xuICBhc3luYyBnZXRQb2ludHMoKTogUHJvbWlzZTxQb2ludHNCYWxhbmNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfZ2V0X3BvaW50cycsIHt9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwb2ludHMgcmVjb3Jkc1xuICAgKiBAcGFyYW0gcGFyYW1zIFBhZ2luYXRpb24gcGFyYW1ldGVyc1xuICAgKi9cbiAgYXN5bmMgZ2V0UG9pbnRzUmVjb3JkcyhwYXJhbXM6IHtcbiAgICB0eXBlPzogJ2Vhcm4nIHwgJ3NwZW5kJztcbiAgICBwYWdlPzogbnVtYmVyO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICB9ID0ge30pOiBQcm9taXNlPFBhZ2luYXRlZFJlc3VsdDxhbnk+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfZ2V0X3BvaW50c19yZWNvcmRzJywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT0gQUkgUmVjb21tZW5kYXRpb25zID09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIEdldCBBSS1wb3dlcmVkIHBhcnRuZXIgcmVjb21tZW5kYXRpb25zXG4gICAqIEBwYXJhbSBwYXJhbXMgUmVjb21tZW5kYXRpb24gcGFyYW1ldGVyc1xuICAgKi9cbiAgYXN5bmMgcmVjb21tZW5kUGFydG5lcnMocGFyYW1zOiB7XG4gICAgaW5kdXN0cnk/OiBzdHJpbmc7XG4gICAgbG9jYXRpb24/OiBzdHJpbmc7XG4gICAgdXNlQUk/OiBib29sZWFuO1xuICB9ID0ge30pOiBQcm9taXNlPGFueVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfcmVjb21tZW5kX3BhcnRuZXJzJywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvcHBvcnR1bml0eSByZWNvbW1lbmRhdGlvbnNcbiAgICogQHBhcmFtIHBhcmFtcyBSZWNvbW1lbmRhdGlvbiBwYXJhbWV0ZXJzXG4gICAqL1xuICBhc3luYyByZWNvbW1lbmRPcHBvcnR1bml0aWVzKHBhcmFtczoge1xuICAgIGluZHVzdHJ5Pzogc3RyaW5nO1xuICAgIG1pbkFtb3VudD86IG51bWJlcjtcbiAgICB1c2VBST86IGJvb2xlYW47XG4gIH0gPSB7fSk6IFByb21pc2U8YW55W10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV9yZWNvbW1lbmRfb3Bwb3J0dW5pdGllcycsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZXZlbnQgcmVjb21tZW5kYXRpb25zXG4gICAqIEBwYXJhbSBwYXJhbXMgUmVjb21tZW5kYXRpb24gcGFyYW1ldGVyc1xuICAgKi9cbiAgYXN5bmMgcmVjb21tZW5kRXZlbnRzKHBhcmFtczoge1xuICAgIGxvY2F0aW9uPzogc3RyaW5nO1xuICAgIHVzZUFJPzogYm9vbGVhbjtcbiAgfSA9IHt9KTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQucG9zdCgnL3Rvb2xzL2xvdGFtYXRlX3JlY29tbWVuZF9ldmVudHMnLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogQW5hbHl6ZSBjb250YWN0cyB3aXRoIEFJXG4gICAqIEBwYXJhbSBhbmFseXNpc1R5cGUgVHlwZSBvZiBhbmFseXNpc1xuICAgKi9cbiAgYXN5bmMgYW5hbHl6ZUNvbnRhY3RzKGFuYWx5c2lzVHlwZTogJ25ldHdvcmsnIHwgJ2luZHVzdHJ5JyB8ICdvcHBvcnR1bml0eScgPSAnbmV0d29yaycpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQucG9zdCgnL3Rvb2xzL2xvdGFtYXRlX2FuYWx5emVfY29udGFjdHMnLCB7XG4gICAgICBhbmFseXNpc1R5cGUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09IFJlZmVycmFscyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWZlcnJhbFxuICAgKiBAcGFyYW0gZGF0YSBSZWZlcnJhbCBkYXRhXG4gICAqL1xuICBhc3luYyBjcmVhdGVSZWZlcnJhbChkYXRhOiB7XG4gICAgZW50ZXJwcmlzZV9pZDogbnVtYmVyO1xuICAgIHRvX3VzZXJfaWQ6IHN0cmluZztcbiAgICBjb250YWN0X25hbWU/OiBzdHJpbmc7XG4gICAgY29udGFjdF9waG9uZT86IHN0cmluZztcbiAgICBub3RlPzogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx7IHJlZmVycmFsX2lkOiBudW1iZXI7IG1lc3NhZ2U6IHN0cmluZyB9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfY3JlYXRlX3JlZmVycmFsJywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IHJlZmVycmFsc1xuICAgKiBAcGFyYW0gcGFyYW1zIEZpbHRlciBwYXJhbWV0ZXJzXG4gICAqL1xuICBhc3luYyBsaXN0UmVmZXJyYWxzKHBhcmFtczoge1xuICAgIHR5cGU/OiAncmVjZWl2ZWQnIHwgJ3NlbnQnO1xuICAgIHN0YXR1cz86IHN0cmluZztcbiAgICBwYWdlPzogbnVtYmVyO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICB9ID0ge30pOiBQcm9taXNlPFBhZ2luYXRlZFJlc3VsdDxhbnk+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNsaWVudC5wb3N0KCcvdG9vbHMvbG90YW1hdGVfbGlzdF9yZWZlcnJhbHMnLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHJlZmVycmFsIHN0YXR1c1xuICAgKiBAcGFyYW0gcmVmZXJyYWxJZCBSZWZlcnJhbCBJRFxuICAgKiBAcGFyYW0gc3RhdHVzIE5ldyBzdGF0dXMgKDI9Y29udGFjdGVkLCAzPXNpZ25lZCwgND1yZWplY3RlZClcbiAgICovXG4gIGFzeW5jIHVwZGF0ZVJlZmVycmFsU3RhdHVzKHJlZmVycmFsSWQ6IG51bWJlciwgc3RhdHVzOiAnMicgfCAnMycgfCAnNCcpOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgbWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuY2xpZW50LnBvc3QoJy90b29scy9sb3RhbWF0ZV91cGRhdGVfcmVmZXJyYWxfc3RhdHVzJywge1xuICAgICAgcmVmZXJyYWxfaWQ6IHJlZmVycmFsSWQsXG4gICAgICBzdGF0dXMsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PSBVdGlsaXR5ID09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIENoZWNrIEFQSSBjb25uZWN0aW9uXG4gICAqL1xuICBhc3luYyBjaGVja0Nvbm5lY3Rpb24oKTogUHJvbWlzZTx7IHN1Y2Nlc3M6IGJvb2xlYW47IG1lc3NhZ2U6IHN0cmluZyB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuZ2V0UG9pbnRzKCk7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiAnQ29ubmVjdGlvbiBzdWNjZXNzZnVsJyB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8ICdDb25uZWN0aW9uIGZhaWxlZCcgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBhbGwgYXZhaWxhYmxlIHRvb2xzXG4gICAqL1xuICBhc3luYyBsaXN0VG9vbHMoKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jbGllbnQuZ2V0KCcvdG9vbHMnKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS50b29scztcbiAgfVxufVxuXG4vLyBEZWZhdWx0IGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgTG90YW1hdGVTa2lsbDtcblxuLy8gQ3JlYXRlIGRlZmF1bHQgaW5zdGFuY2UgaWYgQVBJIGtleSBpcyBhdmFpbGFibGVcbmxldCBkZWZhdWx0SW5zdGFuY2U6IExvdGFtYXRlU2tpbGwgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNraWxsKCk6IExvdGFtYXRlU2tpbGwge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBMb3RhbWF0ZVNraWxsKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFwaUtleShhcGlLZXk6IHN0cmluZyk6IHZvaWQge1xuICBwcm9jZXNzLmVudi5MT1RBTUFURV9BUElfS0VZID0gYXBpS2V5O1xuICBkZWZhdWx0SW5zdGFuY2UgPSBudWxsOyAvLyBSZXNldCBpbnN0YW5jZVxufSJdfQ==