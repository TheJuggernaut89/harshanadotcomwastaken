import json
from pathlib import Path
from collections import Counter

def extract_user_messages(jsonl_file, max_lines=10000):
    """Extract user messages from JSONL conversation file."""
    user_messages = []

    with open(jsonl_file, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i >= max_lines:
                break
            try:
                data = json.loads(line)
                if 'message' in data:
                    msg = data['message']
                    if isinstance(msg, dict) and msg.get('role') == 'user':
                        content = msg.get('content', '')
                        if content and isinstance(content, str):
                            user_messages.append(content)
            except Exception as e:
                continue

    return user_messages

def analyze_personality(messages):
    """Deep analysis of Sean's personality and communication patterns."""

    analysis = {
        'tone_indicators': {
            'direct_requests': [],
            'frustrated_moments': [],
            'enthusiastic_moments': [],
            'questioning': [],
            'casual_language': []
        },
        'technical_approach': {
            'tool_mentions': [],
            'architecture_decisions': [],
            'problem_identification': []
        },
        'projects': {
            'portfolio': [],
            'legal_transcription': [],
            'cream_of_creams': []
        },
        'soft_skills_evidence': {
            'iteration': [],
            'learning': [],
            'autonomy': [],
            'vision': []
        }
    }

    for msg in messages:
        msg_lower = msg.lower()

        # Tone analysis
        if any(word in msg_lower for word in ['shit', 'fuck', 'retard', 'dumbass', 'balls']):
            analysis['tone_indicators']['frustrated_moments'].append(msg[:200])

        if '!' in msg and any(word in msg_lower for word in ['great', 'works', 'better', 'yes', 'perfect']):
            analysis['tone_indicators']['enthusiastic_moments'].append(msg[:200])

        if msg.startswith(('Can ', 'can ', 'How ', 'how ', 'What ', 'what ', 'Why ', 'why ')):
            analysis['tone_indicators']['questioning'].append(msg[:200])

        # Technical approach
        if any(tech in msg_lower for tech in ['api', 'deploy', 'github', 'netlify', 'vercel', 'react', 'typescript', 'tailwind']):
            analysis['technical_approach']['tool_mentions'].append(msg[:300])

        # Projects
        if 'chatbot' in msg_lower or 'resume' in msg_lower or 'portfolio' in msg_lower:
            analysis['projects']['portfolio'].append(msg[:300])

        if 'legal' in msg_lower or 'transcription' in msg_lower or 'whisper' in msg_lower:
            analysis['projects']['legal_transcription'].append(msg[:300])

        if 'cream' in msg_lower:
            analysis['projects']['cream_of_creams'].append(msg[:300])

        # Soft skills
        if any(word in msg_lower for word in ['improve', 'better', 'adjust', 'refine', 'optimize']):
            analysis['soft_skills_evidence']['iteration'].append(msg[:200])

        if any(word in msg_lower for word in ['autonomous', 'work on this', 'figure out', 'decide']):
            analysis['soft_skills_evidence']['autonomy'].append(msg[:200])

        if any(word in msg_lower for word in ['i want', 'my goal', 'my vision', 'i need']):
            analysis['soft_skills_evidence']['vision'].append(msg[:200])

    return analysis

def main():
    current_file = Path.home() / '.claude' / 'projects' / 'C--Users-ASUS-Downloads-enhanced-portfolio' / 'b0db20ef-0fec-4d8a-8a0a-759fb1b9b610.jsonl'
    older_file = Path.home() / '.claude' / 'projects' / 'C--Users-ASUS-Downloads-enhanced-portfolio' / '374cc625-5192-40a7-b8e0-eb3788a79008.jsonl'

    print("="*100)
    print("SEAN'S CONVERSATION ANALYSIS - DETAILED PERSONALITY & SOFT SKILLS EXTRACTION")
    print("="*100)

    current_messages = extract_user_messages(current_file, max_lines=10000)
    older_messages = extract_user_messages(older_file, max_lines=10000)

    all_messages = current_messages + older_messages

    print(f"\nTotal messages analyzed: {len(all_messages)}")
    print(f"  - Current session: {len(current_messages)}")
    print(f"  - Older session: {len(older_messages)}")

    # Print all messages from OLDER session
    print("\n" + "="*100)
    print("ALL MESSAGES FROM OLDER SESSION (Project History)")
    print("="*100)

    for i, msg in enumerate(older_messages):
        try:
            clean_msg = msg[:1000].encode('utf-8', errors='ignore').decode('utf-8')
            print(f"\n--- Older Message {i+1} ---")
            print(clean_msg)
        except:
            print("[Encoding error]")

    # Detailed analysis
    analysis = analyze_personality(all_messages)

    print("\n" + "="*100)
    print("PERSONALITY & SOFT SKILLS ANALYSIS")
    print("="*100)

    print("\n### 1. COMMUNICATION TONE & STYLE")
    print("\n** Frustrated/Direct Moments (shows honesty, no-BS attitude):")
    for i, ex in enumerate(analysis['tone_indicators']['frustrated_moments'][:5]):
        print(f"{i+1}. {ex}")

    print("\n** Enthusiastic/Positive Moments (shows engagement):")
    for i, ex in enumerate(analysis['tone_indicators']['enthusiastic_moments'][:5]):
        print(f"{i+1}. {ex}")

    print("\n** Questions Asked (shows curiosity, learning mindset):")
    for i, ex in enumerate(analysis['tone_indicators']['questioning'][:10]):
        print(f"{i+1}. {ex}")

    print("\n### 2. TECHNICAL APPROACH")
    print("\n** Tool/Tech Mentions (First 15):")
    for i, ex in enumerate(analysis['technical_approach']['tool_mentions'][:15]):
        print(f"{i+1}. {ex}")

    print("\n### 3. PROJECT STORIES")
    print("\n** Portfolio/Chatbot Project (First 10):")
    for i, ex in enumerate(analysis['projects']['portfolio'][:10]):
        print(f"{i+1}. {ex}")

    print("\n** Legal Transcription Project (First 10):")
    for i, ex in enumerate(analysis['projects']['legal_transcription'][:10]):
        print(f"{i+1}. {ex}")

    print("\n### 4. SOFT SKILLS EVIDENCE")
    print("\n** Iteration & Improvement Mindset:")
    for i, ex in enumerate(analysis['soft_skills_evidence']['iteration'][:8]):
        print(f"{i+1}. {ex}")

    print("\n** Autonomy & Initiative:")
    for i, ex in enumerate(analysis['soft_skills_evidence']['autonomy'][:8]):
        print(f"{i+1}. {ex}")

    print("\n** Vision & Goal-Oriented:")
    for i, ex in enumerate(analysis['soft_skills_evidence']['vision'][:8]):
        print(f"{i+1}. {ex}")

if __name__ == '__main__':
    main()
