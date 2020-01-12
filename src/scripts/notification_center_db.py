# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import os
import sqlite3
import tempfile

def connect():
  notification_db_path = os.path.realpath(
    tempfile.gettempdir() + '/../0/com.apple.notificationcenter/db2/db')
  connection = sqlite3.connect(notification_db_path)
  connection.text_factory = str
  connection.row_factory = sqlite3.Row
  return connection
