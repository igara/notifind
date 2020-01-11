# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import os
import sys
import sqlite3
import tempfile
import json
import notifind_db
import notification_center_db
import datetime
import Foundation
import codecs

def parse_req(req):
  # reqをparseしtitleとbodyのみ取得する
  res = {}
  for x in str(req).split(';\n'):
    if 'body' in x or 'titl' in x or 'subt' in x:
      d = x.replace('{','').strip().split(' = ')
      res[d[0]] = d[1].replace('"','')
  return res

def insertApps(notification_center_db_cursor, notifind_db_cursor, notifind_db_connection):
  app_rows = notification_center_db_cursor.execute("""
    SELECT
      app_id,
      identifier
    FROM app;
  """)

  for row in app_rows:
    notifind_db_cursor.execute(
      """
        INSERT OR REPLACE INTO app
        (
          id,
          identifier
        )
        VALUES (?, ?);
      """,
      [row[0], row[1]]
    )
    notifind_db_connection.commit()

def insertRecords(notification_center_db_cursor, notifind_db_cursor, notifind_db_connection):
  record_rows = notification_center_db_cursor.execute("""
    SELECT
      app_id,
      uuid,
      data
    FROM record;
  """)

  for row in record_rows:
    app_id = row[0]
    uuid = row[1]
    data = row[2]

    plist, fmt, err = \
      Foundation.NSPropertyListSerialization.propertyListFromData_mutabilityOption_format_errorDescription_(
      buffer(data),
      Foundation.NSPropertyListMutableContainers,
      None, None)
    if err is not None:
      continue

    record_dic = {}
    for key, value in plist.iteritems() :
      if key == 'date':
        record_dic['date'] = str(Foundation.NSDate.alloc().initWithTimeIntervalSinceReferenceDate_(value))
      if key == 'req':
        req = parse_req(value)
        title = r"{}".format(req.get('titl', '').lower()).replace('=\u','=')
        record_dic['title'] = codecs.decode(title, 'unicode-escape')
        sub_title = r"{}".format(req.get('subt', '').lower()).replace('=\u','=')
        record_dic['sub_title'] = codecs.decode(sub_title, 'unicode-escape')
        body = r"{}".format(req.get('body', '').lower()).replace('=\u','=')
        record_dic['body'] = codecs.decode(body, 'unicode-escape')
      elif key == 'app':
        record_dic['app'] = value
    if 'date' not in record_dic:
      record_dic['date'] = '0000-01-01 00:00:00 +0000'
    
    notifind_db_cursor.execute(
      """
      INSERT OR IGNORE INTO record
      (
        app_id,
        uuid,
        date,
        title,
        sub_title,
        body
      )
      VALUES (?, ?, ?, ?, ?, ?);
      """,
      [
        app_id,
        uuid,
        record_dic['date'],
        record_dic['title'],
        record_dic['sub_title'],
        record_dic['body']
      ]
    )
    notifind_db_connection.commit()

def call():
  notifind_db_connection = notifind_db.connect()
  notifind_db_cursor = notifind_db_connection.cursor()

  notification_center_db_connection = notification_center_db.connect()
  notification_center_db_cursor = notification_center_db_connection.cursor()

  insertApps(notification_center_db_cursor, notifind_db_cursor, notifind_db_connection)
  insertRecords(notification_center_db_cursor, notifind_db_cursor, notifind_db_connection)

  message_dic = {}
  message_dic['sync'] = 'ok'

  notifind_db_connection.close()
  json_string = json.dumps(message_dic, indent=2, ensure_ascii=False)
  print json_string
  return message_dic
