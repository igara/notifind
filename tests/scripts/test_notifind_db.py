# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
import mock
from src.scripts import notifind_db
import sqlite3

class NotificationDBTest(unittest.TestCase):
  def test_connect(self):
    with mock.patch('os.path.realpath') as mock_os_path_realpath:
      with mock.patch('sqlite3.connect') as mock_sqlite3_connect:
        mock_os_path_realpath.return_value = 'tests/scripts/notifind_db.sqlite3'
        notifind_db.connect()
        self.assertEqual(mock_sqlite3_connect.call_count, 1)

  def test_create(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/test_create_notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      with mock.patch('src.scripts.notification_center_db.connect') as mock_notification_center_db_connect:
        notification_center_db_connection = sqlite3.connect('tests/scripts/notification_center_db.sqlite3')
        notification_center_db_connection.row_factory = sqlite3.Row
        mock_notification_center_db_connect.return_value = notification_center_db_connection

        notifind_db.create()


if __name__ == '__main__':
  unittest.main()
