DEVICE_ID="E60D95D5-A3CE-4F75-9FC1-A1A504F452F1"
APP_PATH="$HOME/Library/Developer/CoreSimulator/Devices/$DEVICE_ID/data/Containers/Data/Application"
LATEST_APP=$(ls -td "$APP_PATH"/* | head -n 1)
DB_PATH="$LATEST_APP/Documents/SQLite/goalscript.db"

if [ -f "$DB_PATH" ]; then
  echo "Opening: $DB_PATH"
  open -R "$DB_PATH"
else
  echo "Error: DB 파일이 존재하지 않습니다."
  echo "경로 확인: $DB_PATH"
fi