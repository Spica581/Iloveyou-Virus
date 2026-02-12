from fastapi import APIRouter, HTTPException
from bson import ObjectId
import logging
from database import get_db
from models import Letter
from datetime import datetime
import os

router = APIRouter(prefix="/letters", tags=["letters"])
logger = logging.getLogger("uvicorn.error")

ADMIN_TOKEN = os.getenv("ADMIN_PASSWORD")

def admin_only(token: str):
    if token != ADMIN_TOKEN:
        raise HTTPException(401, "Admin access required")

@router.post("/")
def create_letter(letter: Letter, admin_token: str):
    admin_only(admin_token)
    db = get_db()
    letter.updatedAt = datetime.utcnow()

    data = letter.dict(by_alias=True)
    # Remove _id if None so MongoDB generates one
    if data.get("_id") is None:
        data.pop("_id", None)

    result = db.letters.insert_one(data)
    return {"id": str(result.inserted_id), "message": "Letter created!"}

@router.get("/admin/all")
def get_all_letters(admin_token: str):
    admin_only(admin_token)
    db = get_db()
    letters = list(db.letters.find())
    return [
        {
            "id": str(letter["_id"]),
            "from_name": letter.get("from_name"),
            "to_name": letter.get("to_name"),
            "date": letter.get("date"),
            "content": letter.get("content"),
            "colors": letter.get("colors"),
            "hidden_message": letter.get("hidden_message"),
            "music_url": letter.get("music_url"),
            "tier": letter.get("tier", 1),  # default to Tier 1 if missing
        }
        for letter in letters
    ]

@router.get("/{letter_id}")
def get_letter(letter_id: str):
    try:
        oid = ObjectId(letter_id)
    except:
        raise HTTPException(400, "Invalid letter id")

    try:
        db = get_db()
        doc = db.letters.find_one({"_id": oid})
        if not doc:
            raise HTTPException(404, "Letter not found")

        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        return doc
    except Exception as e:
        logger.error(f"Error fetching letter {letter_id}: {str(e)}")
        raise HTTPException(500, "Internal server error")

@router.put("/{letter_id}")
def update_letter(letter_id: str, updates: dict, admin_token: str):
    admin_only(admin_token)
    try:
        oid = ObjectId(letter_id)
    except:
        raise HTTPException(400, "Invalid letter id")

    db = get_db()
    updates["updatedAt"] = datetime.utcnow()
    result = db.letters.update_one({"_id": oid}, {"$set": updates})
    if result.modified_count == 0:
        raise HTTPException(404, "Letter not found")
    return {"message": "Letter updated"}

@router.delete("/{letter_id}")
def delete_letter(letter_id: str, admin_token: str):
    admin_only(admin_token)
    try:
        oid = ObjectId(letter_id)
    except:
        raise HTTPException(400, "Invalid letter id")

    db = get_db()
    result = db.letters.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Letter not found")
    return {"message": "Letter deleted"}
