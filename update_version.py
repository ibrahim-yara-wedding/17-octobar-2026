import os
import re

# --- CONFIGURATION ---
VERSION = "_2"
ASSET_DIRS = ['css', 'js', 'images', 'videos', 'fonts']
HTML_FILE = 'index.html'

def rename_assets():
    for directory in ASSET_DIRS:
        if not os.path.exists(directory):
            continue
            
        for filename in os.listdir(directory):
            # Skip if already versioned
            if VERSION in filename:
                continue
            
            # Split filename and extension
            name, ext = os.path.splitext(filename)
            new_name = f"{name}{VERSION}{ext}"
            
            # Rename file
            os.rename(os.path.join(directory, filename), 
                      os.path.join(directory, new_name))
            print(f"Renamed: {filename} -> {new_name}")

def update_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex looks for common asset extensions and inserts the version tag
    # Matches: style.css, script.js, image.png, etc.
    pattern = r'(\.(css|js|png|jpg|webp|mp4|woff2|woff))(?=["\'\?])'
    updated_content = re.sub(pattern, f"{VERSION}\\1", content)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print(f"Updated references in {HTML_FILE}")

if __name__ == "__main__":
    rename_assets()
    update_html()