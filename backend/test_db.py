import os
from dotenv import load_dotenv

# Load backend/.env regardless of working directory
BASE_DIR = os.path.dirname(__file__)
load_dotenv(os.path.join(BASE_DIR, ".env"))

from database import get_db

try:
    db = get_db()
    print("Database connection successful")

    # Test fetching letters
    letters = list(db.letters.find())
    print(f"Found {len(letters)} letters in database")

    if letters:
        print("Sample letter IDs:")
        for letter in letters[:5]:  # Show first 5
            print(f"  - {letter.get('_id')}")

except Exception as e:
    print(f"Database connection failed: {e}")
