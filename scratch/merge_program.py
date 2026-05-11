import os

source_path = r'C:/Users/DELL/Downloads/program.html'
target_path = r'c:/Users/DELL/Desktop/Dev-Git-Grave/pragmaticstep/public/program.html'

with open(source_path, 'r', encoding='utf-8') as f:
    source_lines = f.readlines()

with open(target_path, 'r', encoding='utf-8') as f:
    target_lines = f.readlines()

# Extract styles from source (0-indexed)
source_styles_content = "".join(source_lines[10:218]) # Lines 11-218 in 1-indexed

# Body sections from source (0-indexed)
# Philosophy starts at line 248 (index 247)
# Comparison ends at line 556 (index 555)
source_content = "".join(source_lines[247:556])

# Font links from source (0-indexed)
# Lines 7-9 (index 6-9)
font_links = "".join(source_lines[6:10])

# For the target file:
# Keep head up to line 37 (index 0-37)
# Insert font links
# Insert new styles
# Keep target lines 1993-2023 (index 1992-2023) -> structural + hero
# Insert new content
# Keep target lines 2637-end (index 2636-end)

new_target = target_lines[:37]
new_target.append(font_links)
new_target.append("<style>\n")

# Hero styles from original target
# Lines 164-298 (index 163-298)
hero_styles = "".join(target_lines[163:298])
new_target.append(hero_styles)
new_target.append(source_styles_content)
new_target.append("</style>\n")

new_target.extend(target_lines[1992:2023]) # structural + hero
new_target.append(source_content)
new_target.extend(target_lines[2636:])

with open(target_path, 'w', encoding='utf-8') as f:
    f.writelines(new_target)

print("Done")
