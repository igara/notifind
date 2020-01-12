# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
import mock
from src.scripts import get_apps
import sqlite3

class GetAppsTest(unittest.TestCase):
  def test_get_apps_json_0_count(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      apps = get_apps.get_apps_json("hoge")
      self.assertEqual(len(apps), 0)

  def test_get_apps_json_1_count(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      apps = get_apps.get_apps_json("nl.supera")
      self.assertEqual(len(apps), 1)
      self.assertEqual(apps[0]["id"], 1)
      self.assertEqual(apps[0]["identifier"], "nl.superalloy.oss.terminal-notifier")
      self.assertEqual(apps[0]["notification_count"], 1)

  def test_get_apps_json_all(self):
    with mock.patch('src.scripts.notifind_db.connect') as mock_notifind_db_connect:
      notifind_db_connection = sqlite3.connect('tests/scripts/notifind_db.sqlite3')
      notifind_db_connection.row_factory = sqlite3.Row
      mock_notifind_db_connect.return_value = notifind_db_connection

      apps = get_apps.get_apps_json("")
      self.assertEqual(apps[0]["id"], 2)
      self.assertEqual(apps[0]["identifier"], "com.tinyspeck.slackmacgap")
      self.assertEqual(apps[0]["notification_count"], 15)

if __name__ == '__main__':
  unittest.main()
