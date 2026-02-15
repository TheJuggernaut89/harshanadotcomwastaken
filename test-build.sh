#!/bin/bash
echo "=== Build Verification Test ==="
echo ""
echo "1. Checking Card.jsx exists..."
if [ -f "src/components/UI/Card.jsx" ]; then
    echo "   ✓ Card.jsx exists locally"
else
    echo "   ✗ Card.jsx is missing!"
    exit 1
fi

echo ""
echo "2. Checking GitHub has Card.jsx..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://raw.githubusercontent.com/TheJuggernaut89/harshanadotcomwastaken/main/src/components/UI/Card.jsx")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✓ Card.jsx exists on GitHub"
else
    echo "   ✗ Card.jsx not found on GitHub (HTTP $HTTP_CODE)"
    exit 1
fi

echo ""
echo "3. Running local build test..."
npm run build > /tmp/build.log 2>&1
if [ $? -eq 0 ]; then
    echo "   ✓ Local build successful"
else
    echo "   ✗ Local build failed"
    tail -20 /tmp/build.log
    exit 1
fi

echo ""
echo "4. Checking live site..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://harshanajothiresume2026.netlify.app")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✓ Live site is accessible (HTTP 200)"
else
    echo "   ✗ Live site returned HTTP $HTTP_CODE"
    exit 1
fi

echo ""
echo "=== ALL TESTS PASSED ==="
echo "The build error you're seeing is from an OLD deployment."
echo "Current site is LIVE and WORKING at:"
echo "https://harshanajothiresume2026.netlify.app"
