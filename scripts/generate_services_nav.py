import os
import json

# Input path to your JSON service structure
json_path = "docs/assets/data/services.json"
# Output path for generated nav YAML
output_yaml_path = "generated/generated_nav.yml"

os.makedirs(os.path.dirname(output_yaml_path), exist_ok=True)

def sanitize_filename(name):
    return name.strip().lower().replace(" ", "-").replace("ـ", "").replace("(", "").replace(")", "")

def write_service_nav(service, indent=2):
    name = service.get("serviceName", "Unnamed Service")
    service_id = service.get("serviceID", "")
    fake_path = f"services/{sanitize_filename(name)}-{service_id}.md"
    return f"{' ' * indent}- \"{name} ({service_id})\": {fake_path}\n"

def walk_category_yaml(cat, indent=0):
    output = f"{' ' * indent}- \"{cat.get('name', 'Unnamed Category')}\":\n"
    indent += 2
    if "services" in cat:
        for svc in cat["services"]:
            output += write_service_nav(svc, indent)
    if "serviceCategory" in cat:
        for sub in cat["serviceCategory"]:
            output += walk_category_yaml(sub, indent)
    return output

def generate_yaml_nav():
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    categories = data.get("serviceList", {}).get("serviceCategory", [])
    result = ""
    for cat in categories:
        result += walk_category_yaml(cat)

    with open(output_yaml_path, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"✅ Sidebar nav YAML generated at: {output_yaml_path}")

if __name__ == "__main__":
    generate_yaml_nav()
