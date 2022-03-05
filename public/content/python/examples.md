---
menu: Python
name: Examples
---

# Python Examples

This section is just a collecton of interesting real world scripts that were used for one reason for another.

## Sentry Script w/ datetime, requests, csv, multiprocessing and threading

A script used to fetch 92k events from Sentry using all OS cores and multithreading.

```python
"""
Read all the issue IDs saved, then iterate through, find all their issues and paginate through all
"""
import requests
import csv
import os
import sys
import urllib.request
import datetime

from multiprocessing import Pool
import threading
csv_writer_lock = threading.Lock()
total_events_lock = threading.Lock()
record_log = True

# for logging
if record_log:
	old_stdout = sys.stdout
	log_file = open("fetch_events_by_issue.log","w")
	sys.stdout = log_file


organization_slug = "REDACTED"
project_slug = "REDACTED"
base_url = "https://sentry.io/api/0"

headers = {
	'Authorization': 'Bearer REDACTED'
}


cursor = 0

def post_to_slack(message):
	data = '{"text":"' + message + '"}'
	url = 'https://hooks.slack.com/services/REDACTED/REDACTED/REDACTED'
	req = urllib.request.Request(url, data.encode('utf-8'), {'Content-Type': 'application/json'})
	res = urllib.request.urlopen(req)


# not the best idea but whatever
total_events_with_console_logs = 0
breadcrumbs = False
def handle_event(event):
	try:
		global total_events_with_console_logs
		global breadcrumbs

		event_has_console_breadcrumbs = False
		# get single event from the API
		event_id = event.get("eventID")
		issue_id = event.get("groupID")
		print("Found a single event with ID: " + event_id)
		single_event_url = base_url + "/projects/" + organization_slug + "/" + project_slug + "/events/" + event_id + "/"
		event_response = requests.get(single_event_url, headers=headers)

		row_dict = {
			'issue_id': issue_id,
			'event_id': event_id,
			'console_output': ''
		}
		# retreive the metadata
		print(f'[{datetime.datetime.now()}]  Trying to find breadcrumbs for event ID: {event_id}')
		event_data = event_response.json()

		for entry in event_data['entries']:
			if entry['type'] == 'breadcrumbs':
				breadcrumbs = entry.get('data', {}).get('values', {})
		if breadcrumbs and len(breadcrumbs) > 0:
			for crumb in breadcrumbs:
				if crumb['category'] == 'console':
					event_has_console_breadcrumbs = True
					print(f'[{datetime.datetime.now()}] Found a console breadcrumb!')
					row_dict['console_output'] = crumb
					with csv_writer_lock:
						writer.writerow(row_dict)

		if event_has_console_breadcrumbs:
			with total_events_lock:
				try:
					total_events_with_console_logs += 1
				except Exception as e:
					print(f'[{datetime.datetime.now()}] Failed to append to total_events_with_console_logs')
		else:
			print(f'[{datetime.datetime.now()}]  Did not find any breadcrumbs.')
			row_dict['console_output'] = 'No console output!'
			with csv_writer_lock:
				writer.writerow(row_dict)
	except Exception as e:
		print(f'Failed for {event.get("eventID")}', e.message)


def handle_issue(issue_id):
	"""
	For issue ID, continually fetch all events and paginate until there are none.

	With each event, handle it such that it fetches and appends the required data.
	"""
	# writer.writeheader()
	list_events_url = f'{base_url}/issues/{issue_id}/events/'
	attempt = 1
	while list_events_url is not None:
		try:
			if attempt > 5:
				post_to_slack(f'[{datetime.datetime.now()} FAILED]: Reached 5 attempts for {list_events_url}')
				list_events_url = None
				break
			# get the events
			print(f'[{datetime.datetime.now()}] NEXT] Getting page of results: {list_events_url}')
			response = requests.get(list_events_url, headers=headers)
			# data is an array of events
			data = response.json()
			for event in data:
				handle_event(event)
			# is there another page of events?
			link = response.headers.get("Link")
			# reset attempt if successful
			attempt = 1
			if link and 'rel="next"; results="true"' in link:
				post_to_slack(f'[{datetime.datetime.now()} SUCCESS]: Finished results for {list_events_url}')
				list_events_url = link.split()[4][1:-2]
				print(f'[{datetime.datetime.now()} NEXT]: Getting another page of event from issue_id {issue_id} - URL {link}.')
			else:
				post_to_slack(f'[{datetime.datetime.now()} SUCCESS]: Finished results for {list_events_url}')
				list_events_url = None
		except Exception as e:
			print(f'[{datetime.datetime.now()} WARNING]Fetch attempt {attempt} failed: {list_events_url}', e)
			post_to_slack
			attempt += 1

try:
	with open('./fetch_events_by_issue.csv', 'w') as output_file:
		fieldnames = ['issue_id', 'event_id', 'console_output']
		writer = csv.DictWriter(output_file, fieldnames=fieldnames)
		print(f'[{datetime.datetime.now()}Writing headers for csv')
		with open('./project_issues.csv', 'r') as file:
			data = file.read().splitlines()
			# use attempts to give up after trying 10 times on the same URL
			chunksize = 1
			proc_count = os.cpu_count()
			with Pool(processes=proc_count) as pool:
				result = pool.map(handle_issue, data, chunksize)


except:
	post_to_slack(f'[{datetime.datetime.now()} FAILED]: Script crashed')
finally:
	post_to_slack(f'[{datetime.datetime.now()} COMPLETED]: Script finished')
	if record_log:
		sys.stdout = old_stdout
		log_file.close()
```
