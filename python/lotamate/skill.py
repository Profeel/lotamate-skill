"""
Lotamate Skill for OpenClaw (Python Version)

Connect your Lotamate account to OpenClaw and let AI assistants manage your business data.

Installation:
    pip install lotamate-skill

Usage:
    import os
    os.environ['LOTAMATE_API_KEY'] = 'lk_xxx'

    from lotamate import LotamateSkill
    skill = LotamateSkill()
    contacts = skill.search_contacts('张三')
"""

import os
import json
from typing import Optional, Dict, List, Any
from dataclasses import dataclass
import urllib.request
import urllib.error


@dataclass
class LotamateConfig:
    """Configuration for Lotamate Skill"""
    api_key: str
    base_url: str = "https://api.lotamate.com/mcp"


class LotamateError(Exception):
    """Lotamate API Error"""
    pass


class LotamateSkill:
    """
    Lotamate Skill Client

    Main class for interacting with Lotamate API.
    Use environment variable LOTAMATE_API_KEY or pass api_key in config.

    Example:
        >>> skill = LotamateSkill()
        >>> contacts = skill.search_contacts('张三')
        >>> print(contacts)
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        """
        Initialize Lotamate Skill

        Args:
            api_key: Your Lotamate API key (or set LOTAMATE_API_KEY env var)
            base_url: API URL (optional)
        """
        self.api_key = api_key or os.environ.get('LOTAMATE_API_KEY', '')
        self.base_url = base_url or os.environ.get('LOTAMATE_API_URL', 'https://api.lotamate.com/mcp')

        if not self.api_key:
            raise LotamateError(
                'LOTAMATE_API_KEY is required. '
                'Set it as environment variable or pass in constructor. '
                'Get your API key from https://lotamate.com/user/mcp'
            )

    def _call_tool(self, tool_name: str, params: Dict = None) -> Any:
        """Make API call to Lotamate"""
        url = f"{self.base_url}/tools/{tool_name}"
        data = json.dumps(params or {}).encode('utf-8')

        req = urllib.request.Request(
            url,
            data=data,
            headers={
                'Content-Type': 'application/json',
                'X-API-Key': self.api_key,
            },
            method='POST'
        )

        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                result = json.loads(response.read().decode('utf-8'))
                if result.get('success'):
                    return result.get('data')
                raise LotamateError(result.get('error', 'Unknown error'))
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            raise LotamateError(f"HTTP {e.code}: {error_body}")
        except urllib.error.URLError as e:
            raise LotamateError(f"Connection error: {e.reason}")

    # ==================== Contacts ====================

    def search_contacts(self, keyword: str, limit: int = 10) -> Dict:
        """Search contacts by keyword"""
        return self._call_tool('lotamate_search_contacts', {
            'keyword': keyword,
            'limit': limit
        })

    def get_contact(self, contact_id: str) -> Dict:
        """Get contact details by ID"""
        return self._call_tool('lotamate_get_contact', {
            'contactId': contact_id
        })

    def create_contact(self, name: str, **kwargs) -> Dict:
        """Create a new contact"""
        data = {'name': name, **kwargs}
        return self._call_tool('lotamate_create_contact', data)

    # ==================== Enterprises ====================

    def search_enterprises(self, keyword: str = '', **kwargs) -> Dict:
        """Search enterprises"""
        data = {'keyword': keyword, **kwargs}
        return self._call_tool('lotamate_search_enterprises', data)

    def get_enterprise(self, enterprise_id: int) -> Dict:
        """Get enterprise details"""
        return self._call_tool('lotamate_get_enterprise', {
            'enterpriseId': enterprise_id
        })

    def get_signed_partners(self, enterprise_id: int) -> Dict:
        """Get signed partners for an enterprise"""
        return self._call_tool('lotamate_get_signed_partners', {
            'enterpriseId': enterprise_id
        })

    # ==================== QCC Database ====================

    def search_qcc_enterprises(self, **kwargs) -> Dict:
        """Search enterprises in QCC database (企查查)

        Args:
            keyword: Search keyword (company name or legal representative)
            province: Province filter (e.g., 福建省)
            city: City filter (e.g., 福州市)
            industry: Industry filter (e.g., 食品加工)
            page: Page number (default 1)
            limit: Results per page (default 20)
        """
        return self._call_tool('lotamate_search_qcc_enterprises', kwargs)

    def get_qcc_enterprise(self, enterprise_id: int) -> Dict:
        """Get detailed enterprise info from QCC database by ID"""
        return self._call_tool('lotamate_get_qcc_enterprise', {
            'enterpriseId': enterprise_id
        })

    def list_qcc_provinces(self) -> Dict:
        """List all provinces with enterprises in QCC database"""
        return self._call_tool('lotamate_list_qcc_provinces', {})

    def list_qcc_industries(self) -> Dict:
        """List all industries with enterprises in QCC database"""
        return self._call_tool('lotamate_list_qcc_industries', {})

    # ==================== Opportunities ====================

    def list_opportunities(self, **kwargs) -> Dict:
        """List opportunities"""
        return self._call_tool('lotamate_list_opportunities', kwargs)

    def get_opportunity(self, opportunity_id: int) -> Dict:
        """Get opportunity details"""
        return self._call_tool('lotamate_get_opportunity', {
            'opportunityId': opportunity_id
        })

    def create_opportunity(self, enterprise_id: int, title: str, **kwargs) -> Dict:
        """Create a new opportunity"""
        data = {'enterprise_id': enterprise_id, 'title': title, **kwargs}
        return self._call_tool('lotamate_create_opportunity', data)

    # ==================== Events ====================

    def list_events(self, **kwargs) -> Dict:
        """List events"""
        return self._call_tool('lotamate_list_events', kwargs)

    def get_event(self, event_id: int) -> Dict:
        """Get event details"""
        return self._call_tool('lotamate_get_event', {
            'eventId': event_id
        })

    def register_event(self, event_id: int) -> Dict:
        """Register for an event"""
        return self._call_tool('lotamate_register_event', {
            'eventId': event_id
        })

    # ==================== Points ====================

    def get_points(self) -> Dict:
        """Get points balance"""
        return self._call_tool('lotamate_get_points', {})

    def get_points_records(self, **kwargs) -> Dict:
        """Get points records"""
        return self._call_tool('lotamate_get_points_records', kwargs)

    # ==================== AI Features ====================

    def recommend_partners(self, **kwargs) -> List:
        """Get partner recommendations"""
        return self._call_tool('lotamate_recommend_partners', kwargs)

    def recommend_opportunities(self, **kwargs) -> List:
        """Get opportunity recommendations"""
        return self._call_tool('lotamate_recommend_opportunities', kwargs)

    def recommend_events(self, **kwargs) -> List:
        """Get event recommendations"""
        return self._call_tool('lotamate_recommend_events', kwargs)

    def analyze_contacts(self, analysis_type: str = 'network') -> Dict:
        """Analyze contacts with AI"""
        return self._call_tool('lotamate_analyze_contacts', {
            'analysisType': analysis_type
        })

    # ==================== Referrals ====================

    def create_referral(self, enterprise_id: int, to_user_id: str, **kwargs) -> Dict:
        """Create a referral"""
        data = {'enterprise_id': enterprise_id, 'to_user_id': to_user_id, **kwargs}
        return self._call_tool('lotamate_create_referral', data)

    def list_referrals(self, **kwargs) -> Dict:
        """List referrals"""
        return self._call_tool('lotamate_list_referrals', kwargs)

    def update_referral_status(self, referral_id: int, status: str) -> Dict:
        """Update referral status"""
        return self._call_tool('lotamate_update_referral_status', {
            'referral_id': referral_id,
            'status': status
        })

    # ==================== Utility ====================

    def check_connection(self) -> Dict[str, Any]:
        """Check API connection"""
        try:
            self.get_points()
            return {'success': True, 'message': 'Connection successful'}
        except Exception as e:
            return {'success': False, 'message': str(e)}


# Convenience function
def get_skill(api_key: Optional[str] = None) -> LotamateSkill:
    """Get or create Lotamate Skill instance"""
    return LotamateSkill(api_key)


if __name__ == '__main__':
    # Test the skill
    import sys

    if len(sys.argv) < 2:
        print("Usage: python skill.py <command> [args]")
        print("Commands: test, search_contacts, search_enterprises, search_qcc, get_qcc, list_events, get_points")
        sys.exit(1)

    skill = LotamateSkill()
    cmd = sys.argv[1]

    if cmd == 'test':
        result = skill.check_connection()
        print(f"{'✓' if result['success'] else '✗'} {result['message']}")
    elif cmd == 'search_contacts':
        keyword = sys.argv[2] if len(sys.argv) > 2 else ''
        result = skill.search_contacts(keyword)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif cmd == 'search_enterprises':
        keyword = sys.argv[2] if len(sys.argv) > 2 else ''
        result = skill.search_enterprises(keyword)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif cmd == 'search_qcc':
        keyword = sys.argv[2] if len(sys.argv) > 2 else ''
        result = skill.search_qcc_enterprises(keyword=keyword)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif cmd == 'get_qcc':
        enterprise_id = int(sys.argv[2]) if len(sys.argv) > 2 else 0
        result = skill.get_qcc_enterprise(enterprise_id)
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif cmd == 'list_events':
        result = skill.list_events()
        print(json.dumps(result, indent=2, ensure_ascii=False))
    elif cmd == 'get_points':
        result = skill.get_points()
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(f"Unknown command: {cmd}")