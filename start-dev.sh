#!/bin/bash
# Quick Dev Server Start Script

echo "🚀 Starting SafeWrite Dev Server..."
echo ""
echo "📱 PWA will be available at:"
echo "   http://localhost:8080"
echo ""
echo "📲 For Android testing (physical device):"
echo "   Find your local IP:"
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
echo "   http://${LOCAL_IP}:8080"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start Python HTTP Server
python3 -m http.server 8080
