# Lotamate Skill for OpenClaw

Connect your Lotamate account to OpenClaw and let AI assistants manage your business data.

## Features

- **Contacts**: Search, view, and create contacts
- **Enterprises**: Search companies and view details
- **Opportunities**: Track business opportunities
- **Events**: Browse and register for events
- **AI Features**: Get intelligent recommendations and analysis
- **Points**: Check your points balance

## Quick Start

### Step 1: Get Your API Key

1. Log in to [Lotamate](https://lotamate.com)
2. Go to **Personal Center** → **Agent Connection**
3. Click **Create New Connection**
4. Copy your API Key (starts with `lk_`)

### Step 2: Install the Skill

```bash
# Option A: Install from npm (recommended)
npm install -g @lotamate/skill

# Option B: Clone from GitHub
git clone https://github.com/lotamate/lotamate-skill.git ~/.openclaw/workspace/skills/lotamate
cd ~/.openclaw/workspace/skills/lotamate
npm install && npm run build
```

### Step 3: Configure

Set your API key as environment variable:

```bash
# Add to your shell profile (~/.bashrc, ~/.zshrc, etc.)
export LOTAMATE_API_KEY="lk_your_api_key_here"
```

Or create a `.env` file in the skill directory:

```
LOTAMATE_API_KEY=lk_your_api_key_here
```

### Step 4: Use in OpenClaw

```python
from lotamate import LotamateSkill

# Initialize (uses LOTAMATE_API_KEY from environment)
skill = LotamateSkill()

# Search contacts
contacts = skill.search_contacts("张三")
print(contacts)

# Search enterprises
companies = skill.search_enterprises("科技", limit=5)

# Get recommendations
partners = skill.recommend_partners(industry="互联网", location="北京")
```

## CLI Usage

Test your connection and explore the API:

```bash
# Test connection
lotamate-skill test

# Search contacts
lotamate-skill search-contacts 张三

# Search enterprises
lotamate-skill search-enterprises 科技 --limit 5

# List events
lotamate-skill list-events

# Get points
lotamate-skill get-points
```

## API Reference

### Contacts

```python
# Search contacts
result = skill.search_contacts(keyword="张三", limit=10)

# Get contact details
contact = skill.get_contact(contact_id)

# Create contact
result = skill.create_contact({
    "name": "李四",
    "company": "科技有限公司",
    "title": "CEO",
    "phone": "13800138000"
})
```

### Enterprises

```python
# Search enterprises
result = skill.search_enterprises({
    "keyword": "科技",
    "industry": "互联网",
    "city": "北京",
    "limit": 20
})

# Get enterprise details
enterprise = skill.get_enterprise(enterprise_id)

# Get signed partners
partners = skill.get_signed_partners(enterprise_id)
```

### Opportunities

```python
# List opportunities
result = skill.list_opportunities({
    "status": "new",  # new, follow, progress, success, fail
    "limit": 20
})

# Get opportunity details
opp = skill.get_opportunity(opportunity_id)

# Create opportunity
result = skill.create_opportunity({
    "enterprise_id": 123,
    "title": "合作机会",
    "description": "潜在合作项目"
})
```

### Events

```python
# List events
result = skill.list_events({ "limit": 10 })

# Get event details
event = skill.get_event(event_id)

# Register for event
result = skill.register_event(event_id)
```

### AI Features

```python
# Partner recommendations
partners = skill.recommend_partners({
    "industry": "互联网",
    "location": "北京",
    "useAI": True  # Uses points
})

# Opportunity recommendations
opps = skill.recommend_opportunities({
    "industry": "金融",
    "minAmount": 100000
})

# Contact analysis
analysis = skill.analyze_contacts("network")  # network, industry, or opportunity
```

### Points

```python
# Get balance
balance = skill.get_points()
print(f"Balance: {balance.balance}")

# Get transaction history
records = skill.get_points_records({ "limit": 20 })
```

## Error Handling

```python
try:
    result = skill.search_contacts("张三")
except Exception as e:
    print(f"Error: {e}")
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LOTAMATE_API_KEY` | Yes | Your API key from Lotamate |
| `LOTAMATE_API_URL` | No | API URL (default: https://api.lotamate.com/mcp) |

## Data Privacy

- Each API key is tied to your user account
- All queries are scoped to your data only
- API keys can be revoked at any time from Lotamate settings

## Support

- Documentation: https://docs.lotamate.com
- Issues: https://github.com/lotamate/lotamate-skill/issues
- Email: support@lotamate.com

## License

MIT License - See [LICENSE](LICENSE) for details.