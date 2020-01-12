# -*- coding: utf-8 -*-

def call(target, n):
  return " ".join([ target[idx:idx + n] for idx in range(len(target) - n + 1)])
