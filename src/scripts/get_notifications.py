# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import json
import notifind_db

def get_notifications_json(search_app_id, search_title, search_sub_title, search_body):
  connection = notifind_db.connect()
  cursor = connection.cursor()

  notifications = cursor.execute(
    """
      SELECT
        id,
        title,
        sub_title,
        body,
        date
      FROM record
      WHERE app_id = ?
        AND title LIKE ?
        AND sub_title LIKE ?
        AND body LIKE ?
      ORDER BY date DESC;
    """,
    [
      search_app_id,
      '%' + search_title + '%',
      '%' + search_sub_title + '%',
      '%' + search_body + '%'
    ]
  )

  res_j = []
  for row in notifications:
    notification_dic = {}
    notification_dic['id'] = row[0]
    notification_dic['title'] = row[1]
    notification_dic['sub_title'] = row[2]
    notification_dic['body'] = row[3]
    notification_dic['date'] = row[4]
    res_j.append(notification_dic)
  return res_j

def call(search_app_id, search_title, search_sub_title, search_body):
  d = get_notifications_json(search_app_id, search_title, search_sub_title, search_body)

  json_string = json.dumps(d, indent=2, ensure_ascii=False)
  print json_string
