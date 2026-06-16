#!/usr/bin/env python3
import json
import re

# Read hunarmand data
with open('tmp_hunarmand_data.json', 'r', encoding='utf-8') as f:
    hunarmand = json.load(f)

# Map for icons - these will be imported from react-icons
icon_map = {
    "E-commerce & Virtual Assistance": "FaShoppingCart",
    "Digital Marketing": "FaBullhorn",
    "E-commerce & Business": "FaStore",
    "Graphic Design & Creative Arts": "FaPaintBrush",
    "Design & User Experience": "FaPalette",
    "Software Development": "FaCode",
    "Web Development": "FaReact",
    "Programming & Development": "FaPython",
    "Media & Creative Arts": "FaFilm",
    "Technology & AI": "FaRobot",
    "Data Science & Analytics": "FaChartLine",
    "Cybersecurity & IT Security": "FaShieldAlt",
    "Language & Education": "FaLanguage",
    "Career & Business": "FaBriefcase",
    "3D Design & Architecture": "FaCube",
    "Fashion & Textile Design": "FaTshirt",
    "Fashion & Textile Arts": "FaCut",
    "Mobile App Development": "FaMobileAlt",
    "Blockchain & Web3": "FaLink",
}

def extract_learning_items(section_data):
    """Extract learning items from section data"""
    items = []
    if "strongs" in section_data:
        items.extend(section_data["strongs"])
    if "lis" in section_data:
        items.extend(section_data["lis"])
    return items

def extract_duration(meta):
    """Extract duration from meta array"""
    if not meta:
        return "3 Months"
    for item in meta:
        if "Duration:" in item:
            return item.replace("Duration:", "").strip()
    return "3 Months"

def generate_slug(title):
    """Generate slug from title"""
    return title.lower().replace(" & ", "-").replace("&", "-").replace(" ", "-").replace("---", "-")

print("Converting hunarmand courses to YETP format...")

courses_data = {}
for title, course_info in hunarmand.items():
    category = course_info.get("category", "Technology")
    icon = icon_map.get(category, "FaBookOpen")
    duration = extract_duration(course_info.get("meta", []))
    tagline = course_info.get("tagline", "")
    
    # Extract description
    description = ""
    if "Course Details" in course_info.get("sections", {}):
        ps = course_info["sections"]["Course Details"].get("ps", [])
        if ps:
            description = ps[0][:150] + "..." if len(ps[0]) > 150 else ps[0]
    
    # Extract what you learn
    whatYouLearn = []
    if "What Will You Learn?" in course_info.get("sections", {}):
        whatYouLearn = extract_learning_items(course_info["sections"]["What Will You Learn?"])[:6]
    
    # Extract prerequisites
    prerequisites = []
    if "Requirements" in course_info.get("sections", {}):
        prerequisites = extract_learning_items(course_info["sections"]["Requirements"])[:3]
    
    # Extract material
    material = []
    if "Material Includes" in course_info.get("sections", {}):
        material = extract_learning_items(course_info["sections"]["Material Includes"])[:4]
    
    # Extract who can join
    who_can_join = []
    intro = ""
    if "Who Can Join This Course?" in course_info.get("sections", {}):
        section = course_info["sections"]["Who Can Join This Course?"]
        who_can_join = section.get("lis", [])[:4]
        ps = section.get("ps", [])
        intro = ps[0] if ps else "This course is open to everyone"
    
    # Benefits
    benefits = course_info.get("benefits", {})
    
    courses_data[title] = {
        "title": title,
        "slug": generate_slug(title),
        "icon": icon,
        "category": category,
        "duration": duration,
        "tagline": tagline,
        "description": description,
        "level": benefits.get("Level", "Beginner to Advanced"),
        "whatYouLearn": whatYouLearn,
        "prerequisites": prerequisites,
        "materialIncludes": material,
        "whoCanJoin": {
            "intro": intro,
            "items": who_can_join,
            "note": "No previous experience is required"
        },
        "benefits": {
            "certificate": benefits.get("Completion Certificate", "Yes"),
            "evaluation": benefits.get("Training Evaluation", "Yes"),
            "language": benefits.get("Language", "Urdu / English")
        },
        "outcomes": [
            f"Master {title.split('&')[0].strip()}",
            "Get industry-recognized certification",
            "Build professional portfolio",
            "Start freelancing opportunities"
        ][:4],
        "internship": False,
        "tools": [],
        "fee": benefits.get("Fee", "Free of Cost"),
        "modules": []
    }

# Output summary
print(f"\nConverted {len(courses_data)} courses")
for title, data in list(courses_data.items())[:5]:
    print(f"✓ {title} -> {data['slug']}")

# Save as TypeScript
output = '// Generated from hunarmand data\nexport const hunarmandCourses = [\n'

for slug, course in courses_data.items():
    title_escaped = course['title'].replace('"', '\\"')
    tagline_escaped = course['tagline'].replace('"', '\\"')
    desc_escaped = course['description'].replace('"', '\\"')
    intro_escaped = course['whoCanJoin']['intro'].replace('"', '\\"')
    
    course_str = f'''  {{
    slug: "{course['slug']}",
    title: "{title_escaped}",
    icon: {course['icon']},
    duration: "{course['duration']}",
    tagline: "{tagline_escaped}",
    description: "{desc_escaped}",
    outcomes: {json.dumps(course['outcomes'][:3])},
    internship: false,
    level: "Beginner to Advanced",
    category: "{course['category']}",
    whatYouLearn: {json.dumps(course['whatYouLearn'][:5])},
    modules: [],
    prerequisites: {json.dumps(course['prerequisites'])},
    materialIncludes: {json.dumps(course['materialIncludes'])},
    whoCanJoin: {{
      intro: "{intro_escaped}",
      items: {json.dumps(course['whoCanJoin']['items'][:3])},
      note: "No previous experience required"
    }},
    benefits: {{
      certificate: "{course['benefits']['certificate']}",
      evaluation: "{course['benefits']['evaluation']}",
      language: "{course['benefits']['language']}"
    }},
    tools: [],
    fee: "{course['fee']}"
  }},
'''
    output += course_str

output += '];\n'

with open('src/data/hunarmand-courses.ts', 'w', encoding='utf-8') as f:
    f.write(output)

print("\n✓ Generated src/data/hunarmand-courses.ts")
