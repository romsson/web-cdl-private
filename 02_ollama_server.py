from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import requests
import socket

HOST = "localhost"
PORT = 8089

LLAMA_HOST = "localhost"
LLAMA_PORT = 11434
LLAMA_URL = f"http://{LLAMA_HOST}:{LLAMA_PORT}/api/generate"

def is_port_open(host: str, port: int) -> bool:
    try:
        with socket.create_connection((host, port), timeout=2):
            return True
    except OSError:
        return False

class ChatHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_POST(self):
        if self.path != "/chat":
            self._send_json({"error": "Not Found"}, status=404)
            return

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        try:
            data = json.loads(body)
            prompt = data.get("prompt", "")
        except json.JSONDecodeError:
            self._send_json({"error": "Invalid JSON"}, status=400)
            return

        if not is_port_open(LLAMA_HOST, LLAMA_PORT):
            self._send_json({"error": f"LLaMA backend is not running on {LLAMA_HOST}:{LLAMA_PORT}"}, status=503)
            return

        try: # forward
            resp = requests.post(
                LLAMA_URL,
                json={"model": "llama2", "prompt": prompt, "stream": False},
                timeout=30
            )
            resp.raise_for_status()
            self._send_json(resp.json())
        except requests.exceptions.RequestException as e:
            self._send_json({"error": str(e)}, status=500)

if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), ChatHandler)
    print(f"Server running at http://{HOST}:{PORT}")
    server.serve_forever()
