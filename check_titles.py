import json
import re

updates = json.load(open('tmp_course_updates.json', encoding='utf-8'))
hunarmand = json.load(open('tmp_hunarmand_data.json', encoding='utf-8'))

print("Updates slugs:")
print(list(updates.keys()))

print("\nHunarmand titles:")
print(list(hunarmand.keys()))
