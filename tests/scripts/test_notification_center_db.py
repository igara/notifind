# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
import mock
from src.scripts import notification_center_db

class NotificationCenterDBTest(unittest.TestCase):
  def test_connect(self):
    with mock.patch('os.path.realpath') as mock_os_path_realpath:
      with mock.patch('sqlite3.connect') as mock_sqlite3_connect:
        mock_os_path_realpath.return_value = 'tests/scripts/notification_center_db.sqlite3'
        notification_center_db.connect()
        self.assertEqual(mock_sqlite3_connect.call_count, 1)

if __name__ == '__main__':
  unittest.main()
