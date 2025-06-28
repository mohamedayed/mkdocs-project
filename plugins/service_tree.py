# plugins/service_tree/plugin.py
import os
import json
from mkdocs.plugins import BasePlugin
from mkdocs.config import config_options

class ServiceTreePlugin(BasePlugin):
    config_scheme = (
        ('json_path', config_options.Type(str, default='assets/data/services.json')),
        ('output_file', config_options.Type(str, default='docs/sidebar/services.md')),
    )

    def on_pre_build(self, config):
        json_path = self.config['json_path']
        output_file = self.config['output_file']

        if not os.path.exists(json_path):
            print(f"[ServiceTreePlugin] JSON not found: {json_path}")
            return

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        tree = data.get("serviceList", {}).get("serviceCategory", [])
        md = self.render_tree(tree)

        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(md)

    def render_tree(self, categories, level=0):
        md = ""
        for cat in categories:
            indent = "  " * level
            name = cat.get("name", "📂 بدون اسم")
            md += f"{indent}- **{name}**\n"

            for service in cat.get("services", []):
                service_name = service.get("serviceName", "🧾 خدمة")
                md += f"{indent}  - {service_name}\n"

            sub = cat.get("serviceCategory", [])
            if sub:
                md += self.render_tree(sub, level + 1)
        return md
