# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
import mock
from src.scripts import get_notifications
import sqlite3

class GetNotificationsTest(unittest.TestCase):
  def test_get_notifications_json_0_count(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      notification = get_notifications.get_notifications_json(99, "", "", "")
      self.assertEqual(len(notification), 0)

  def test_get_notifications_json_1_count(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      notification = get_notifications.get_notifications_json(3, "m", "j", "")
      self.assertEqual(len(notification), 1)
      self.assertEqual(notification[0]["id"], 1)
      self.assertEqual(notification[0]["body"], u'\u26d4\ufe0f 5 of 21 tests failed')
      self.assertEqual(notification[0]["date"], '2019-12-14 16:35:58 +0000')
      self.assertEqual(notification[0]["title"], u'/users/igarashishou/workspace/syonet/syonet_seven/nodejs/www - 24% failed')

if __name__ == '__main__':
  unittest.main()
