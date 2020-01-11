# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import json
import notifind_db

def get_apps_json(search_identifier):
  connection = notifind_db.connect()
  cursor = connection.cursor()
  apps = cursor.execute(
    """
      SELECT
        app.id,
        app.identifier,
        COUNT(record.app_id) as notification_count
      FROM app
      LEFT OUTER JOIN record
        ON app.id=record.app_id
      WHERE app.identifier LIKE ?
      GROUP BY app.id
      ORDER BY notification_count DESC;
    """,
    [
      '%' + search_identifier + '%'
    ]
  )

  res_j = []
  for row in apps:
    app_dic = {}
    app_dic['id'] = row[0]
    app_dic['identifier'] = row[1]
    app_dic['notification_count'] = row[2]
    res_j.append(app_dic)
  return res_j

def call(search_identifier):
  d = get_apps_json(search_identifier)

  json_string = json.dumps(d, indent=2, ensure_ascii=False)
  print json_string
