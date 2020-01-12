# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import json
import notifind_db
import n_gram

def get_notifications_json(search_app_id, search_title, search_sub_title, search_body):
  connection = notifind_db.connect()
  cursor = connection.cursor()

  n_gram_search_title = n_gram.call(search_title, 2)
  n_gram_search_sub_title = n_gram.call(search_sub_title, 2)
  n_gram_search_body = n_gram.call(search_body, 2)

  where_record_fts_list = []
  if n_gram_search_title != '':
    where_record_fts_title = "title:{}".format(n_gram_search_title)
    where_record_fts_list.append(where_record_fts_title)
  if n_gram_search_sub_title != '':
    where_record_fts_sub_title = "sub_title:{}".format(n_gram_search_sub_title)
    where_record_fts_list.append(where_record_fts_sub_title)
  if n_gram_search_body != '':
    where_record_fts_body = "body:{}".format(n_gram_search_body)
    where_record_fts_list.append(where_record_fts_body)

  where_record_fts = ''
  if len(where_record_fts_list) > 0:
    where_record_fts = "AND record_fts MATCH '" + " AND ".join(where_record_fts_list) + "'"

  notifications = cursor.execute(
    """
      SELECT
        record.id,
        record.title,
        record.sub_title,
        record.body,
        record.date
      FROM record
      INNER JOIN record_fts
      ON record.id = record_fts.rowid
      WHERE record.app_id = ?
        {}
      ORDER BY date DESC;
    """.format(where_record_fts),
    [
      search_app_id,
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
