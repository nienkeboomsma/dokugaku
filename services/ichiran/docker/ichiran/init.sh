#!/bin/bash

echo "Checking postgres server status..."
while : ; do
    pg_isready -h ichiran-db > /dev/null && break;
    sleep 1;
done

echo "Postgres is ready, starting main container init."
init-all;

echo "All set, awaiting commands."
