import requests
import xml.etree.ElementTree as ET

# Define the URL of the web service
url = "http://porta.fda.moph.go.th/FDA_SEARCH_ALL/WS_LICENSE_SEARCH.asmx"

# Define the SOAP request payload
payload = """<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <GET_DATA_CMT xmlns="http://tempuri.org/">
      <DATAS>"10-1-6300015491"</DATAS>
    </GET_DATA_CMT>
  </soap12:Body>
</soap12:Envelope>
"""

# Send the POST request with the SOAP payload
response = requests.post(url, data=payload, headers={"Content-Type": "application/soap+xml; charset=utf-8"})

# Check if the request was successful
if response.status_code == 200:
    print(response.content)
    # Parse the SOAP response as XML
    root = ET.fromstring(response)
    # Extract the content within GET_DATA_CMTResult
    get_data_cmt_result = root.find(".//GET_DATA_CMTResult")
    print(get_data_cmt_result)
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
