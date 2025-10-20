#!/bin/bash

# Load environment variables
source .env

# Database connection string for Supabase
DB_HOST="db.qfjptqdkthmejxpwbmvq.supabase.co"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres"
DB_PASSWORD="${SUPABASE_DB_PASSWORD}"

echo "🚀 Running database migration..."
echo ""

# Check if psql is available
if command -v psql &> /dev/null; then
    echo "✅ psql found, executing migration..."
    PGPASSWORD="${DB_PASSWORD}" psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f migrations/create_attribute_images_tables.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Migration completed successfully!"
    else
        echo ""
        echo "❌ Migration failed!"
        exit 1
    fi
else
    echo "❌ psql not found. Install PostgreSQL client:"
    echo "   Ubuntu/Debian: sudo apt-get install postgresql-client"
    echo "   MacOS: brew install postgresql"
    echo ""
    echo "Or run the migration manually via Supabase dashboard:"
    echo "   https://app.supabase.com/project/qfjptqdkthmejxpwbmvq/sql/new"
    exit 1
fi
