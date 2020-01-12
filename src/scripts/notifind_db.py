# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import os
import sqlite3
import json

def connect():
  notifind_db_path = os.path.realpath('./notifind_db.sqlite3')
  connection = sqlite3.connect(notifind_db_path)
  connection.text_factory = str
  connection.row_factory = sqlite3.Row
  return connection

def create_execute(cursor, sql, target_name, message_dic):
  try:
    cursor.execute(sql)
    message_dic['create'][target_name] = 'ok'
  except sqlite3.OperationalError as error:
    message_dic['create'][target_name] = error.message

def create():
  notifind_db_connection = connect()
  notifind_db_cursor = notifind_db_connection.cursor()

  message_dic = {}
  message_dic['create'] = {
    'app': '',
    'record': '',
    'record_app_id_index_1': '',
  }

  create_execute(
    notifind_db_cursor,
    """
    CREATE TABLE app(
      id INTEGER PRIMARY KEY NOT NULL,
      identifier VARCHAR NOT NULL,
      UNIQUE(identifier)
    );
    """,
    'app',
    message_dic
  )

  create_execute(
    notifind_db_cursor,
    """
    CREATE TABLE record(
      id INTEGER PRIMARY KEY NOT NULL,
      app_id INTEGER NOT NULL,
      uuid BLOB NOT NULL,
      title VARCHAR NOT NULL,
      sub_title VARCHAR NOT NULL,
      body VARCHAR NOT NULL,
      date VARCHAR NOT NULL,
      FOREIGN KEY (app_id) REFERENCES app(id),
      UNIQUE(uuid)
    );
    """,
    'record',
    message_dic
  )

  create_execute(
    notifind_db_cursor,
    """
    CREATE INDEX record_app_id_index_1 ON record(
      app_id
    );
    """,
    'record_app_id_index_1',
    message_dic
  )

  notifind_db_connection.commit()
  notifind_db_connection.close()
  json_string = json.dumps(message_dic, indent=2, ensure_ascii=False)
  print json_string
