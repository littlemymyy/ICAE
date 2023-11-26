import requests
import json

api_url = "https://api.tech.ec.europa.eu/search-api/prod/rest/search?apiKey=285a77fd-1257-4271-8507-f0c6b2961203&text=*&pageSize=10000"  # Replace with the actual API URL

response = requests.post(api_url)

if response.status_code == 200:
    data = dict(response.json())
    for x in data:
        print(x)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")