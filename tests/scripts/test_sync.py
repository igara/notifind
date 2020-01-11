# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
import mock
from src.scripts import sync
import sqlite3

class SyncTest(unittest.TestCase):
  def test_call(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      with mock.patch('src.scripts.notification_center_db.connect') as mock_notification_center_db_connect:
        notification_center_db_connection = sqlite3.connect('tests/scripts/notification_center_db.sqlite3')
        notification_center_db_connection.row_factory = sqlite3.Row
        mock_notification_center_db_connect.return_value = notification_center_db_connection

        sync.call()

if __name__ == '__main__':
  unittest.main()
