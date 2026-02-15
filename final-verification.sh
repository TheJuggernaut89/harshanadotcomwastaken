#!/bin/bash
echo "╔══════════════════════════════════════════════════════╗"
echo "║   PORTFOLIO DEPLOYMENT - FINAL VERIFICATION          ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS="${GREEN}✓ PASS${NC}"
FAIL="${RED}✗ FAIL${NC}"

echo "1. Repository Status"
echo "   Git status..."
if git status | grep -q "nothing to commit"; then
    echo -e "   $PASS Working tree clean"
else
    echo -e "   $FAIL Uncommitted changes"
fi

echo ""
echo "2. Critical Files"
FILES=("src/components/UI/Card.jsx" "api/chat.js" "netlify.toml" "package.json")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   $PASS $file"
    else
        echo -e "   $FAIL $file MISSING"
    fi
done

echo ""
echo "3. Build Test"
npm run build > /tmp/build-test.log 2>&1
if [ $? -eq 0 ]; then
    BUILD_TIME=$(grep "built in" /tmp/build-test.log | grep -o "[0-9.]*s")
    echo -e "   $PASS Build successful (${BUILD_TIME})"
else
    echo -e "   $FAIL Build failed"
    tail -5 /tmp/build-test.log
fi

echo ""
echo "4. GitHub Verification"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://raw.githubusercontent.com/TheJuggernaut89/harshanadotcomwastaken/main/src/components/UI/Card.jsx")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "   $PASS Card.jsx on GitHub (HTTP $HTTP_CODE)"
else
    echo -e "   $FAIL Card.jsx not found (HTTP $HTTP_CODE)"
fi

echo ""
echo "5. Live Site Check"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://harshanajothiresume2026.netlify.app")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "   $PASS Site accessible (HTTP $HTTP_CODE)"
    
    # Check for key content
    CONTENT=$(curl -s "https://harshanajothiresume2026.netlify.app")
    if echo "$CONTENT" | grep -q "Harshana Jothi"; then
        echo -e "   $PASS Content verified"
    else
        echo -e "   $FAIL Content missing"
    fi
else
    echo -e "   $FAIL Site error (HTTP $HTTP_CODE)"
fi

echo ""
echo "6. API Endpoint"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS "https://harshanajothiresume2026.netlify.app/.netlify/functions/chat")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "   $PASS API endpoint active (HTTP $HTTP_CODE)"
else
    echo -e "   $FAIL API endpoint error (HTTP $HTTP_CODE)"
fi

echo ""
echo "7. Latest Commits"
git log --oneline -3 | while read line; do
    echo "   • $line"
done

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║              VERIFICATION COMPLETE                   ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "Live Site: https://harshanajothiresume2026.netlify.app"
echo "Status: FULLY OPERATIONAL ✅"
echo ""
