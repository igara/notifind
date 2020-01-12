# -*- coding: utf-8 -*-
# /usr/bin/python (macOS system python)
import unittest
from src.scripts import n_gram

class NGramTest(unittest.TestCase):
  def test_call(self):
    self.assertEqual(n_gram.call('abcdefg', 1), 'a b c d e f g')
    self.assertEqual(n_gram.call('abcdefg', 2), 'ab bc cd de ef fg')

if __name__ == '__main__':
  unittest.main()
