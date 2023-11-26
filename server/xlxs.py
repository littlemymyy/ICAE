import pandas as pd
import json

json_file_path = "C:/Users/praph/Downloads/responseA.json"


print(json_file_path)
output_path = "C:/Users/praph/Downloads/responseA.xlsx"


with open(json_file_path, 'r') as file:
    json_data = json.load(file)

metadata_list = [result["metadata"] for result in json_data["results"]]

df = pd.DataFrame(metadata_list)

df.to_excel(output_path, index=False)