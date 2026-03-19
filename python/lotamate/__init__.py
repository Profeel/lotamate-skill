"""
Lotamate Skill for OpenClaw

Connect your Lotamate account to OpenClaw and let AI assistants manage your business data.
"""

from .skill import LotamateSkill, LotamateError, LotamateConfig, get_skill

__version__ = '1.0.0'
__all__ = ['LotamateSkill', 'LotamateError', 'LotamateConfig', 'get_skill']

# CLI entry point
def main():
    """CLI entry point when run as python -m lotamate.skill"""
    import sys
    import os

    # Support LOTAMATE_API_KEY environment variable
    api_key = os.environ.get('LOTAMATE_API_KEY')
    base_url = os.environ.get('LOTAMATE_API_URL', 'https://api.lotamate.com/mcp')

    skill = LotamateSkill(api_key=api_key, base_url=base_url)

    if len(sys.argv) < 2:
        print("Usage: python -m lotamate.skill <command> [args]")
        print("Commands: test, search_contacts, search_enterprises, list_events, get_points")
        sys.exit(1)

    cmd = sys.argv[1]

    try:
        if cmd == 'test':
            result = skill.check_connection()
            print(f"{'✓' if result['success'] else '✗'} {result['message']}")
        elif cmd == 'search_contacts':
            keyword = sys.argv[2] if len(sys.argv) > 2 else ''
            result = skill.search_contacts(keyword)
            print(result)
        elif cmd == 'search_enterprises':
            keyword = sys.argv[2] if len(sys.argv) > 2 else ''
            result = skill.search_enterprises(keyword)
            print(result)
        elif cmd == 'list_events':
            result = skill.list_events()
            print(result)
        elif cmd == 'get_points':
            result = skill.get_points()
            print(result)
        else:
            print(f"Unknown command: {cmd}")
            sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
