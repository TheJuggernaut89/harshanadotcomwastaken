import json
import re
from pathlib import Path

def extract_user_messages(jsonl_file, max_lines=10000):
    """Extract user messages from JSONL conversation file."""
    user_messages = []

    with open(jsonl_file, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i >= max_lines:
                break
            try:
                data = json.loads(line)
                # Check if this is a user message
                if 'message' in data:
                    msg = data['message']
                    if isinstance(msg, dict) and msg.get('role') == 'user':
                        content = msg.get('content', '')
                        if content and isinstance(content, str):
                            user_messages.append(content)
            except Exception as e:
                continue

    return user_messages

def analyze_messages(messages):
    """Analyze messages for personality traits and patterns."""

    insights = {
        'problem_solving': [],
        'communication_style': [],
        'work_ethic': [],
        'soft_skills': [],
        'project_stories': [],
        'personality_traits': [],
        'phrases': []
    }

    for msg in messages:
        msg_lower = msg.lower()

        # Problem-solving patterns
        if any(word in msg_lower for word in ['fix', 'debug', 'issue', 'problem', 'bug', 'error']):
            insights['problem_solving'].append(msg[:300])

        # Project mentions
        if any(word in msg_lower for word in ['cream of creams', 'legal transcription', 'portfolio', 'chatbot']):
            insights['project_stories'].append(msg[:300])

        # Communication style indicators
        if '!' in msg or '?' in msg:
            insights['communication_style'].append(msg[:200])

        # Work ethic indicators
        if any(word in msg_lower for word in ['improve', 'optimize', 'better', 'enhance', 'refactor']):
            insights['work_ethic'].append(msg[:300])

        # Extract common phrases (save first few words of each message)
        if len(msg.split()) > 2:
            first_words = ' '.join(msg.split()[:5])
            insights['phrases'].append(first_words)

    return insights

def main():
    # File paths
    current_file = Path.home() / '.claude' / 'projects' / 'C--Users-ASUS-Downloads-enhanced-portfolio' / 'b0db20ef-0fec-4d8a-8a0a-759fb1b9b610.jsonl'
    older_file = Path.home() / '.claude' / 'projects' / 'C--Users-ASUS-Downloads-enhanced-portfolio' / '374cc625-5192-40a7-b8e0-eb3788a79008.jsonl'

    print("Extracting messages from current session...")
    current_messages = extract_user_messages(current_file, max_lines=500)
    print(f"Found {len(current_messages)} user messages in current session")

    print("\nExtracting messages from older session...")
    older_messages = extract_user_messages(older_file, max_lines=500)
    print(f"Found {len(older_messages)} user messages in older session")

    all_messages = current_messages + older_messages

    print("\n" + "="*80)
    print("FIRST 100 USER MESSAGES (CURRENT SESSION)")
    print("="*80)

    for i, msg in enumerate(current_messages[:100]):
        print(f"\n--- Message {i+1} ---")
        # Clean the message for display
        try:
            clean_msg = msg[:800].encode('utf-8', errors='ignore').decode('utf-8')
            print(clean_msg)
        except:
            print("[Message encoding error]")

    print("\n" + "="*80)
    print("ANALYSIS")
    print("="*80)

    insights = analyze_messages(all_messages)

    print("\n### PROBLEM-SOLVING EXAMPLES (First 10):")
    for i, example in enumerate(insights['problem_solving'][:10]):
        print(f"{i+1}. {example}\n")

    print("\n### PROJECT STORIES (First 10):")
    for i, example in enumerate(insights['project_stories'][:10]):
        print(f"{i+1}. {example}\n")

    print("\n### COMMUNICATION STYLE (First 10):")
    for i, example in enumerate(insights['communication_style'][:10]):
        print(f"{i+1}. {example}\n")

    print("\n### WORK ETHIC EXAMPLES (First 10):")
    for i, example in enumerate(insights['work_ethic'][:10]):
        print(f"{i+1}. {example}\n")

    print("\n### COMMON OPENING PHRASES (First 20):")
    phrase_counts = {}
    for phrase in insights['phrases']:
        phrase_counts[phrase] = phrase_counts.get(phrase, 0) + 1

    sorted_phrases = sorted(phrase_counts.items(), key=lambda x: x[1], reverse=True)
    for phrase, count in sorted_phrases[:20]:
        print(f"{count}x: {phrase}")

if __name__ == '__main__':
    main()
