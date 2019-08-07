#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pickle
import os.path
import logging, sys, traceback, requests
from utils import cache_response
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

SPREADSHEET_ID = '1v28QjM_P2i6q2jxoVIrLOmyn5E2Iv2kJCrT0u2xa_OM'
TABLE_RANGE = 'Próxima LH!B2:G'
NEXT_DAY_RANGE = 'Próxima LH!A1'
CREDS = get_credentials()


app = Flask(__name__)
config_app(app,'lightning_api')

json = FlaskJSON(app)

@cache_response(time=timedelta(hours=1))
def get_data():
    service = build('sheets', 'v4', credentials=CREDS)

    sheet = service.spreadsheets()

    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                range=TABLE_RANGE).execute()
    values = result.get('values', [])

    next_day_request = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                        range=NEXT_DAY_RANGE).execute()
    next_day_value = next_day_request.get('values', [])
    next_day = next_day_value[0][0]

    if values == []:
        print('No data found.')
        return {}

    data = {
        'next_day': next_day,
        'hacks': [],
        'hacks_on_queue': []
    }

    for title, presenter, materials, _, time in values[0:5]:
        if values[0]:
            hack = {
                'title': title,
                'presenter': presenter,
                'materials': materials,
                'time': time
            }

            data['hacks'].append(hack)

    for title, presenter, materials, _, time in values[6:8]:
        if values[0]:
            hack = {
                'title': title,
                'presenter': presenter,
                'materials': materials,
                'time': time
            }

            data['hacks_on_queue'].append(hack)

    data['mc'] = values[10][0]
    data['reserve_mc'] = values[11][0]

    return data

@app.route('/')
def index():
    response = json_response(200, msg="Welcome to the Lightning API!")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/hacks', methods=['GET'])
def get_hacks():
    response = json_response(200, data=get_data())
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    print("Starting Lightning API")
    app.run(debug=False, host="0.0.0.0", use_reloader=False)
