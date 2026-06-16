import json, re

SRC = "D:/Desktop/empower-path/src/data/yetp.ts"
UPDATES = "D:/Desktop/empower-path/tmp_course_updates.json"

updates = json.load(open(UPDATES, encoding="utf-8"))

def js_str(s):
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    s = s.replace("\n", "\\n")
    return s

def js_array(items, item_indent, close_indent):
    lines = "".join('{0}"{1}",\n'.format(item_indent, js_str(it)) for it in items)
    return "[\n{0}{1}]".format(lines, close_indent)

text = open(SRC, encoding="utf-8").read()

slug_pattern = re.compile(r'\n  \{\n    slug: "([a-z0-9-]+)",')
matches = list(slug_pattern.finditer(text))
print("found", len(matches), "courses")

DESC_RE = re.compile(r'description:\s*\n\s*"(?:[^"\\]|\\.)*",\n')
CAT_RE = re.compile(r'category: "[^"]*",\n')
WYL_RE = re.compile(r'whatYouLearn: \[\n(?:      "[^"]*",\n)+    \],\n')
PRE_RE = re.compile(r'prerequisites: \[\n(?:      "[^"]*",\n)+    \],\n')
DUR_RE = re.compile(r'(duration: "[^"]*",\n)')
PRE_FIND_RE = re.compile(r'prerequisites: \[\n(?:.*\n)*?    \],\n')

for idx in range(len(matches) - 1, -1, -1):
    m = matches[idx]
    slug = m.group(1)
    block_start = m.start()
    next_start = matches[idx+1].start() if idx+1 < len(matches) else text.index("\n];", block_start)
    block = text[block_start:next_start]

    end_match = None
    for em in re.finditer(r'\n  \},', block):
        end_match = em
    assert end_match, "no closing brace found for " + slug
    block_end_in_block = end_match.end()
    block_full = block[:block_end_in_block]
    block_after = block[block_end_in_block:]

    u = updates[slug]

    new_desc = 'description:\n      "{0}",\n'.format(js_str(u["description"]))
    block_full, n1 = DESC_RE.subn(lambda mm: new_desc, block_full, count=1)
    assert n1 == 1, "desc fail " + slug

    new_cat = 'category: "{0}",\n'.format(js_str(u["category"]))
    block_full, n2 = CAT_RE.subn(lambda mm: new_cat, block_full, count=1)
    assert n2 == 1, "cat fail " + slug

    new_wyl = 'whatYouLearn: ' + js_array(u["whatYouLearn"], "      ", "    ") + ',\n'
    block_full, n3 = WYL_RE.subn(lambda mm: new_wyl, block_full, count=1)
    assert n3 == 1, "wyl fail " + slug

    new_pre = 'prerequisites: ' + js_array(u["requirements"], "      ", "    ") + ',\n'
    block_full, n4 = PRE_RE.subn(lambda mm: new_pre, block_full, count=1)
    assert n4 == 1, "pre fail " + slug

    tagline_line = '    tagline: "{0}",\n'.format(js_str(u["tagline"]))
    block_full, n5 = DUR_RE.subn(lambda mm: mm.group(1) + tagline_line, block_full, count=1)
    assert n5 == 1, "tagline fail " + slug

    who_can_join = (
        "    whoCanJoin: {\n"
        + '      intro: "' + js_str(u["whoCanJoinIntro"]) + '",\n'
        + "      items: " + js_array(u["whoCanJoinItems"], "        ", "      ") + ",\n"
        + '      note: "' + js_str(u["whoCanJoinNote"]) + '",\n'
        + "    },\n"
    )
    material_includes = "    materialIncludes: " + js_array(u["materialIncludes"], "      ", "    ") + ",\n"
    benefits = (
        "    benefits: {\n"
        '      certificate: "Yes",\n'
        '      evaluation: "Yes",\n'
        '      language: "Urdu / English",\n'
        "    },\n"
    )
    extra = who_can_join + material_includes + benefits

    pre_match = PRE_FIND_RE.search(block_full)
    assert pre_match, "prereq find fail " + slug
    insert_pos = pre_match.end()
    block_full = block_full[:insert_pos] + extra + block_full[insert_pos:]

    new_block = block_full + block_after
    text = text[:block_start] + new_block + text[next_start:]
    print("updated", slug)

with open(SRC, "w", encoding="utf-8") as f:
    f.write(text)
print("done")
