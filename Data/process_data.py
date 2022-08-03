# import csv
# import requests

# API_KEY = open("API_KEY.txt").read()
# LIMIT = 5

# def api_request(city_name, state_code, country_code) -> tuple():
#     if state_code is not None:
#         api_url = "http://api.openweathermap.org/geo/1.0/direct?q="+city_name+","+state_code+","+country_code+"&limit="+str(LIMIT)+"&appid="+ API_KEY
#     else:
#         api_url = "http://api.openweathermap.org/geo/1.0/direct?q="+city_name+","+country_code+"&limit="+str(LIMIT)+"&appid="+ API_KEY
#     response = requests.get(api_url)
#     j = response.json()
#     if len(j) != 1:
#         print("API ERROR: no loction found or more than one location found")
#         return None
#     try:
#         lat, lon = j[0]["lat"], j[0]["lon"]
#     except:
#         print("Problem with lat and lon")
#     return lat,lon

# country_codes = {}

# with open('country_codes.csv', 'r') as csvfile:
#     reader = csv.reader(csvfile)
#     for row in reader:
#         country = row[0].lower()
#         code = row[1]
#         country_codes[country] = code

# # print(country_codes)

# counter = 0
# data = []

# with open('cost_by_city.csv', 'r') as csvfile:
#     reader = csv.reader(csvfile)
#     for row in reader:
#         col_index = row[1]

#         name = row[0]
#         comma_count = name.count(",")
#         state = None
#         if comma_count == 1:
#             city, country = name.split(", ")
#         elif comma_count == 2:
#             city, state, country = name.split(", ")
#         country_code = country_codes.get(country.lower())

#         try:
#             lat, lon = api_request(city, state, country_code)
#         except:
#             print("Problem with lat and lon")
#             continue
#         data_row = [lat, lon, col_index, city, state, country_code]
#         data.append(data_row)
        
#         counter += 1
#         # if counter > 1:
#         #     break

# with open("processed_data.csv", "w", newline="") as csvfile:
#     writer = csv.writer(csvfile)
#     writer.writerows(data)

import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

create_connection(r"processed_data.db")
