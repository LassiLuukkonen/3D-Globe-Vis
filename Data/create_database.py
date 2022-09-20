# Run this only once.

import sqlite3

DATABASE_PATH = "processed_data.sqlite"

def db_connection(path: str):
    connection = None
    try:
        connection = sqlite3.connect(path)
    except sqlite3.Error as e:
        print("Error:", e)
    return connection

connection = db_connection(DATABASE_PATH)
cur = connection.cursor()

cur.execute("CREATE TABLE col (id INTEGER PRIMARY KEY, lat real not null, lon real not null, cost real not null)")
connection.commit()
for row in cur.execute("SELECT name FROM sqlite_schema WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY 1;"):
    print(row)

connection.close()