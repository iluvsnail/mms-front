#!/bin/sh
export NODE_OPTIONS=--max_old_space_size=8192
nohup yarn start > my.log 2>my.log &
