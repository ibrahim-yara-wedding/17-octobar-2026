import os
import re

# --- CONFIGURATION ---
VERSION = "_2"  # Increment this for every new production build
GENERAL_DIRS = ['css', 'js', 'videos', 'fonts']
TARGET_SUB_FOLDERS = ['images/gallery', 'images/illustrations']
HTML_FILE = 'index.html'

def rename_assets():
    # 1. Rename files in general directories
    for directory in GENERAL_DIRS:
        if not os.path.exists(directory): continue
        for filename in os.listdir(directory):
            if VERSION in filename: continue
            name, ext = os.path.splitext(filename)
            new_name = f"{name}{VERSION}{ext}"
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
            print(f"Renamed: {filename} -> {new_name}")

    # 2. Rename only FILES inside sub-folders (Folder names remain the same)
    for folder in TARGET_SUB_FOLDERS:
        if not os.path.exists(folder): continue
        for root, dirs, files in os.walk(folder):
            for filename in files:
                if VERSION in filename: continue
                name, ext = os.path.splitext(filename)
                new_name = f"{name}{VERSION}{ext}"
                os.rename(os.path.join(root, filename), os.path.join(root, new_name))
                print(f"Renamed file inside {folder}: {filename} -> {new_name}")

def update_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for general assets
    gen_pattern = r'(\.(css|js|mp4|woff2|woff))(?=["\'\?])'
    content = re.sub(gen_pattern, f"{VERSION}\\1", content)

    # Pattern for files inside targeted sub-folders
    # This matches: images/gallery/photo.jpg -> images/gallery/photo_2.jpg
    def img_replacement(match):
        path = match.group(0)
        return re.sub(r'(\.[^.]+)$', f'{VERSION}\\1', path)

    for folder in TARGET_SUB_FOLDERS:
        # Matches files inside the specific target folders
        pattern = rf'({folder}/.*?)(?:\.jpg|\.png|\.webp|\.jpeg|\.svg)'
        content = re.sub(pattern, img_replacement, content)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated all file references in {HTML_FILE}")

if __name__ == "__main__":
    rename_assets()
    update_html()