#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pickle
import os.path
import logging, sys, traceback, requests
from flask import Flask, request, jsonify, redirect, url_for, jsonify, abort, make_response
from flask_json import FlaskJSON, JsonError, json_response, as_json
from datetime import timedelta
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

def config_app(app, module):
    app.config['JSON_JSONIFY_HTTP_ERRORS'] = True
    app.config['JSON_ADD_STATUS'] = True

def get_credentials():
    try:
        with open('token.pickle', 'rb') as token:
            return pickle.load(token)

    except Exception as e:
        print(f'WARNING: Could not fetch credentials from token.pickle: {e}')


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1v28QjM_P2i6q2jxoVIrLOmyn5E2Iv2kJCrT0u2xa_OM'
SAMPLE_RANGE_NAME = 'Próxima LH!B2:G'
CREDS = get_credentials()


app = Flask(__name__)
config_app(app,'lightning_api')

json = FlaskJSON(app)

def get_data():
    creds = None
    with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    service = build('sheets', 'v4', credentials=creds)

    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=SAMPLE_RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
    else:
        data = {
            'hacks': [],
            'hacks_backup': []
        }
        for row in values[0:5]:
            if values[0]:
                hack = {
                    'title': row[0],
                    'presenter': row[1],
                    'materials': row[2],
                    #'email': row[3],
                    'time': row[4]
                }
                data['hacks'].append(hack)
        backups = []
        for row in values[6:8]:
            if values[0]:
                hack = {
                    'title': row[0],
                    'presenter': row[1],
                    'materials': row[2],
                    #'email': row[3],
                    'time': row[4]
                }
                data['hacks_backup'].append(hack)
        data['mc'] = values[7][0]
        data['mc_backup'] = values[7][0]
        return data

@app.route('/')
def index():
    return json_response(200, msg="Welcome to the Lightning API!")

@app.route('/hacks', methods=['GET'])
def get_hacks():
    return json_response(200, data=get_data())

if __name__ == '__main__':
    print("Starting Lightning API")
    app.run(debug=False, host="0.0.0.0", use_reloader=False)
