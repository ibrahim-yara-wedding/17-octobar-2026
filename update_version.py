import os
import re

# --- CONFIGURATION ---
OLD_VERSION_PATTERN = r"_\d+"  # Matches _1, _2, etc.
NEW_VERSION = "_3"             # The version you want to move to
GENERAL_DIRS = ['css', 'js', 'videos', 'fonts']
TARGET_SUB_FOLDERS = ['images/gallery', 'images/illustrations']
HTML_FILE = 'index.html'

def get_new_filename(filename):
    name, ext = os.path.splitext(filename)
    # Remove any existing version suffix if present
    base_name = re.sub(OLD_VERSION_PATTERN, "", name)
    return f"{base_name}{NEW_VERSION}{ext}"

def rename_assets():
    # 1. Rename files in general directories and sub-folders
    all_targets = GENERAL_DIRS + TARGET_SUB_FOLDERS
    
    for target in all_targets:
        if not os.path.exists(target): continue
        
        for root, dirs, files in os.walk(target):
            for filename in files:
                # Skip if it already has the new version
                if filename.endswith(f"{NEW_VERSION}{os.path.splitext(filename)[1]}"):
                    continue
                
                new_name = get_new_filename(filename)
                os.rename(os.path.join(root, filename), os.path.join(root, new_name))
                print(f"Renamed: {filename} -> {new_name}")

def update_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex logic: 
    # 1. Find names that might have an old version (e.g., file_1.jpg)
    # 2. Strip the old version, append the new version
    def replace_ref(match):
        full_path = match.group(0)
        # Separate path/name from extension
        path_without_ext, ext = os.path.splitext(full_path)
        # Strip old version from the path
        clean_path = re.sub(OLD_VERSION_PATTERN, "", path_without_ext)
        return f"{clean_path}{NEW_VERSION}{ext}"

    # Target common extensions
    extensions = r'\.(css|js|mp4|woff2|woff|jpg|jpeg|png|webp|svg)'
    # Matches file paths that end with the extensions above
    pattern = rf'[\w\./-]+{extensions}'
    
    content = re.sub(pattern, replace_ref, content)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated all file references in {HTML_FILE}")

if __name__ == "__main__":
    rename_assets()
    update_html()