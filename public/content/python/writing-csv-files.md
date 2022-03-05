---
menu: Python
name: Writing CSV Files
---

# Writing CSV Files

## Example

```python
"""
Basic example to read and write a csv file
"""
import random
import csv
import threading
csv_writer_lock = threading.Lock()

def handle_event(event):
	try:
    event_id: random.randrange(0,100) # used for example
    issue_id: random.randrange(0,100)
		row_dict = {
			'issue_id': issue_id,
			'event_id': event_id,
			'console_output': ''
		}

    row_dict['console_output'] = crumb
    with csv_writer_lock:
      writer.writerow(row_dict)

try:
	with open('./fetch_events_by_issue.csv', 'w') as output_file:
		fieldnames = ['issue_id', 'event_id', 'console_output']
		writer = csv.DictWriter(output_file, fieldnames=fieldnames)

    # pretending we are reading another file
		with open('./project_issues.csv', 'r') as file:
			data = file.read().splitlines()
			for value in data:
        handle_event(value)
```
