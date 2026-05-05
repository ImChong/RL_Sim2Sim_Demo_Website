import sys
from unittest.mock import MagicMock

# Mock numpy before importing the script that uses it
sys.modules["numpy"] = MagicMock()

from scripts.add_motion_clips import sanitize_name

def test_sanitize_name_alphanumeric():
    assert sanitize_name("Motion123") == "Motion123"
    assert sanitize_name("abcXYZ789") == "abcXYZ789"

def test_sanitize_name_allowed_special_chars():
    assert sanitize_name("my.file_name-1") == "my.file_name-1"
    assert sanitize_name("...___---") == "...___---"

def test_sanitize_name_disallowed_chars():
    assert sanitize_name("my name@file!") == "my_name_file_"
    assert sanitize_name("name with spaces") == "name_with_spaces"
    assert sanitize_name("user#123$") == "user_123_"

def test_sanitize_name_whitespace():
    assert sanitize_name("  motion  ") == "motion"
    assert sanitize_name("\tmotion\n") == "motion"

def test_sanitize_name_empty_or_whitespace_only():
    assert sanitize_name("") == "motion"
    assert sanitize_name("   ") == "motion"
    assert sanitize_name("\t\n") == "motion"

def test_sanitize_name_only_disallowed_chars():
    # re.sub(r"[^0-9A-Za-z._-]+", "_", "!!!") results in "_"
    assert sanitize_name("!!!") == "_"
    assert sanitize_name("@@@") == "_"
    # Continuous disallowed characters (including spaces) are replaced by a single underscore
    assert sanitize_name("! @") == "_"
    assert sanitize_name("###$$$") == "_"
