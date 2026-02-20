#!/usr/bin/env python3
"""
Convert Content Management.xlsx into src/data/content.json

Usage:
  pip install pandas openpyxl
  python scripts/generate-content.py

The Excel source lives in data/content-management.xlsx (private, never served).
After editing the Excel, re-run this script and rebuild.
"""

import json, sys, os
import pandas as pd

EXCEL = os.path.join(os.path.dirname(__file__), '..', 'data', 'content-management.xlsx')
OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'content.json')

xls = pd.ExcelFile(EXCEL)

# ── Supported by ──
df = pd.read_excel(xls, sheet_name='Supported by')
df = df[df['To be published'] == True]
df = df[df['Company Name'].notna()]
sponsors = []
for _, r in df.iterrows():
    sponsors.append({
        'name': str(r['Company Name']),
        'logo': str(r['Logo']) if pd.notna(r['Logo']) else '',
        'link': str(r['Link']) if pd.notna(r['Link']) else '',
        'type': str(r['Type']) if pd.notna(r['Type']) else 'Backers',
    })

# ── Quotes ──
df = pd.read_excel(xls, sheet_name='Quotes')
df = df[df['To be published'] == True]
df = df[df['Quote'].notna()]
quotes = []
for _, r in df.iterrows():
    quotes.append({
        'name': str(r['Name']) if pd.notna(r['Name']) else '',
        'title': str(r['Title']) if pd.notna(r['Title']) else '',
        'org': str(r['Sector/Company']) if pd.notna(r['Sector/Company']) else '',
        'quote': str(r['Quote']).strip(),
    })

# ── Resources (by language) ──
df = pd.read_excel(xls, sheet_name='Resources')
df = df[df['Title'].notna()]
resources = {'en': [], 'nl': [], 'fr': []}
for _, r in df.iterrows():
    lang = str(r['Language']).strip().lower() if pd.notna(r['Language']) else 'en'
    if lang not in resources:
        continue
    resources[lang].append({
        'title': str(r['Title']).strip(),
        'category': str(r['Category']) if pd.notna(r['Category']) else 'Link',
        'picture': str(r['Picture']) if pd.notna(r['Picture']) else '',
        'url': str(r['URL']) if pd.notna(r['URL']) else '',
        'siteName': str(r['Site Name']) if pd.notna(r['Site Name']) else '',
        'description': str(r['Description']).strip() if pd.notna(r['Description']) and str(r['Description']).strip() != 'Description not found' else '',
    })

# ── FAQs ──
df = pd.read_excel(xls, sheet_name='FAQs')
df = df[df['Question'].notna()]
df = df[df['To be published'] != False] if 'To be published' in df.columns else df
faqs = []
for _, r in df.iterrows():
    faqs.append({
        'q': str(r['Question']).strip(),
        'a': str(r['Answer']).strip() if pd.notna(r['Answer']) else '',
    })

content = {
    'sponsors': sponsors,
    'quotes': quotes,
    'resources': resources,
    'faqs': faqs,
}

with open(OUTPUT, 'w', encoding='utf-8') as f:
    json.dump(content, f, ensure_ascii=False, indent=2)

print(f"Generated {OUTPUT}")
print(f"  Sponsors: {len(sponsors)}")
print(f"  Quotes: {len(quotes)}")
print(f"  Resources EN: {len(resources['en'])}, NL: {len(resources['nl'])}, FR: {len(resources['fr'])}")
print(f"  FAQs: {len(faqs)}")
