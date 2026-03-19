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
export interface LotamateConfig {
    apiKey: string;
    baseUrl?: string;
}
export interface Contact {
    id: string;
    name: string;
    company?: string;
    title?: string;
    phone?: string;
    email?: string;
    wechat?: string;
    tags?: string[];
    notes?: string;
    created_at: string;
}
export interface Enterprise {
    id: number;
    brand: string;
    full_name: string;
    industry?: string;
    province?: string;
    city?: string;
    address?: string;
    logo?: string;
}
export interface Opportunity {
    id: number;
    title: string;
    enterprise_name: string;
    status: string;
    amount?: number;
    stage?: string;
    created_at: string;
}
export interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
    fee: string;
    max_participants: number;
    registration_count: number;
    status: number;
}
export interface PointsBalance {
    balance: number;
    total_records: number;
}
export interface PaginatedResult<T> {
    items: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}
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
export declare class LotamateSkill {
    private client;
    private apiKey;
    constructor(config?: LotamateConfig);
    /**
     * Search contacts by keyword
     * @param keyword Search keyword (name, company, position)
     * @param limit Max results (default 10, max 50)
     */
    searchContacts(keyword: string, limit?: number): Promise<PaginatedResult<Contact>>;
    /**
     * Get contact details by ID
     * @param contactId Contact ID
     */
    getContact(contactId: string): Promise<Contact>;
    /**
     * Create a new contact
     * @param data Contact data
     */
    createContact(data: {
        name: string;
        company?: string;
        title?: string;
        phone?: string;
        email?: string;
        wechat?: string;
        tags?: string;
        notes?: string;
    }): Promise<{
        id: string;
        message: string;
    }>;
    /**
     * Search enterprises
     * @param params Search parameters
     */
    searchEnterprises(params?: {
        keyword?: string;
        industry?: string;
        province?: string;
        city?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<Enterprise>>;
    /**
     * Get enterprise details
     * @param enterpriseId Enterprise ID
     */
    getEnterprise(enterpriseId: number): Promise<Enterprise>;
    /**
     * Get signed partners for an enterprise
     * @param enterpriseId Enterprise ID
     */
    getSignedPartners(enterpriseId: number): Promise<PaginatedResult<any>>;
    /**
     * List opportunities
     * @param params Filter parameters
     */
    listOpportunities(params?: {
        status?: 'new' | 'follow' | 'progress' | 'success' | 'fail';
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<Opportunity>>;
    /**
     * Get opportunity details
     * @param opportunityId Opportunity ID
     */
    getOpportunity(opportunityId: number): Promise<Opportunity>;
    /**
     * Create a new opportunity
     * @param data Opportunity data
     */
    createOpportunity(data: {
        enterprise_id: number;
        title: string;
        description?: string;
        estimated_amount?: number;
    }): Promise<{
        id: number;
        message: string;
    }>;
    /**
     * List events
     * @param params Filter parameters
     */
    listEvents(params?: {
        status?: string;
        keyword?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<Event>>;
    /**
     * Get event details
     * @param eventId Event ID
     */
    getEvent(eventId: number): Promise<Event>;
    /**
     * Register for an event
     * @param eventId Event ID
     */
    registerEvent(eventId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Get points balance
     */
    getPoints(): Promise<PointsBalance>;
    /**
     * Get points records
     * @param params Pagination parameters
     */
    getPointsRecords(params?: {
        type?: 'earn' | 'spend';
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<any>>;
    /**
     * Get AI-powered partner recommendations
     * @param params Recommendation parameters
     */
    recommendPartners(params?: {
        industry?: string;
        location?: string;
        useAI?: boolean;
    }): Promise<any[]>;
    /**
     * Get opportunity recommendations
     * @param params Recommendation parameters
     */
    recommendOpportunities(params?: {
        industry?: string;
        minAmount?: number;
        useAI?: boolean;
    }): Promise<any[]>;
    /**
     * Get event recommendations
     * @param params Recommendation parameters
     */
    recommendEvents(params?: {
        location?: string;
        useAI?: boolean;
    }): Promise<any[]>;
    /**
     * Analyze contacts with AI
     * @param analysisType Type of analysis
     */
    analyzeContacts(analysisType?: 'network' | 'industry' | 'opportunity'): Promise<any>;
    /**
     * Create a referral
     * @param data Referral data
     */
    createReferral(data: {
        enterprise_id: number;
        to_user_id: string;
        contact_name?: string;
        contact_phone?: string;
        note?: string;
    }): Promise<{
        referral_id: number;
        message: string;
    }>;
    /**
     * List referrals
     * @param params Filter parameters
     */
    listReferrals(params?: {
        type?: 'received' | 'sent';
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResult<any>>;
    /**
     * Update referral status
     * @param referralId Referral ID
     * @param status New status (2=contacted, 3=signed, 4=rejected)
     */
    updateReferralStatus(referralId: number, status: '2' | '3' | '4'): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Check API connection
     */
    checkConnection(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * List all available tools
     */
    listTools(): Promise<any[]>;
}
export default LotamateSkill;
export declare function getSkill(): LotamateSkill;
export declare function setApiKey(apiKey: string): void;
