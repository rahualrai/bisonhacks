import csv
import json

# Define the input and output file paths
csv_file_path = 'dummy.csv'
json_file_path = 'dummy.json'

# Read the CSV file and convert it to JSON
data = []
with open(csv_file_path, mode='r', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the JSON data to a file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)

print(f"CSV data has been converted to JSON and saved to {json_file_path}")