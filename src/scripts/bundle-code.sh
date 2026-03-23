#!/bin/bash

OUTPUT_FILE="project-context.txt"

echo "🗜️  Creating compressed backend context bundle (src + prisma files)..."

cat > "$OUTPUT_FILE" << EOF
===CODE-$(date +%Y%m%d)-$(basename "$(pwd)")===
EOF

file_count=0

# Get TypeScript/JavaScript files from src
echo "📁 Processing src/ files..."
git ls-files 2>/dev/null | grep -E "src/.*\.(ts|js)$" | head -20 | while read -r file; do
    [[ ! -f "$file" ]] && continue
    
    echo "Compressing: $file"
    echo "//$file" >> "$OUTPUT_FILE"
    
    # Heavy compression for compact project context output
    cat "$file" | \
        sed 's|//.*$||g' | \
        sed '/console\./d' | \
        sed '/^[[:space:]]*$/d' | \
        sed 's/[[:space:]]*//g' | \
        tr -d '\n' >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    ((file_count++))
done

# Get Prisma files from prisma folder
echo "📁 Processing prisma/ files..."
find prisma -name "*.prisma" 2>/dev/null | while read -r file; do
    [[ ! -f "$file" ]] && continue
    
    echo "Compressing: $file"
    echo "//$file" >> "$OUTPUT_FILE"
    
    # Compress prisma files (keep some structure for readability)
    cat "$file" | \
        sed '/^[[:space:]]*\/\//d' | \
        sed '/^[[:space:]]*$/d' | \
        sed 's/^[[:space:]]*//' | \
        sed 's/[[:space:]]*$//' | \
        tr '\n' ' ' | \
        sed 's/[[:space:]]\+/ /g' >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
    ((file_count++))
done

echo "===$file_count-files===" >> "$OUTPUT_FILE"

actual_size=$(du -k "$OUTPUT_FILE" | cut -f1)
echo "✅ Backend bundle: $OUTPUT_FILE ($(du -h "$OUTPUT_FILE" | cut -f1))"
echo "🤖 Estimated tokens: ~$((actual_size * 4))"
echo "📊 Files processed: $file_count"
echo "🗜️  Compression applied"

# Show what was found
echo ""
echo "📋 Files included:"
echo "  TypeScript/JS files:"
git ls-files 2>/dev/null | grep -E "src/.*\.(ts|js)$" | head -10
echo "  Prisma files:"
find prisma -name "*.prisma" 2>/dev/null
