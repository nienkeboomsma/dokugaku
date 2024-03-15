echo "========================="
echo "Starting ichiran DB init!"
echo "========================="

createdb -E 'UTF8' -l 'ja_JP.utf8' -T template0 ichiran-db
set +e
pg_restore -d ichiran-db ichiran.pgdump

echo "========================="
echo "Finished ichiran DB init!"
echo "========================="
